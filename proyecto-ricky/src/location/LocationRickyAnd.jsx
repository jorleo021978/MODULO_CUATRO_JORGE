import React, { useState, useEffect } from 'react';
import '../styles/location.css'; // Importar archivo CSS de estilos

function LocationCard({ location }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(location.url)
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image); // Usar el campo image de la respuesta de la API
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
  }, [location.url]);

  return (
    <div className="location-card">
      <h3>{location.name}</h3>
      {image && <img src={image} alt={location.name} className="location-image" />}
      <p><strong>Dimensión:</strong> {location.dimension}</p>
      <p><strong>Tipo:</strong> {location.type}</p>
      <p><strong>Dirección:</strong> {location.url}</p>
    </div>
  );
}

function LocationRickyAnd() {
  const [allLocations, setAllLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAllLocations();
  }, []); // Solo se ejecuta una vez al cargar el componente

  useEffect(() => {
    fetchAllLocations();
  }, [currentPage]); // Se ejecuta cada vez que cambia currentPage

  const fetchAllLocations = async () => {
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);

      const response = await fetch(`https://rickandmortyapi.com/api/location/?${params.toString()}`);
      const data = await response.json();

      setAllLocations(data.results);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las localizaciones. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(allLocations.length / locationsPerPage)
        ? prevPage + 1
        : 1
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage > 1
        ? prevPage - 1
        : Math.ceil(allLocations.length / locationsPerPage)
    );
  };

  const totalPages = Math.ceil(allLocations.length / locationsPerPage);

  if (loading) {
    return <p className="message">Cargando...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  return (
    <div className="location-container">
      <h2>Localizaciones de Rick and Morty</h2>
      <div className="location-cards">
        {allLocations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Siguiente</button>
      </div>
    </div>
  );
}

export default LocationRickyAnd;
