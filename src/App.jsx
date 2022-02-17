import React from 'react'

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import MintingForm from './components/MintingForm'
import MintPage from './components/MintPage'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/mint" element={<MintPage/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>

    </>
  )
}

export default App