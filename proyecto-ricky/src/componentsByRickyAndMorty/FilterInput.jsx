import React from 'react';

const FilterInput = ({ filter, setFilter }) => {
  return (
    <div className='filters'>
      <div className='busquedaUno'>
        <input
          className='inputFilter'
          type="text"
          placeholder="Filtrar por nombre o ID"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterInput;
