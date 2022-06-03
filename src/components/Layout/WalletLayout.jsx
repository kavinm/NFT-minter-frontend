import React from 'react';
import NavBarWallet from '../NavBarWallet';

const WalletLayout = ({children})=>{
    return <div className='wallet-layout'>
                <div className='wl-layout-header '>
                    <NavBarWallet></NavBarWallet>
                </div>
                <div className='wl-layout-body'>
                    {children}
                </div>    
            </div>

}

export default WalletLayout;