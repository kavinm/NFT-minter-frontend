import React, { useState, useEffect } from "react";
import logo from '../../../assets/icon/Logo.svg';
import { message, Modal} from 'antd';
import pointIlls from '../../../assets/illustrations/9.png';
import {FaTimes} from 'react-icons/fa';
import Metamask from '../../../assets/icon/Metamask.svg';
import coinbase from '../../../assets/icon/coinbase.svg';
import walletconnect from '../../../assets/icon/wallet-connect.svg';
import connectIllustration from  '../../../assets/images/Metaverse Connect.png';
import FaucetContract from '../../../utils/FaucetContract.json'
import { ethers, utils } from "ethers";
import axios from "axios";

const NavBarWallet=()=>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [walletConnectionStatus, setStatus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              
              const url = `https://nftrecognitionapi.canadacentral.cloudapp.azure.com/api/faucet/${utils.getAddress(window.ethereum.selectedAddress)}`
              const response_value = await axios.get(url, {headers: {
                password: "636ec1da39d266533f41982b97067a10ad8ea2d428dc979bd127becb1f0a63fe"
            }})

              console.log(response_value.data)
              if (response_value.data.message === "Wait till tomorrow") {
                  message.error({content:"Wait till tomorrow to redeem Matic", duration:3, className:'error-message'});
              } else {
                  message.success("Successfully sent Matic to your account!")
              }

          } else {
              console.log("Ethereum object doesn't exist!");
          }
      } catch (error) {
          console.log(error);
      }

      setIsModalVisible(false);
    };


    // Why is this a handlCancel bruhhh 😭
    const handleCancel = async () => {
      setIsModalVisible(false);
    };
  
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        message.error("Make sure you have metamask", 3);
        return;
      }
  
      const accounts = await ethereum.request({ method: "eth_accounts" });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        message.info(`Connected to ${account}`, 3);
        setStatus(true)
        setCurrentAccount(account);
      } else {
        message.error({content:"No authorized account found", duration:3, className:'error-message'});
        showModal();
      }
    };
  
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          message.error("Get MetaMask!", 3);
        }
  
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
  
        message.success(`Connected ${accounts[0]}`);
        
        handleOk();
        setStatus(true);
        showModal();
        //check if user is connected to rinkeby
        const mumbaiChainid = "0x13881";
        let chainId = await ethereum.request({ method: "eth_chainId" });
  
        if (chainId !== mumbaiChainid) {
          message.error("You are not connected to the Mumbai Test Network!");
          return;
        }
  
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
    return <>
        <nav className="navbar-wallet" >
            <div className='row m-0 p-0'>
                <div className='col-md-12 d-flex align-items-center justify-content-center'>
                    <div className='nav-area-wallet'>
                        <img src={logo} id="kpmg-logo" />
                        <button onClick={showModal} className='btn'>{walletConnectionStatus?<div className="d-flex align-items-center">Wallet &nbsp; <img src={Metamask} style={{width:"30px"}} /> </div>:<span>Connect Wallet</span>}</button>
                    </div>
                    <Modal  width={300} bodyStyle={{height:'410px',color:'#fff', background:'#101526'}} 
                    onOk={handleOk} onCancel={handleCancel}
                    visible={isModalVisible} footer={null}>
                      {walletConnectionStatus!=true? <div className="row">
                        <div className="col-md-12 pop-up-title text-center">
                          <span>Select a wallet</span>
                        </div>
                        <div className="col-md-12 pop-up-icon">
                            <img src={pointIlls} style={{height:'180px'}}/>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="pop-up-tab" onClick={()=>connectWallet()}><img src={Metamask} /> &nbsp;&nbsp;Metamask</div>
                            <div className="pop-up-tab mt-2"><img src={coinbase} />&nbsp;&nbsp;Coinbase Wallet</div>
                            <div className="pop-up-tab mt-2"><img src={walletconnect} />&nbsp;&nbsp;Wallet Connect</div>
                        </div>
                      </div>:
                      <div className="row">
                        <div className="col-md-12 pop-up-title text-center">
                          <span>Wallet Connected</span>
                          <FaTimes color={"#fff"} onClick={handleCancel} className="title-icon"></FaTimes>
                        </div>
                        <div className="col-md-12 mt-3 mb-2 pop-up-icon">
                            <img src={connectIllustration} style={{height:'180px'}}/>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                              <button onClick={handleOk} className="btn text-white" style={{width:"7rem",height:'2.5rem',fontSize:'0.8rem',borderRadius:'7px',border: "1px solid #FFFFFF"}}>Fill wallet</button>
                              &nbsp;&nbsp;
                              <button onClick={handleCancel} className="btn text-white" style={{width:"7rem",height:'2.5rem',fontSize:'0.8rem',borderRadius:'7px',background:'linear-gradient(90deg, #1E49E3 0%, #7213E9 100%)'}}>Continue</button>
                        </div>
                      </div>}
                    </Modal>
                </div>
            </div>
        </nav>
    </>
}

export default NavBarWallet;