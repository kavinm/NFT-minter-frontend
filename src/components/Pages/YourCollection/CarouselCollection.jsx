import React, { Suspense, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import multiPplImg from '../../../assets/illustrations/Component 1.png';
import rectImg1 from '../../../assets/illustrations/greenRect.svg';
import rectImg2 from '../../../assets/illustrations/Rectangle 187 (3).svg';
import rectImg3 from '../../../assets/illustrations/Rectangle 187 (4).svg';
import DynamicCards from '../../ModularCodes/DynamicCards';
import _2mGraphic from '../../../assets/images/2M Graphic.png';
import excellent from '../../../assets/images/excellent-service.png';
import _90plus from '../../../assets/images/_90plus.png';


const CarouselCollection=()=>{
    const [ carouselState, setCarouse] = useState({
        responsive:{
            superLargeDesktop:{
                breakpoint:{ max:4000, min:3000 },
                items:5.5,
                partialVisibilityGutter: 30
            },
            desktop:{
                breakpoint:{ max:3000, min:1024 },
                items:5,
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
    const [dynamicCardsData2, setCards]=useState([
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:excellent, contactList:multiPplImg},
        {title:'Recognition for Together', subtitle:'Offered by Parner Name', cardImg:_2mGraphic, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:_90plus, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg3, contactList:multiPplImg},
        {title:'Recognition for Excellence', subtitle:'Offered by Parner Name', cardImg:rectImg1, contactList:multiPplImg}
    ])

    return <>
        <div className='row mt-5'>
            <div className='col-md-10 mt-5'>
                <div className='hr-header'>
                    <span className='hr-title'>DISCOVER THE MOST RECENT RECOGNITIONS</span>
                    <hr></hr>
                </div>
            </div>
            <div className='col-md-12 mt-5 pb-5' style={{position:'relative'}}>
            <div className='gradient-shadow'></div>
                <Suspense fallback={<div>Loading</div>}>
                    <Carousel responsive={carouselState.responsive} draggable showDots={false}>
                        {dynamicCardsData2.map((val, i)=><div style={{width:"200px",height:'290px'}}>
                        <DynamicCards rectImg={val.cardImg} key={i} multiPplImg={val.contactList}></DynamicCards>
                        </div>)}                       
                    </Carousel>
                </Suspense>
            </div>
        </div>
    </>
}

export default CarouselCollection;