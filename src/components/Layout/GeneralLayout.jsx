import React from 'react';
import NavBar from '../Pages/Nav/NavBar';
// import Footer1 from './Footer1';

const GeneralLayout = ({children})=>{
    return <div className='general-layout'>
                <div className='gn-layout-header '>
                    <NavBar></NavBar>
                </div>
                <div className='gn-layout-body'>
                    {children}
                </div>  
                {/* <div className='gn-layout-footer'>
                    
                </div>   */}
            </div>

}

export default GeneralLayout;