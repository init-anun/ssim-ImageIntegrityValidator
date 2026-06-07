import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Detection from './pages/Detection';
function App() {

  return (
        <div className='appContainer'>
          <Router>
            <Routes>
              <Route path="/" element={<Detection />} />
              <Route path="/detection" element={<Detection />} />
            </Routes>
          </Router>

        </div>
  )
}

export default App
