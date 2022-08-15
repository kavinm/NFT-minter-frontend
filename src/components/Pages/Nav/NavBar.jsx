import React from 'react';
import logo from '../../../assets/icon/Logo.svg';
import { useNavigate } from 'react-router-dom';

const NavBar=()=>{

    const navigate = useNavigate();


    return <>
        <nav className="navbar" >
        <div className='row m-0 p-0'>
            <div className='col-md-12 d-flex align-items-center justify-content-center'>
                <div className='nav-area'>
                    <img src={logo} id="kpmg-logo" />
                    <button className='btn' onClick={()=>navigate('/discover')}><h5>LAUNCH APP</h5></button>
                </div>
            </div>
                {/* <div className='col-md-7'>
                    <img src={logo} id="kpmg-logo"/>
                </div>
                <div className='col-md-5 launch-btn'>
                    <button className='btn'><h5>LAUNCH APP</h5></button>
                </div> */}
            </div>
        </nav>
    </>
}

export default NavBar;