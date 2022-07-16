import React from 'react';
import earthIlls from '../../../assets/illustrations/earth.svg';
import {BsArrowRight} from 'react-icons/bs';

const BlueBanner =()=>{
    return <div className='blue-banner'>
            <div className='row'>
                <div className='col-md-5'>
                    <div className='banner-texts'>
                        <span className='banner-title'>KPMG’s Cryptoasset &<br/>enterprise blockchain<br/>services</span>
                            <br/>
                            <br/>
                            <br/>
                        <span className='banner-sub-title'>Seize the opportunities of cryptoassets<br/>to unlock new value for your clients.</span>
                        <br/><br/>
                        <button className='btn banner-read-more d-flex align-items-center'>Read More&nbsp;&nbsp; <BsArrowRight></BsArrowRight> </button>
                    </div>
                </div>
                <div className='col-md-7 earthImg'>
                    <img src={earthIlls} />
                </div>
            </div>
        </div>
    
    
    // <div className='blue-banner'>
    //         <div className='row'>
    //             <div className='col-md-5'>
                    
    //             </div>
    //             <div className='col-md-7 earthImg'>
    //                 <img src={earthIlls} />
    //             </div>
    //         </div>
    //     </div>
    
}

export default BlueBanner;