import React, { useState, useEffect } from "react";
import {
  Space,
  Input,
  Form,
  Row,
  Col,
  InputNumber,
  Radio,
  Button,
  Card,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import axios from "axios";
import { Typography } from "antd";
import myNFT from "../utils/MyNFT.json";

import { useDispatch } from "react-redux";
import { addAccount } from "../actions/accountActions";
const { Title } = Typography;
const { TextArea } = Input;

const CollectionMintingForm = (props) => {
  
  const CONTRACT_ADDRESS = props.contractAddress.address;
  const TOTAL_MINT = 500;

  const [imgSRC, setImgSRC] = useState("");
  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [nftType, setNftType] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");

  const {address} = props

  const dispatch = useDispatch()
  const fileUploadHandler = (e) => {
    const the_file = e.target.files[0];
    var reader = new FileReader();
    setImage(the_file);
    var url = reader.readAsDataURL(the_file);
    reader.onloadend = (e) => {
      setImgSRC(reader.result);
    };
  };

  const fileUploadClearer = () => {
    setImgSRC("");
    setImage("");
  };

  const ImagePreview = (
    <>
      <img src={imgSRC} alt="Preview" style={{ maxWidth: "100%" }} />
      <Row>
        <DeleteOutlined
          onClick={() => fileUploadClearer()}
          style={{ color: "red", margin: 10 }}
        />
      </Row>
    </>
  );

  const mintNFT = async () => {
    console.log(CONTRACT_ADDRESS)

    let imageData = new FormData();
    imageData.append('file', image)
    const imageURL = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const response_value = await axios.post(imageURL, imageData, {
      maxBodyLength: 'Infinity',
      headers: {
        'pinata_api_key': "6dc806852197ca3a8e7b",
        "pinata_secret_api_key": "334eed80fbabe379df3d8df9cc48198488dfb5d6d68f022c562fdba4af48de0f",
        'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,

      }
    })

    const data = {
      "name": title,
      "description": description,
      "external_url": socialMediaURL,
      "image": "https://ipfs.io/ipfs/" + response_value.data.IpfsHash
    }

    const meta_data_response = await axios.post(url, data, {
      headers: {
        'pinata_api_key': "6dc806852197ca3a8e7b",
        "pinata_secret_api_key": "334eed80fbabe379df3d8df9cc48198488dfb5d6d68f022c562fdba4af48de0f",
      }
    })

    console.log(meta_data_response.data.IpfsHash)


    const Jsonhash = meta_data_response.data.IpfsHash
    const JsonUrl = "https://ipfs.io/ipfs/" + Jsonhash;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        addAccount(provider, dispatch)

        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myNFT.abi,
          signer
        );
        
        message.info("Going to pop wallet now to pay gas...");
        console.log(address)
        let nftTx = await connectedContract.mintNFT(address, JsonUrl);
        message.info(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

// Logi
  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Form layout="horizontal">
            <Form.Item>
              <input
                style={{ width: "100%" }}
                type="file"
                onChange={(e) => fileUploadHandler(e)}></input>
            </Form.Item>
            <Form.Item>
              <Input
                style={{ width: "100%", right: 0 }}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}></Input>
            </Form.Item>
            <Form.Item>
              <TextArea
                style={{ width: "100%" }}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%" }}>
                <Input
                  style={{ width: "100%" }}
                  placeholder="Count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
                <Radio.Group style={{ width: "200px" }}>
                  <Radio.Button
                    value="ERC721"
                    style={{ width: "50%" }}
                    onChange={() => setNftType("ERC721")}>
                    ERC721
                  </Radio.Button>
                  <Radio.Button
                    value="ERC1155"
                    style={{ width: "50%" }}
                    onChange={() => setNftType("ERC1155")}>
                    ERC1155
                  </Radio.Button>
                </Radio.Group>
              </Space>
            </Form.Item>
            <Form.Item>
              <Input
                style={{ width: "100%" }}
                placeholder="https://twitter.com/example"
                value={socialMediaURL}
                onChange={(e) => setSocialMediaURL(e.target.value)}></Input>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Card style={{ width: "100", height: "250", margin: 20 }}>
            {imgSRC !== "" ? ImagePreview : <p>Image Preview</p>}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: 20 }}>
          <Button
            onClick={() => {
              mintNFT();
            }}
            type="primary">
            Mint
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CollectionMintingForm;
