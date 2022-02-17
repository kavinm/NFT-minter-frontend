import React, {useState} from 'react'
import {Space, Input, Form, Row, Col, InputNumber, Radio, Button, Card} from 'antd'
const {TextArea} = Input;

const MintingForm = () => {

  return (
    <>
    
      <Row justify="center">
        <Col span={12}>
          <Form
            layout="horizontal"
          >
            <Form.Item>
              <input style={{width: '100%'}} type="file"></input>
            </Form.Item>
            <Form.Item>
              <Input style={{width: '100%', right: 0}} placeholder="Title"></Input>
            </Form.Item>
            <Form.Item>
              <TextArea style={{width: '100%'}} placeholder="Description"/>
            </Form.Item>
            <Form.Item>
              <Space style={{width: '100%'}}>
                <InputNumber style={{width: '100%'}} placeholder="Count"/>
                <Radio.Group >
                  <Radio.Button value="ERC721" style={{width: '50%'}}>ERC721</Radio.Button>
                  <Radio.Button value="ERC1155" style={{width: '50%'}}>ERC1155</Radio.Button>
                </Radio.Group>
              </Space>
            </Form.Item>
            <Form.Item>
              <Input style={{width: '100%'}} placeholder="https://twitter.com/example"></Input>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100', height: '250', margin: 20}}>
              <p>Image Preview</p>
          </Card>

        </Col>
      </Row>
      <Row>
        <Col span={24} style={{marginTop: 20}}>        
          <Button type="primary">Mint</Button>

        </Col>
      </Row>
    
    </>
  )
}

export default MintingForm