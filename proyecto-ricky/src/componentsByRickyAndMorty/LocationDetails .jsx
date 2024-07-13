import React, { useEffect, useState } from 'react';

const LocationDetails = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/location/20');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <h2>Residents:</h2>
      <ul>
        {location.residents.map((resident, index) => (
          <li key={index}>
            <a href={resident}>{resident}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationDetails;
