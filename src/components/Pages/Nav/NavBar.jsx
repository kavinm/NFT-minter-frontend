import React from 'react';
import logo from '../../../assets/icon/Logo.svg';
import { useNavigate } from 'react-router-dom';

const NavBar=()=>{
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar" >
                <div className='row m-0 p-0'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='nav-area'>
                            <img alt="kpmg-logo" src={logo} id="kpmg-logo" />
                            <button className='btn' onClick={()=>navigate('/discover')}><h5>LAUNCH APP</h5></button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;