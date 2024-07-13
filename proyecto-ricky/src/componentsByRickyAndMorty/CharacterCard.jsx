import React from 'react';

function CharacterCard({ id, name, image, genre, status }) {
  return (
    <div className='cardBox'>
      <h2 className='nameRick'>{name}</h2>
      <img className='imageRicr' src={image} alt={name} />
      <p className='nameIdRicr'>{id}</p>
      <p className='generoRick'>{status}</p>
      <p className='generoRick'>{genre}</p>
    </div>
  );
}

export default CharacterCard;
