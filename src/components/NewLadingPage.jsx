import React from 'react';
import vrBoyImg from '../assets/illustrations/vr-man.png';
import {BsArrowRight, BsCheckCircle} from 'react-icons/bs';
import awardIcon from '../assets/icon/award.svg';
import commandIcon from '../assets/icon/command.svg';
import briefcaseIcon from '../assets/icon/briefcase.svg';
import { useNavigate } from 'react-router-dom';
import Footer1 from './Layout/Footer1';

const NewLandingPage=()=>{
    const navigate = useNavigate();
    return <>
       <div className='row m-0 mt-3 landing-banner'>
           <div className='banner-area'>
                <div className='banner-flex text-uppercase'>
                    <div style={{position:"absolute"}}>
                        <div className='banner-title'>
                            own your<br/>achievements<br/>with NFTs.
                        </div>
                        <div className='banner-subtitle'>
                            Mint NFTs and distribute them securely.
                        </div>
                    </div>
                    <div style={{position:'absolute',right:'3rem',bottom:'-50px',zIndex:1}}>
                        <img src={vrBoyImg} style={{width:"320px"}}/>
                    </div>
                </div>
           </div>
       </div>
       <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 pt-3 mb-5 d-flex justify-content-center'>
                <div className='steps-page'>
                    <div className='hr-header'>
                        <span className='hr-title'>HOW IT WORKS</span>
                        <hr></hr>
                    </div>
                    <div className='steps-page-body d-flex mt-3'>
                        <div className='steps-block'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5 className='step-num'>1</h5>
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                Launch the App, Connect your<br/>wallet and sign in with<br/>Metamask.
                                </div>
                            </div>
                        </div>
                        <div className='steps-block'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5 className='step-num'>2</h5>
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                Once connected, mint<br/>a singular NFT or a<br/>collection of NFTs.
                                </div>
                            </div>
                        </div>
                        <div className='steps-block'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5 className='step-num'>3</h5>
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                Any organization member<br/>can sign in with Metamask<br/>to receive the NFT.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='get-started mt-3'>
                        <button className='btn' onClick={()=>navigate('/discover')}>Get Started &nbsp; <BsArrowRight></BsArrowRight> </button>
                    </div>
                </div>
                
            </div>
       </div>

       
       <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 mb-5 d-flex justify-content-center'>
                <div className='steps-page'>
                    <div className='hr-header'>
                        <span className='hr-title'>YOUR WALLET</span>
                        <hr></hr>
                    </div>
                    {/* <div className='get-started mt-3 d-flex align-items-center'>
                        <span>Create your own Recognition Awards </span> &nbsp; <BsArrowRight></BsArrowRight> 
                    </div> */}
                    <div className='steps-page-body d-flex mt-3'>
                        <div className='steps-block' style={{width:'50%'}}>
                            <div className='row mt-3'>
                                <div className='col-md-12 p-0'  style={{fontSize:'0.8rem',fontWeight:'bold'}}>
                                    YOUR WALLET
                                </div>
                                <div className='col-md-12 p-0 mt-3 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                    MetaMask is a digital wallet that stores the cryptocurrency<br/>required to mint and transfer your NFTs. Create a wallet and<br/>collect your free tokens today to begin using the platform. 
                              
                                </div>
                            </div>
                        </div>
                        
                        <div className='steps-block' style={{width:'50%'}}>
                            <div className='row mt-3'>
                            <div className='col-md-12 p-0' style={{fontSize:'0.8rem',fontWeight:'bold'}}>
                                    METAMASK
                                </div>
                                <div className='col-md-12 p-0 mt-3 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                MetaMask is non-custodial wallet, meaning that the security of<br/>
                                your assets is your responsibility. Unlike a hosted wallet, which<br/>
                                stores your currency with a third party in a similar fashion to<br/>
                                banks, a non-custodial wallet has no third party to serve as the<br/>
                                “custodian” to your currency. This means that the responsibility<br/>
                                of safeguarding and remembering your password will fall on<br/>you, the user. 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='get-started mt-5 d-flex align-items-center' onClick={()=>navigate('/what-it-means-for-you')}>
                        <span>Learn more </span> &nbsp;  &nbsp; <BsArrowRight></BsArrowRight> 
                    </div>
                </div>
                
            </div>
       </div>
       
       <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 mb-5 d-flex justify-content-center'>
                <div className='steps-page'>
                    <div className='hr-header'>
                        <span className='hr-title'>OVERVIEW</span>
                        <hr></hr>
                    </div>
                    <div className='steps-page-body d-flex mt-3'>
                        <div className='steps-block'>
                            <div className='row mt-3'>
                                <div className='col-md-12 p-0 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                NFTs use case as certificates and records of<br/>achievement are still largely unexplored in the<br/>corporate sector.
 This is why KPMG seeks to create a<br/>platform for organizations (educational institutions<br/>included) to mint NFTs and distribute them securely.
                              
                                </div>
                            </div>
                        </div>
                        <div className='steps-block'>
                            <div className='row mt-3'>
                                <div className='col-md-12 p-0 d-flex align-items-center justify-content-center' style={{fontSize:'0.8rem'}}>
                                Example of<br/>NFT use cases:
                                </div>
                            </div>
                        </div>
                        <div className='steps-block'>
                            <div className='row mt-3'>
                                <div className='col-md-12 p-0 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                    <div>
                                        <div className='d-flex align-items-center'><BsCheckCircle></BsCheckCircle>&nbsp;Certifications</div>
                                        <div className='d-flex align-items-center'><BsCheckCircle></BsCheckCircle>&nbsp;Professional Designations</div>
                                        <div className='d-flex align-items-center'><BsCheckCircle></BsCheckCircle>&nbsp;Corporate Training</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='get-started mt-3 d-flex align-items-center'>
                        <span>Create your own Recognition Awards </span> &nbsp;  &nbsp;  &nbsp; <BsArrowRight></BsArrowRight> 
                    </div>
                </div>
            </div>
       </div>
       
       <div className='row m-0 '>
            <div className='col-md-12 p-0 mt-5 mb-5 d-flex justify-content-center'>
                <div className='steps-page'>
                    <div className='hr-header'>
                        <span className='hr-title'>WHAT ARE THE BENEFITS</span>
                        <hr></hr>
                    </div>
                    <div className='steps-page-body d-flex mt-3'>
                        <div className='steps-block mt-5'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <img src={awardIcon} />
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                KPMG Verified NFT Rewards<br/>and Recognition will attract<br/>and retain talent embracing<br/>Web3 culture.
                                </div>
                            </div>
                        </div>
                        <div className='steps-block mt-5'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <img src={briefcaseIcon} />
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                Own Your Experiences and<br/>Achievments, create a portfolio<br/>of verifiable milestones across<br/>your career.
                                </div>
                            </div>
                        </div>
                        <div className='steps-block mt-5'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <img src={commandIcon} />
                                </div>
                                <div className='col-md-9 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                                Collect and Showcase NFTs in<br/>your Professional Digital Wallet.<br/>NFTs minted on the platform<br/>will be publicly available on the<br/>blockchain for others to view.
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

export default NewLandingPage;