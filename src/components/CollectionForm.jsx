import React, {useState, useEffect} from 'react'
import { Card, Avatar, Button, Modal, Space, Form, Input } from 'antd';
import { EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CollectionMintingForm from './CollectionMintingForm';
import AddressToCollection from "../utils/AddressToCollection.json";
import myNFT from "../utils/MyNFT.json";
import axios from "axios";

import { ethers } from "ethers";

const { Meta } = Card;
const { TextArea } = Input;


const sampleData = [
  {
    title: "Collection Name 1",
    imagePreview: "https://media.discordapp.net/attachments/747950732753502291/951910402424438885/Class.png",
    contractAddress: "0x93b9439e2a89019dee11306e78adcf77c7431caf"
  },
  {
    title: "Collection Name 2",
    imagePreview: "https://media.discordapp.net/attachments/747950732753502291/951911189682724874/Class_1.png",
    contractAddress: "0x93b9439e2a89019dee11306e78adcf77c7431caf"
  }
]

const FACTORY_ADDRESS = "0xde18f6d98a24bac341dd36c3d0c28e05613e447d"



const CollectionForm = (props) => {

  const [visible, setVisible] = useState(false)
  const [addCollectionModal, setAddCollectionModal] = useState(false)
  const [modalDetails, setModalDetails] = useState({})
  const [collectionAddresses, setCollectionAddresses] = useState([])
  const [collectionName, setCollectionName] = useState("")
  const [symbol, setSymbol] = useState("")


  useEffect(() => {
    //0xd75ee8fb2d656f29e939b44e136c62de17213000
    console.log("WTF")
    getAddresses()
  }, [])


  const getAddresses = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        console.log("1")
        const signer = provider.getSigner();
       
        console.log("2")
        const connectedContract = new ethers.Contract(
          FACTORY_ADDRESS,
          AddressToCollection.abi,
          signer
        );
        console.log(connectedContract)

        let nftTx = await connectedContract.getCollections();
        console.log(await nftTx[0])

        let listOfCollections = []
        for (const collectionAddress of nftTx) {
          console.log(collectionAddress)
          const nftContract = new ethers.Contract(
            collectionAddress,
            myNFT.abi,
            provider
          );
          
          const nftName = await nftContract.name();
          const nftSymbol = await nftContract.symbol();

          let imageAddress;
          try {
            let tokenURI = await nftContract.tokenURI(1)
            imageAddress = await (await axios.get(tokenURI)).data.image
          } catch (error) {
            imageAddress = "https://media.discordapp.net/attachments/747950732753502291/951910402424438885/Class.png";
          }
          
          listOfCollections.push({address: collectionAddress, name: nftName, symbol: nftSymbol, image: imageAddress})

        }
        console.log(listOfCollections)
        setCollectionAddresses(listOfCollections)        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      // We do nothing here, 
    }

  }


  const openModal = (item) => {
    setModalDetails(() => {
      return item
    })

    setVisible(true)
  }

  const createCollection = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        console.log("1")
        const signer = provider.getSigner();
       
        console.log("2")
        const connectedContract = new ethers.Contract(
          FACTORY_ADDRESS,
          AddressToCollection.abi,
          signer
        );
        console.log(connectedContract)

        let addedCollectionTx = await connectedContract.addCollection(collectionName, symbol);
        let updatedCollectionTx = await connectedContract.getCollections();
        setCollectionAddresses(updatedCollectionTx) 
        setAddCollectionModal(false)
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      // We do nothing here, 
    }

  }


  return (
    <div>
      <Space direction='vertical'>
        <Modal
          visible={visible}
          title={`Mint Collection: Test`}
          width={1000}
          footer={[
            <Button onClick={() => setVisible(false)}>
              Cancel
            </Button>
          ]}
        >
          <CollectionMintingForm contractAddress={modalDetails} address={props.address}/>
        </Modal>
        <Modal
          visible={addCollectionModal}
          title={`Add Collection`}
          width={1000}
          footer={[
            <Button onClick={() => setAddCollectionModal(false)}>
              Cancel
            </Button>
          ]}
        >

          <Form>
            <Form.Item>
              <Input
                style={{ width: "100%" }}
                placeholder="Collection Name"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                style={{ width: "100%" }}
                placeholder="Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </Form.Item>
          </Form>
          <Button type="primary" onClick={() => createCollection()}>Create Collection</Button>

        </Modal>
        <Button type="primary" onClick={() => setAddCollectionModal(true)} >Add Collection</Button>
        <Space wrap>
          {
            collectionAddresses.map(item => {
              return (
                <Card
                style={{ width: 250 }}
                cover={
                  <img
                    alt="example"
                    src={item.image}
                  />
                }
                actions={[
                  <a href={`https://rinkeby.rarible.com/collection/${item.address}/items`}><EyeOutlined/></a>,
                  <PlusCircleOutlined key="setting" onClick={() => openModal(item)} />,
                ]}
                hoverable={true}
              >
                <Meta
                  title={item.name}
                  description={"Symbol: " + item.symbol}
                />
              </Card>
              )
            })
          }
        </Space>
      </Space>
    </div>
  )
}

export default CollectionForm


/*


          <Card
            style={{ width: 250 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => setVisible(true)} />,

            ]}
          >
            <Meta
              title="Card title"
            />
          </Card>
          */