import React from 'react';
import logo from '../../assets/icon/Logo.svg';
import {FaLinkedinIn, FaFacebookF} from 'react-icons/fa';
import {AiOutlineTwitter, AiFillYoutube} from'react-icons/ai';
import {GrInstagram} from 'react-icons/gr';

const Footer1=()=>{
    return <>
        <div className='row m-0'>
            <div className='col-md-12 mt-3 text-white d-flex justify-content-center p-0' style={{background:"linear-gradient(100.77deg, rgba(30, 73, 227, 0.1) 0%, rgba(11, 35, 59, 0.1) 100%)"}}>
                <div className='footer-area mt-5 pb-5'>
                    <div className='row'>
                        <div className='col-md-9'>
                            <img src={logo} style={{width:'6rem'}}/>
                        </div>
                        <div className='col-md-3 d-flex align-items-center'>
                            <div style={{fontWeight:'550',fontSize:'0.8rem'}}>kpmg.ca</div>
                            <div className='d-flex align-items-center' style={{marginLeft:'3rem'}}>
                                <FaLinkedinIn color={'#fff'} size={18}></FaLinkedinIn> &nbsp; &nbsp;
                                <AiOutlineTwitter color={'#fff'} size={18}></AiOutlineTwitter> &nbsp; &nbsp;
                                <FaFacebookF color={'#fff'} size={18}></FaFacebookF> &nbsp; &nbsp;
                                <GrInstagram color={'#fff'} size={18}></GrInstagram> &nbsp; &nbsp;
                                <AiFillYoutube color={'#fff'} size={18}></AiFillYoutube>
                            </div>
                        </div>
                        <div className='col-md-12 mt-2'>
                            <div style={{fontSize:"0.8rem", paddingLeft:'0.8rem', color:'#F1F3F2'}}>KPMG is a leading provider of audit, tax and advisory services. Lorem ipsum dolor sit amet,<br/>consectetur adipiscing elit. Facilisi ac phasellus placerat a pellentesque tellus sed egestas.  </div>
                        
                        </div>
                        <div className='col-md-12 mt-4 '>
                            <div style={{fontSize:"0.8rem", paddingLeft:'0.8rem', color:'#FFFFFF80'
}}>
                            © 2022 KPMG LLP, an Ontario limited liability partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.
                            <br/><br/>
For more detail about the structure of the KPMG global organization please visit https://home.kpmg/governance.
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Footer1;