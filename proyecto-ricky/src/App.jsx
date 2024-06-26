import React, { useEffect, useState } from 'react';
import CharacterCard from './component/CharacterCard';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");

  const rickAndMortyCharacterId = 1;

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${rickAndMortyCharacterId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result); 
        setName(result.name);
        setImage(result.image);
        setGenre(result.gender); 
        setStatus(result.status);
      });
  }, [rickAndMortyCharacterId]);

  return (
    <div className='container'>
        <div className='containerBox'>
          <CharacterCard 
          name={name}
          image={image}
          genre={genre}
          status={status}
          />
        </div>
    </div>
  );
}


export default App;
