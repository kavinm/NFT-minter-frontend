import React, { useState, useEffect } from "react";
import logo from '../assets/icon/Logo.svg';
import { message, Modal} from 'antd';
import pointIlls from '../assets/illustrations/9.png';
import {FaTimes} from 'react-icons/fa';
import Metamask from '../assets/icon/Metamask.svg';
import coinbase from '../assets/icon/coinbase.svg';
import walletconnect from '../assets/icon/wallet-connect.svg';


const NavBarWallet=()=>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [walletConnectionStatus, setStatus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
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
        setStatus(true);
        handleOk();
        //check if user is connected to rinkeby
        const rinkebyChainId = "0x4";
        let chainId = await ethereum.request({ method: "eth_chainId" });
  
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
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
                      <div className="row">
                        <div className="col-md-12 pop-up-title text-center">
                          <span>Select a wallet</span>
                          <FaTimes color={"#fff"} onClick={handleCancel} className="title-icon"></FaTimes>
                        </div>
                        <div className="col-md-12 pop-up-icon">
                            <img src={pointIlls} style={{height:'180px'}}/>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="pop-up-tab" onClick={()=>connectWallet()}><img src={Metamask} /> &nbsp;&nbsp;Metamask</div>
                            <div className="pop-up-tab mt-2"><img src={coinbase} />&nbsp;&nbsp;Coinbase Wallet</div>
                            <div className="pop-up-tab mt-2"><img src={walletconnect} />&nbsp;&nbsp;Wallet Connect</div>
                        </div>
                      </div>
                    </Modal>
                </div>
            </div>
        </nav>
    </>
}

export default NavBarWallet;