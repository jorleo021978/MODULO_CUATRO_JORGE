import React, { useEffect } from 'react';

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
      <button  className='pagerRick' onClick={onPrevious}>
        <div>Anterior</div>
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
      <button className='pagerRick' onClick={onNext}>
        <div className='pagerRick'>Siguiente</div>
      </button>
    </div>
  );
};

export default ButtonTitle;
