import React, { useEffect, useState } from 'react';
import CharacterCard from './component/CharacterCard';
import ButtonTitle from './component/Button';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterId, setFilterId] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const totalPages = 42; // Número total de páginas conocido

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      });
  }, [page]);

  useEffect(() => {
    if (filterId) {
      fetch(`https://rickandmortyapi.com/api/character/${filterId}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredCharacters([data]);
        })
        .catch((error) => {
          setFilteredCharacters([]); // Vaciar el arreglo si no se encuentran resultados
        });
    } else if (filterName) {
      fetch(`https://rickandmortyapi.com/api/character/?name=${filterName}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredCharacters(data.results || []);
        })
        .catch((error) => {
          setFilteredCharacters([]); // Vaciar el arreglo si no se encuentran resultados
        });
    } else {
      setFilteredCharacters(characters);
    }
  }, [filterName, filterId, characters]);

  const handleNextPage = () => {
    setPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const handlePageSelect = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div>
        <h1 className='drip-text'>Rick and Morty</h1>
        <div className='filters'>
          <div className='busquedaUno'>
            <div className='busquedaDos'>
              <input className='input'
                type="text"
                placeholder="Filtrar por nombre"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div className='busquedaDos'>
              <input className='input'
                type="text"
                placeholder="Filtrar por ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>   
      <div className='containerBusqueda'>
        <ButtonTitle 
          onNext={handleNextPage} 
          onPrevious={handlePreviousPage} 
          onPageSelect={handlePageSelect}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
      <div className='container'>
        <div className='containerBox'>
          {filteredCharacters.map((character) => (
            <CharacterCard 
              name={character.name}
              image={character.image}
              key={character.id}
              id={character.id}
              genre={character.gender}
              status={character.status}
            />
          ))}
        </div>
      </div>
      <div className='inferior'>
        <ButtonTitle 
          onNext={handleNextPage} 
          onPrevious={handlePreviousPage} 
          onPageSelect={handlePageSelect}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default App;
