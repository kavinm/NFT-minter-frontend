import React, { useState } from 'react';
import NavBar from './NavBar';
import vrBoyImg from '../assets/illustrations/vr-man.png';
import {BsArrowRight, BsCheckCircle} from 'react-icons/bs';
import awardIcon from '../assets/icon/award.svg';
import commandIcon from '../assets/icon/command.svg';
import briefcaseIcon from '../assets/icon/briefcase.svg';
import { useNavigate } from 'react-router-dom';
import Footer1 from './Layout/Footer1';
import InstallYourNodes from './InstallYourNodes';
import chromImg from '../assets/images/chromeImg.png';
import metamask_website from '../assets/images/metamask_website.png';
import metamask from '../assets/images/metamask.png';
import download_extension from '../assets/images/download_extension.png';
import create_password from '../assets/images/create_password.png';
import new_to_metamask from '../assets/images/new_to_metamask.png';
import sceret_key from '../assets/images/sceret_key.png';
import congrats from '../assets/images/congrats.png';

import ethereumMainet from '../assets/images/ethereumMainet.png';
import ethereumExtension from '../assets/images/ethereumExtension.png';
import addNetwork from '../assets/images/addNetwork.png';
import infoForm from '../assets/images/infoForm.png';

import MetamaskFox from '../assets/images/MetamaskFox.png';
import launchNft from '../assets/images/image 8 (1).png';
import connectWallet from '../assets/images/image 9.png';
import walletConnected from '../assets/images/image 10.png';

