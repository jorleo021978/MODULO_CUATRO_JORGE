import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const LocationCharacterCard = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get('page');
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const locationsWithResidents = await Promise.all(
          data.results.map(async (location) => {
            const residents = await Promise.all(
              location.residents.slice(0, 20).map(async (residentUrl) => {
                const residentResponse = await fetch(residentUrl);
                if (!residentResponse.ok) {
                  throw new Error('Network response was not ok');
                }
                return residentResponse.json();
              })
            );
            return { ...location, residents };
          })
        );
        setLocations(locationsWithResidents);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [page]);

  const nextPage = () => {
    const nextPageNumber = page === totalPages ? 1 : page + 1;
    setSearchParams({ page: nextPageNumber });
    setPage(nextPageNumber);
  };

  const prevPage = () => {
    const prevPageNumber = page === 1 ? totalPages : page - 1;
    setSearchParams({ page: prevPageNumber });
    setPage(prevPageNumber);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      nextPage();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevPage();
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        nextPage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [page, totalPages]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className='location-container'>
        {locations.map((location) => (
          <div key={location.id} className='location-item'>
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
            <h3>Residents:</h3>
            <ul>
              {location.residents.map((resident) => (
                <li key={resident.id}>
                  {resident.name} - {resident.status} - {resident.species}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='pagination'>
        <button className='button' onClick={prevPage}>Previous</button>
        <button className='button' onClick={nextPage}>Next</button>
      </div>
    </>
  );
}

export default LocationCharacterCard;
