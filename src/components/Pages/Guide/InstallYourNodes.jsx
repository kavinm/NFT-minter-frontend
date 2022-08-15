import React, { useState } from 'react';
import chromImg from '../../../assets/images/chromeImg.png';
import metamask_website from '../../../assets/images/metamask_website.png';
import metamask from '../../../assets/images/metamask.png';
import download_extension from '../../../assets/images/download_extension.png';
import create_password from '../../../assets/images/create_password.png';
import new_to_metamask from '../../../assets/images/new_to_metamask.png';
import sceret_key from '../../../assets/images/sceret_key.png';
import congrats from '../../../assets/images/congrats.png';

const InstallYourNodes =()=>{

    const [menuList, setMenuList] = useState([
        {
            title:"Ensure that you are using a chrome browser.",
            Imgs:chromImg,
            width:'70%'
        },
        {
            title:"Click here to go to the MetaMask website, and click “Download Now”",
            Imgs:metamask_website,
            width:'70%'
        },
        {
            title:"Download the Chrome extension and add it to your browser”",
            Imgs:download_extension,
            width:'75%'
        },
        {
            title:"Click on the MetaMask extension in the top right corner of your browser.",
            Imgs:metamask,
            width:'80%'
        },
        {
            title:"Select connect a wallet, or create a wallet.",
            Imgs:new_to_metamask,
            width:'90%'
        },
        {
            title:"Enter a password and hit create. MetaMask will now show a 12-word recovery key.",
            Imgs:create_password,
            width:'75%'
        },
        {
            title:"MetaMask will then give a small test to ensure that you have saved your recovery key.",
            Imgs:sceret_key,
            width:'70%'
        },
        {
            title:"Congrats! You have successfully created your MetaMask wallet.",
            Imgs:congrats,
            width:'80%'
        }
    ])

    return <>
                <div className="row learn-more">
                    {menuList.map((val,idx)=> <div className='col-md-6 mt-5 d-flex justify-content-center'>
                        <div style={{width:'80%'}}>
                            <div className='row'>
                                <div className='col-md-3 text-center'>
                                    <h5 className='step-num'>{idx+1}</h5>
                                </div>
                                <div className='col-md-9 title-text mt-3'>
                                    <span>{val.title}</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 learn-more-images'>
                                    <img src={val.Imgs} style={{width:val.width}}/>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </>
}

export default InstallYourNodes;