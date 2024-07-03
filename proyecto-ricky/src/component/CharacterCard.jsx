import React from 'react';
import '../styles/component.css'

function CharacterCard({ id, name, image, genre, status }) {
  return (
    <div className='card'>
      <h2 className='name'>{name}</h2>
      <img className='image' src={image} alt={name} />
      <p className='nameId'>ID: {id}</p>
      <p className='genero'>Género: {genre}</p>
      <p className='genero'>Estado: {status}</p>
    </div>
  );
}

export default CharacterCard;
