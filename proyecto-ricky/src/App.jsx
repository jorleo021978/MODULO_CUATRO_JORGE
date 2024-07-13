import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Inicio from './pajinasDeRickyAndMorty/Inicio';
import Contact from './pajinasDeRickyAndMorty/Contact';
import Episodes from './pajinasDeRickyAndMorty/Episodes';
import Location from './pajinasDeRickyAndMorty/Location';
import wasap from './image/wasap.png'

function App() {
  const [filter] = useState('');

  return (
    <>
      <div className="container">
        <Router>
          <div className="containerBoxPage">
            <h1 className="rick-and-morty-title">Rick And Morty</h1>
            <nav className="boxUlPageNav">
              <ul className="boxUlPage">
                <li><Link className="pageLink" to="/">Home</Link></li>
                <li><Link className="pageLink" to="episodes">Episode</Link></li>
                <li><Link className="pageLink" to="contact">Contact</Link></li>
                <li><Link className="pageLink" to="location">Location</Link></li>
              </ul>
            </nav>
          </div>
          <div className="containerBox">
            <Routes>
              <Route path="/" element={<Inicio filter={filter} />} />
              <Route path="contact" element={<Contact />} />
              <Route path="episodes" element={<Episodes />} />
              <Route path="location" element={<Location />} />
            </Routes>
          </div>
        </Router>
      </div>
      <div className='footer'>
        <ul>
          <a href="https://web.whatsapp.com/"><img className='logoWasap' src={wasap} alt="" /></a>
        </ul>       
      </div>
    </>
  );
}

export default App;
