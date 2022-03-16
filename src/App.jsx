import React from 'react'

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import MintingForm from './components/MintingForm'
import MintPage from './components/MintPage'
import LandingPage from './components/LandingPage'
import MintOneNFT from './components/MintOneNFT'
import ImagePreview from './components/ImagePreview'
import CollectionPage from './components/CollectionPage'

const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/mint" element={<MainLayout><MintPage/></MainLayout>}/>
          <Route path="/collection" element={<MainLayout><CollectionPage/></MainLayout>}/>
          <Route path="/img" element={<ImagePreview/>}/>

        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App