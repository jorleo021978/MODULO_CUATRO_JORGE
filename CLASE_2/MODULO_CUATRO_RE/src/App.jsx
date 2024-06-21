// src/App.js
import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(pokemon => 
          fetch(pokemon.url)
            .then(res => res.json())
            .then(pokemonData => 
              fetch(pokemonData.species.url)
                .then(res => res.json())
                .then(speciesData => ({
                  ...pokemonData,
                  genderRate: speciesData.gender_rate,
                }))
            )
        );
        return Promise.all(fetches);
      })
      .then(pokemonData => setCardsData(pokemonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getGender = (genderRate) => {
    if (genderRate === -1) return 'Genderless';
    const femaleRate = (genderRate / 8) * 100;
    const maleRate = 100 - femaleRate;
    return `Male: ${maleRate}%, Female: ${femaleRate}%`;
  };

  return (
    <div className="App">
      <h1>Pokémon Cards</h1>
      <div className="card-container">
        {cardsData.map(card => (
          <Card
            key={card.id}
            imageSrc={card.sprites.front_default}
            titleText={card.name}
            detailText={`Height: ${card.height}, Weight: ${card.weight}, Gender: ${getGender(card.genderRate)}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
