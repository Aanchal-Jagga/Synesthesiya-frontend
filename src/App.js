import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter ,Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';

import Home from "./Components/Home";
import DreamLab from "./Components/DreamLab";
import DreamScenes from "./Components/DreamScenes";
import Echoes from "./Components/Echoes";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
function App() 
{
  
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/dl.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh', // ensures full viewport height
    width: '100%',
  };
  return (
    <>
      <div style={backgroundStyle}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dream-lab" element={<DreamLab />} />
            <Route exact path="/dream-scenes" element={<DreamScenes />} />
            <Route exact path="/echoes" element={<Echoes />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/logout" element={<Logout />} />

          </Routes>
        </BrowserRouter>
      </div>
      
    </>
  );
}

export default App;
