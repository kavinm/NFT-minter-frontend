import React, { useState } from "react";
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
import Axios from "axios";
import { Typography } from "antd";
import myEpicNft from "../utils/MyEpicNFT.json";
import { useDispatch } from "react-redux";
import { addAccount } from "../actions/accountActions";
const { Title } = Typography;
const { TextArea } = Input;

const MintingForm = () => {
  const CONTRACT_ADDRESS = "0x23080098F529202270AEb79acE0285c9b210Cda3";
  const TOTAL_MINT = 500;

  const [imgSRC, setImgSRC] = useState("");
  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [nftType, setNftType] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");


  const dispatch = useDispatch()
  const fileUploadHandler = (e) => {
    const the_file = e.target.files[0];
    var reader = new FileReader();
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
    console.log("STARTED");

    // const data = new FormData()
    // data.append("file", image)

    // Axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.JWT}`
    //   }
    // }).then(response => {
    //   console.log(response.data)
    // }).catch(error => console.log(error))

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        addAccount(provider, dispatch)

        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        message.info("Going to pop wallet now to pay gas...");
        let nftTx = await connectedContract.makeAnEpicNFT();
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

  return (
    <>
      <Title level={2}>Minting Tool</Title>
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
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
                <Radio.Group>
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

export default MintingForm;
