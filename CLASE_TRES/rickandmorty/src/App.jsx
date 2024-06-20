// src/App.js

import React from 'react';
import './App.css';
import Name from './compenent/name';
import Image from './compenent/Image';
import Details from './compenent/Details'

function App() {
  return (
    <>
      <div className='container'>
        <div className='containerBox'>
          <Name/>
          <Image/>
          <Details/>
        </div>
      </div>
    </>
  );
}

export default App;

