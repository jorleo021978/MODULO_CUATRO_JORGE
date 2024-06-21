import React, { useState } from 'react';

const Count = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <button className="buttonB" onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
    </div>
  );
};

export default Count;
