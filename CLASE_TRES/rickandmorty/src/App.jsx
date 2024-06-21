import React from 'react';
import './App.css';
import Name from './compenent/name'
import Image from './compenent/Image'
import Details from './compenent/Details';
import Count from './OtherComponents/Count';


function App() {
  return (
    <div className='container'>
      <div className='containerBox'>
        <Name/>
        <Image />
        <Details />
        <Count/>
      </div>
    </div>
  );
}

export default App;