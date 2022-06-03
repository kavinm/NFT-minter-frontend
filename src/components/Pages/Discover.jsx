import React, { Suspense, useState } from 'react';
import {FiSend} from 'react-icons/fi';
import {BiCopy} from 'react-icons/bi';
import {AiOutlineDownload} from 'react-icons/ai';
import BlueBanner from './Discover/BlueBanner';
import ExampleNFTs from './Discover/ExampleNFTs';
import MintSigleNft from './MintSingleNFT';
import YourCollection from './YourCollection';
import CarouselCollection from './YourCollection/CarouselCollection';

const Discover =()=>{

    const [SwitchCase, setSwitchCase]=useState({
        discover:true,
        mintNft:false,
        yrCollection:false
    })

    const handleSwitchTab=(name)=>{
        console.log(SwitchCase)
        var temp;
        const tab1= document.getElementById("wallet-tab-1");
        const tab2= document.getElementById("wallet-tab-2");
        const tab3= document.getElementById("wallet-tab-3");
        if(name=="discover"){
            temp={discover:true,mintNft:false,yrCollection:false}
            tab1.classList.add("active");
            tab2.classList.remove("active");
            tab3.classList.remove("active");
        }else
        if(name=="mintNft"){
            temp={discover:false,mintNft:true,yrCollection:false}
            tab2.classList.add("active");
            tab1.classList.remove("active");
            tab3.classList.remove("active");
        }else
        if(name=="yrCollection"){
            temp={discover:false,mintNft:false,yrCollection:true}
            tab3.classList.add("active");
            tab2.classList.remove("active");
            tab1.classList.remove("active");
        }
        setSwitchCase(temp)
    }
    return <>
            <div className='row m-0'>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-area'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='wallet-side-bar pt-3'>
                                    <div className="wallet-tabs active" id="wallet-tab-1" onClick={()=>handleSwitchTab("discover")}> <FiSend size={18}></FiSend> &nbsp; &nbsp; Discover</div>
                                    <div className="wallet-tabs " id="wallet-tab-2" onClick={()=>handleSwitchTab("mintNft")}><AiOutlineDownload size={19}></AiOutlineDownload> &nbsp; &nbsp; Mint a single NFT</div>
                                    <div className="wallet-tabs " id="wallet-tab-3" onClick={()=>handleSwitchTab("yrCollection")}><BiCopy size={19}></BiCopy> &nbsp; &nbsp; Your Collection</div>
                                </div>
                            </div>
                            <div className='col-md-9 '>
                                {SwitchCase.discover && <ExampleNFTs></ExampleNFTs>}
                                {SwitchCase.mintNft && <MintSigleNft></MintSigleNft>}
                                {SwitchCase.yrCollection && <YourCollection></YourCollection>}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-12  mt-5 p-0'>
                    <div className='wallet-bottom-area'>
                        {SwitchCase.discover && <BlueBanner></BlueBanner>}
                        {SwitchCase.mintNft &&  <CarouselCollection></CarouselCollection>}
                        {SwitchCase.yrCollection && <CarouselCollection></CarouselCollection>}
                    </div>
                </div>
            </div>
    </>
}

export default Discover;