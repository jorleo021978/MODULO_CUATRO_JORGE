import React, { useEffect } from 'react';
import '../styles/component.css';

const ButtonTitle = ({ onNext, onPrevious, onPageSelect, currentPage, totalPages }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious]);

  return (
    <div className='buttonBox'>
      <button onClick={onPrevious}>
        Anterior
      </button>
      <div className='pageNumbers'>
        {getPageNumbers().map((number) => (
          <button id='number'
            key={number}
            onClick={() => onPageSelect(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
      <button onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
};

export default ButtonTitle;
