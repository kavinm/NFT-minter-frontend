import React, {useState} from 'react'
import './App.scss';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import NewLandingPage from './components/NewLadingPage';
import GeneralLayout from './components/Layout/GeneralLayout';
import WalletLayout from './components/Layout/WalletLayout';
import Discover from './components/Pages/Discover';
import GoofyAuth from './components/Pages/TemporaryComponents/GoofyAuth';
import WhatItMeansForYou from './components/Pages/Guide/WhatItMeansForYou';

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <GeneralLayout><NewLandingPage/></GeneralLayout>}/>
          <Route path="/what-it-means-for-you" element={ <GeneralLayout><WhatItMeansForYou/></GeneralLayout>}/>
          <Route path="/discover" element={<WalletLayout><Discover></Discover></WalletLayout>} />
        </Routes>
    </BrowserRouter>

    </>
  )

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoofyAuth setAuth={setIsAuth}/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )

}

export default App