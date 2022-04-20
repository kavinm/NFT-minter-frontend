import React, { useState } from "react";
import {
  Space,
  Input,
  Form,
  Row,
  Col,
  Radio,
  Button,
  Card,
  message,
  TreeSelect
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import axios from "axios";
import myNFT from "../utils/MyNFT.json";

import { useDispatch } from "react-redux";
import { addAccount } from "../actions/accountActions";
const { TextArea } = Input;

const CollectionMintingForm = (props) => {

  const CONTRACT_ADDRESS = props.contractAddress.address;

  const [imgSRC, setImgSRC] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [nftType, setNftType] = useState("");
  const [socialMediaURL, setSocialMediaURL] = useState("");
  const [engagementType, setEngagementType] = useState("")

  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [internalType, setInternalType] = useState("")
  const [reason, setReason] = useState("")
  const [recognitionType, setRecognitionType] = useState(undefined)

  const [name, setName] = useState("")
  const [numberOfYears, setNumberOfYears] = useState("")
  const [recognitionTitle, setRecognitionTitle] = useState("")
  
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventNote, setEventNote] = useState("")

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

  const treeData = [
    {
      title: "Value",
      value: "Value",
      children: [
        {
          title: "Integrity",
          value: "Integrity"
        },
        {
          title: "Excellence",
          value: "Excellence"
        },
        {
          title: "Courage",
          value: "Courage"
        },
        {
          title: "Together",
          value: "Together"
        },
        {
          title: "For Better",
          value: "For Better"
        }
      ]
    },
    {      
      title: "Strategy",
      value: "Strategy",
      children: [
        {
          title: "Clients and Markets",
          value: "Clients and Markets"
        },
        {
          title: "People and Knowledge",
          value: "People and Knowledge"
        },
        {
          title: "Public Trust and Quality",
          value: "Public Trust and Quality"
        },
        {
          title: "Operational Excellence",
          value: "Operational Excellence"
        }
      ]

    }
  ]



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

    let data = {
      "name": title,
      "description": description,
      "external_url": socialMediaURL,
      "image": "https://ipfs.io/ipfs/" + response_value.data.IpfsHash
    }

    if (engagementType === "Internal" && internalType === "Recognition") {
      data["recipient_name"] = recipientName
      data["recipient_email"] = recipientEmail
      data["reason"] = reason
      data["recognition_type"] = recognitionType
    } else if (engagementType === "Internal" && internalType === "Service Award") {
      data["recipient_name"] = recipientName
      data["number_of_years"] = numberOfYears
      data["recognition_title"] = title
    } else if (engagementType === "Internal" && internalType === "Participation Record") {
      data["recipient_name"] = recipientName
      data["event_name"] = eventName
      data["date"] = eventDate
      data["note"] = eventNote
    }

    console.log((data))
    const meta_data_response = await axios.post(url, data, {
      headers: {
        'pinata_api_key': "6dc806852197ca3a8e7b",
        "pinata_secret_api_key": "334eed80fbabe379df3d8df9cc48198488dfb5d6d68f022c562fdba4af48de0f",
      }
    })

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

  const engagementFormRender = () => {
    if (engagementType === "Internal") {
      return (
        <Radio.Group>
          <Radio.Button
            value="Recognition"
            style={{ width: "100%" }}
            onChange={() => setInternalType("Recognition")}>
            Recognition
          </Radio.Button>
          <Radio.Button
            value="Service Award"
            style={{ width: "100%" }}
            onChange={() => setInternalType("Service Award")}>
            Service Awards at KPMG
          </Radio.Button>
          <Radio.Button
            value="Participation Record"
            style={{ width: "100%" }}
            onChange={() => setInternalType("Participation Record")}>
            KPMG Participation Record
          </Radio.Button>
        </Radio.Group>
      )
    } else {
      return
    }
  }

  const treeonChange = value => {
    console.log(value);
    setRecognitionType(value)
  };

  const internalEngagementFormRender = () => {

    console.log(internalType)

    if (internalType === "Recognition") {
      return (
        <>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
          <TreeSelect
            style={{ width: '100%' }}
            value={recognitionType}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={treeonChange}
          />
          </Form.Item>
        </>
      )
    } else if (internalType === "Service Award") {
      return (
        <>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Number of Years"
              value={numberOfYears}
              onChange={(e) => setNumberOfYears(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Title"
              value={recognitionTitle}
              onChange={(e) => setRecognitionTitle(e.target.value)}
            />
          </Form.Item>
        </>
      )
    } else if (internalType === "Participation Record") {
      return (
        <>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ width: "100%", right: 0 }}
              placeholder="Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              style={{ width: "100%", right: 0 }}
              placeholder="Note"
              value={eventNote}
              onChange={(e) => setEventNote(e.target.value)}
            />
          </Form.Item>
        </>
      )

    } else {
      return
    }


  }



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
            <Form.Item>
              <Radio.Group style={{ width: "200px" }}>
                <Radio.Button
                  value="Internal"
                  style={{ width: "50%" }}
                  onChange={() => setEngagementType("Internal")}>
                  Internal
                </Radio.Button>
                <Radio.Button
                  value="ERC1155"
                  style={{ width: "50%" }}
                  onChange={() => {setEngagementType("External") ; setInternalType("")}}>
                  External
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              {engagementFormRender()}
            </Form.Item>
            <Form.Item>
              {internalEngagementFormRender()}
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
