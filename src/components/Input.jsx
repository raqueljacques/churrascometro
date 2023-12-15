import React, { useState } from "react";

const Input = ({ label, id, onValueChange }) => {
    const [value, setValue] = useState(0);

    const handleDecrement = () => {
        setValue((prevValue) => Math.max(0, prevValue - 1));
        onValueChange(value - 1);
    };

    const handleIncrement = () => {
        setValue((prevValue) => prevValue + 1);
        onValueChange(value + 1);
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
                <button
                    className="input-group__button--small"
                    onClick={handleDecrement}
                >
                    -
                </button>
                <button
                    className="input-group__button--small"
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Input;
