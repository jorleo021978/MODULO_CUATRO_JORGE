import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../componentsByRickyAndMorty/CharacterCard';
import ButtonTitle from '../componentsByRickyAndMorty/Button';
import FilterInput from '../componentsByRickyAndMorty/FilterInput';
import '../App.css';

const Inicio = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const totalPages = 42; 
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams hook to manage URL query parameters

  const fetchCharacters = async () => {
    if (filter) {
      if (isNaN(filter)) {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${filter}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setFilteredCharacters(data.results);
            setNoResults(false);
          } else {
            setFilteredCharacters([]);
            setNoResults(true);
            setTimeout(() => {
              setFilter('');
              setPage(1);
              setNoResults(false);
            }, 5000);
          }
        } catch (error) {
          console.error('Error fetching characters by name:', error);
          setFilteredCharacters([]);
          setNoResults(true);
          setTimeout(() => {
            setFilter('');
            setPage(1);
            setNoResults(false);
          }, 5000);
        }
      } else {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${filter}`);
          const data = await response.json();
          if (data.id) {
            setFilteredCharacters([data]);
            setNoResults(false);
          } else {
            setFilteredCharacters([]);
            setNoResults(true);
            setTimeout(() => {
              setFilter('');
              setPage(1);
              setNoResults(false);
            }, 5000);
          }
        } catch (error) {
          console.error('Error fetching character by ID:', error);
          setFilteredCharacters([]);
          setNoResults(true);
          setTimeout(() => {
            setFilter('');
            setPage(1);
            setNoResults(false);
          }, 5000);
        }
      }
    } else {
      fetchCharactersByPage(page);
    }
  };

  const fetchCharactersByPage = async (pageNumber) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
      const data = await response.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setNoResults(false);
    } catch (error) {
      console.error('Error fetching characters by page:', error);
      setCharacters([]);
      setFilteredCharacters([]);
      setNoResults(false);
    }
  };

  // Set filter and page from query parameters on component mount
  useEffect(() => {
    const query = searchParams.get('query');
    const pageParam = searchParams.get('page');
    setFilter(query || '');
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    fetchCharacters();
  }, [filter]);

  useEffect(() => {
    fetchCharactersByPage(page);
  }, [page]);

  const handleNextPage = () => {
    const nextPage = page === totalPages ? 1 : page + 1;
    setSearchParams({ query: filter, page: nextPage }); // Update URL query parameters
  };

  const handlePreviousPage = () => {
    const prevPage = page === 1 ? totalPages : page - 1;
    setSearchParams({ query: filter, page: prevPage }); // Update URL query parameters
  };

  const handlePageSelect = (pageNumber) => {
    setSearchParams({ query: filter, page: pageNumber }); // Update URL query parameters
  };

  return (
    <>
      <div className='filterInput'>
        <FilterInput filter={filter} setFilter={(newFilter) => setSearchParams({ query: newFilter, page: 1 })} />
      </div>
      <div className='container'>
        <div className='containerBox'>
          {noResults ? (
            <h2 className='consult'>Consulta no valida</h2>
          ) : (
            filteredCharacters.map((character) => (
              <CharacterCard 
                name={character.name}
                image={character.image}
                key={character.id}
                id={character.id}
                genre={character.gender}
                status={character.status}
              />
            ))
          )}
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

export default Inicio;
