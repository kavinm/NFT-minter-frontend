import React from 'react';

const DynamicCards =({rectImg, multiPplImg})=>{

    return <>
        <div className='row dynamic-cards'>
            <div className="col-md-12 mb-3" style={{width:'190px',height:'180px',borderRadius:'10px'}}>
                <img src={rectImg} style={{width:"100%",height:'100%'}}/>
            </div>
            <div className='col-md-6'>
                <img src={multiPplImg} className="contacts-img" />
            </div>
            <div className='col-md-6'>
               <span className='day-count'>1 day ago</span>
            </div>
            <div className='col-md-12 mt-3'>
                <span className='dynamic-cards-titles'>Recognition for Excellence</span><br/>
                <span className='dynamic-cards-subtitle'>Offered by Parner Name</span>
            </div>
        </div>
    </>
}

export default DynamicCards;