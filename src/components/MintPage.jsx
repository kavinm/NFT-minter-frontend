import React, {useState, useEffect} from 'react'
import MintingForm from './MintingForm'
import {Button, Row, Col, message} from 'antd'

const MintPage = () => {

  const [currentAccount, setCurrentAccount] = useState("")

  const checkIfWalletIsConnected = async () => {

    const {ethereum} = window

    if (!ethereum) {
      message.error("Make sure you have metamask", 3)
      return
    }

    const accounts = await ethereum.request({method: 'eth_accounts'})

    if (accounts.length !== 0) {
      const account = accounts[0]
      message.info(`Connected to ${account}`, 3)

      setCurrentAccount(account)
    } else {
      message.error("No authorized account found", 3)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const renderNotConnectedContainer = (
    <div>
      <Button style={{flex: '0 0 120px'}} >Connect to Metamask</Button>
    </div>
  )


  return (
    <>
      {currentAccount === "" ? renderNotConnectedContainer : <MintingForm/>}
    </>
  )
}

export default MintPage