import React from 'react';
import '../App.css'

const CharacterCard = ({ name, episode, air_date }) => {
  return (
    <div className="character-cardEp">
      <div className='cardEpisodio'>
        <div className='nameEpisode'>
            <h2>{name}</h2>
        </div>
        <div className='episodeT01'>
            <p>Episode: {episode}</p>
        </div>
        <div className='emisionEpisode'>
            <p>Air Date: {air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
