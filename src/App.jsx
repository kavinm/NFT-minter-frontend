import React, {useState} from 'react'
import './App.scss';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import MintingForm from './components/MintingForm'
import MintPage from './components/MintPage'
import LandingPage from './components/LandingPage'
import MintOneNFT from './components/MintOneNFT'
import ImagePreview from './components/ImagePreview'
import CollectionPage from './components/CollectionPage'
import NewLandingPage from './components/NewLadingPage';
import GeneralLayout from './components/Layout/GeneralLayout';
import WalletLayout from './components/Layout/WalletLayout';
import Discover from './components/Pages/Discover';
import GoofyAuth from './components/GoofyAuth';

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <GeneralLayout><NewLandingPage/></GeneralLayout>}/>
          <Route path="/discover" element={<WalletLayout><Discover></Discover></WalletLayout>} />
          <Route path="/mint" element={<MainLayout><MintPage/></MainLayout>}/>
          <Route path="/collection" element={<MainLayout><CollectionPage/></MainLayout>}/>
          <Route path="/img" element={<ImagePreview/>}/>
          <Route path="/auth" element={<GoofyAuth setAuth={setIsAuth}/>}/>

        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App