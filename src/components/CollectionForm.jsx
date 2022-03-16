import React, {useState} from 'react'
import { Card, Avatar, Button, Modal, Space } from 'antd';
import { EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CollectionMintingForm from './CollectionMintingForm';
const { Meta } = Card;

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




const CollectionForm = (props) => {

  const [visible, setVisible] = useState(false)
  const [modalDetails, setModalDetails] = useState({})

  const openModal = (item) => {
    setModalDetails(() => {
      return {
        title: item.title,
        contractAddress: item.contractAddress
      }
    })

    setVisible(true)
  }


  return (
    <div>
      <Space direction='vertical'>
        <Modal
          visible={visible}
          title={`Mint Collection: ${modalDetails.title}`}
          width={1000}
          footer={[
            <Button onClick={() => setVisible(false)}>
              Cancel
            </Button>
          ]}
        >
          <CollectionMintingForm contractAddress={modalDetails.contractAddress} address={props.address}/>
        </Modal>
        <Button type="primary">Add Collection</Button>
        <Space wrap>
          {
            sampleData.map(item => {
              return (
                <Card
                style={{ width: 250 }}
                cover={
                  <img
                    alt="example"
                    src={item.imagePreview}
                  />
                }
                actions={[
                  <EyeOutlined />,
                  <PlusCircleOutlined key="setting" onClick={() => openModal(item)} />,
                ]}
                hoverable={true}
              >
                <Meta
                  title={item.title}
                  description={item.contractAddress}
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