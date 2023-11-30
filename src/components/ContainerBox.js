import React, { useState } from 'react';

const CounterInput = ({ label, id }) => {
  const [value, setValue] = useState(0);

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(0, prevValue - 1));
  };

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        value={value}
        className="input-valid"
        readOnly
      />
      <div className="button-group">
        <button className="input-group__button--small" onClick={handleDecrement}>
          -
        </button>
        <button className="input-group__button--small" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

const ContainerBox = () => {
  return (
    <div className='row-first'>
      <CounterInput label="Homens" id="men" />
      <CounterInput label="Mulheres" id="women" />
      <CounterInput label="Crianças" id="kid" />
    </div>
  );
};

export default ContainerBox;