const WhatItMeansForYou=()=>{
    const [installYourWallet, setInstallWallet] = useState([
        {
            title:"Ensure that you are using a chrome browser.",
            Imgs:chromImg,
            width:'70%'
        },
        {
            title:"Click here to go to the MetaMask website, and click “Download Now”",
            Imgs:metamask_website,
            width:'70%'
        },
        {
            title:"Download the Chrome extension and add it to your browser”",
            Imgs:download_extension,
            width:'75%'
        },
        {
            title:"Click on the MetaMask extension in the top right corner of your browser.",
            Imgs:metamask,
            width:'80%'
        },
        {
            title:"Select connect a wallet, or create a wallet.",
            Imgs:new_to_metamask,
            width:'90%'
        },
        {
            title:"Enter a password and hit create. MetaMask will now show a 12-word recovery key.",
            Imgs:create_password,
            width:'75%'
        },
        {
            title:"MetaMask will then give a small test to ensure that you have saved your recovery key.",
            Imgs:sceret_key,
            width:'70%'
        },
        {
            title:"Congrats! You have successfully created your MetaMask wallet.",
            Imgs:congrats,
            width:'80%'
        }
    ])
    const [settingUpMetaMask, setMetaMask] = useState([
        {title:'Making your account places you into the Ethereum Main Net. You must add the Polygon Mainnet.',Imgs:ethereumMainet,width:'60%'},
        {title:'On the top right of the MetaMask extension, click the dropdown “Ethereum Main Net”.',Imgs:ethereumExtension,width:'80%'},
        {title:'Click “Add Network”. This will take you to a new webpage.',Imgs:addNetwork,width:'85%'},
        {title:'Please fill out the required information:',Imgs:infoForm,width:'70%'},
    ]);
    const [usingYourWallet, setUsingYourWallet] = useState([
        {title:'Launch the NFT minting platform.',Imgs:launchNft,width:'70%'},
        {title:'Click the “Connect Wallet” button to connect your newly created MetaMask wallet to the application.',Imgs:connectWallet,width:'80%'},
        {title:'Once the wallet is connected, click on the button “Fill wallet” to collect your funds.',Imgs:walletConnected,width:'85%'},
        {title:'Funds will be deposited into your MetaMask wallet. Check your balance by clicking on the MetaMask extension on your browser.',Imgs:MetamaskFox,width:'70%'},
    ]);
    const [menuList, setMenuList] = useState(installYourWallet)
    const navigate = useNavigate();

    const handleTabClick=(tabId)=>{
        let tab1 = document.getElementById("tab1"); 
        let tab2 = document.getElementById("tab2");
        let tab3 = document.getElementById("tab3");

        if(tabId=="tab1"){
            tab1.classList.add("active");
            tab2.classList.remove("active");
            tab3.classList.remove("active");
            setMenuList(installYourWallet);
        }
        if(tabId=="tab2"){
            tab2.classList.add("active");
            tab1.classList.remove("active");
            tab3.classList.remove("active");
            setMenuList(settingUpMetaMask);
        }
        if(tabId=="tab3"){
            tab3.classList.add("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
            setMenuList(usingYourWallet);
        }
    }

    return <>
       <div className='row m-0 mt-3 landing-banner'>
           <div className='banner-area'>
                <div className='banner-flex text-uppercase'>
                    <div style={{position:"absolute"}}>
                        <div className='banner-title'>
                            your wallet<br/>and what it<br/>means for you
                        </div>
                        {/* <div className='banner-subtitle'>
                            Mint NFTs and distribute them securely.
                        </div> */}
                    </div>
                    <div style={{position:'absolute',right:'-5rem',width:'40%',fontSize:'0.7rem',zIndex:1}}>
                        <span>Your Digital Professional Wallet (DPW) will be accessed through the MetaMask browser application, which is designed to be a wallet to store all your achievements and recognitions throughout your career that are represented as NFTs. Your DPW can be regarded as a digital resume and achievement list to share with family, friends, colleagues and potential employers. This professional identity is linked to verified records stored on the blockchain, so you truly own these accomplishments and can take them with your wherever you go, while still ensuring your DPW maintains transparency and security.</span>
                        {/* <img src={vrBoyImg} style={{width:"320px"}}/> */}
                    </div>
                </div>
           </div>
           {/* <div style={{width:'100%',marginTop:'2rem',display:'flex',alignContent:'center',justifyContent:'center'}}>
           <div style={{width:'90%', background: "#000000"}}>

</div>
           </div> */}
       </div>
       <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 mb-5 d-flex justify-content-center'>
                <div style={{width:'90%', fontSize:'1.2rem',fontWeight:'bold',background: "#000000",height:'350px'}} className="d-flex justify-content-center align-items-center">
                    <div>play button</div>
                </div>
            </div>
        </div>
        <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 mb-5 d-flex justify-content-center'>
                <div style={{width:'90%', height:'1550px',fontSize:'1.2rem',fontWeight:'bold',borderRadius:'7px',background: "rgba(255, 255, 255, 0.1)"}} className="d-flex justify-content-center align-items-center">
                  <div style={{ height:'100%',width:'95%'}}>
                        <div className='row m-0'>
                            <div className='col-md-3 p-0'>
                                <div id="tab1" onClick={()=>handleTabClick("tab1")} className="d-flex pl-2 mt-3 mb-2 align-items-center learn-more-tabs active">
                                    <span>How to install your<br/>wallet</span>
                                </div>
                                <div id="tab2" onClick={()=>handleTabClick("tab2")}  className="d-flex pl-2 mt-1 mb-2 align-items-center learn-more-tabs ">
                                    <span>Setting up Metamask</span>
                                </div>
                                <div id="tab3" onClick={()=>handleTabClick("tab3")}  className="d-flex pl-2 mt-1 mb-2 align-items-center learn-more-tabs ">
                                    <span >Using your wallet</span>
                                </div>
                            </div>
                            <div className='col-md-9 p-0read'>
                                <div className='mt-3 mb-3' style={{background: "rgba(255, 255, 255, 0.1)",width:'100%',height:'100%',borderRadius:'7px'}}>
                                    <div className="row learn-more">
                                        {menuList.map((val,idx)=> <div className='col-md-6 mt-5 d-flex justify-content-center'>
                                            <div style={{width:'80%'}}>
                                                <div className='row'>
                                                    <div className='col-md-3 text-center'>
                                                            <h5 className='step-num'>{idx+1}</h5>
                                                    </div>
                                                    <div className='col-md-9 title-text mt-3'>
                                                        <span>{val.title}</span>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-12 learn-more-images'>
                                                        <img src={val.Imgs} style={{width:val.width}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                        
                                    </div>
                                    {/* <InstallYourNodes></InstallYourNodes> */}
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
        </div>
       <Footer1></Footer1>
    </>
}

export default WhatItMeansForYou;