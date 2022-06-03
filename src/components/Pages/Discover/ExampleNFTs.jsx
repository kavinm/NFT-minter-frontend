import React, { Suspense, useState }  from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import {AiOutlineStar} from 'react-icons/ai';
import {RiStackFill} from 'react-icons/ri';
import DynamicCards from '../../ModularCodes/DynamicCards';

import multiPplImg from '../../../assets/illustrations/Component 1.png';
import rectImg1 from '../../../assets/illustrations/greenRect.svg';
import rectImg2 from '../../../assets/illustrations/Rectangle 187 (3).svg';
import rectImg3 from '../../../assets/illustrations/Rectangle 187 (4).svg';

const ExampleNFTs=()=>{

    const [ carouselState, setCarouse] = useState({
        responsive:{
            superLargeDesktop:{
                breakpoint:{ max:4000, min:3000 },
                items:5.5,
                partialVisibilityGutter: 30
            },
            desktop:{
                breakpoint:{ max:3000, min:1024 },
                items:4.5,
                partialVisibilityGutter: 30
            },
            tablet:{
                breakpoint:{max:1024, min:464},
                items:3.5 , 
                partialVisibilityGutter:30
            },
            mobile:{
                breakpoint: { max:464, min:0 },
                items: 1.5, partialVisibilityGutter:30
            }
        }
    });

    const [dynamicCardsData, setCards]=useState([
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg1, contactList:multiPplImg},
        {title:'Recognition for Together', subtitle:'Offered by Parner Name', cardImg:rectImg2, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg3, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg3, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg1, contactList:multiPplImg}
    ])

    return <>
                <div className='row'>
                    <div className='col-md-6 d-flex p-3'>
                        <div className='discover-cards d-flex'>
                            <div className='colorBox'>
                                    <AiOutlineStar></AiOutlineStar>
                            </div>
                            <div style={{marginLeft:'1rem'}}>
                                <span style={{fontSize:'large'}}>1,000</span><br/>
                                <span style={{fontSize:"0.8rem"}}>Singular NFT</span>
                            </div>
                            </div>
                            <div className='discover-cards d-flex'>
                                <div className='colorBox'>
                                    <RiStackFill></RiStackFill>
                                </div>
                            <div style={{marginLeft:'1rem'}}>
                                <span style={{fontSize:'large'}}>257</span><br/>
                                <span style={{fontSize:"0.8rem"}}>NFT Collection</span>
                            </div>
                        </div>
                    </div>
                </div>
                                
                <div className='row mt-3'>
                    <div className='col-md-10 mt-5 mb-3'>
                        <div className='hr-header'>
                            <span className='hr-title'>EXAMPLES OF SINGLE NFTS</span>
                            <hr></hr>
                        </div>
                    </div>
                    <div className='col-md-12 mt-3' style={{position:'relative'}}>
                        <div className='gradient-shadow'></div>
                        <Suspense fallback={<div>Loading</div>}>
                            <Carousel responsive={carouselState.responsive} draggable showDots={false}>
                                {dynamicCardsData.map((val, i)=><div style={{width:"200px",height:'290px'}}>
                                <DynamicCards rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards>
                                </div>)}
                                                
                            </Carousel>
                        </Suspense>
                    </div>
                </div>
    </>
}

export default ExampleNFTs;