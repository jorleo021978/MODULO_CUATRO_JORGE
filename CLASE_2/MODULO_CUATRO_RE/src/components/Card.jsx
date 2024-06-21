// src/Card.js
import React from 'react';
import Title from './Title';
import Image from './Image';
import Detail from './Detail';

const Card = ({ imageSrc, titleText, detailText }) => {
  return (
    <div className="card">
        <Image src={imageSrc} alt={titleText}/>
        <Title text={titleText}/>
        <Detail text={detailText}/>
    </div>
  );
};

export default Card;
