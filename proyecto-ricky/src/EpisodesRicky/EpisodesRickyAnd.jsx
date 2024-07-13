import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../EpisodesRicky/CharacterCard';
import '../styles/episodioUno.css';
import PaginationButtons from './PaginationButtons';

const EpisodesRickyAnd = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get('page');
    setPage(pageParam ? parseInt(pageParam) : 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEpisodes(data.results);
        setHasNextPage(!!data.info.next);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
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
  }, [page, hasNextPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className='containerEpisode'>
        <div className='containerEpisodeCharacterCard' onKeyDown={handleEnterKeyPress} tabIndex={0}>
          {episodes.map((episode) => (
            <CharacterCard
              key={episode.id}
              name={episode.name}
              episode={episode.episode}
              air_date={episode.air_date}
            />
          ))}
        </div>
      </div>
      <div className='paginationEpisode'>
        <button className='button' onClick={prevPage}>Previous</button>
        <PaginationButtons
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(pageNumber) => {
            setSearchParams({ page: pageNumber });
            setPage(pageNumber);
          }}
        />
        <button className='button' onClick={nextPage}>Next</button>
      </div>
    </>
  );
}

export default EpisodesRickyAnd;
