import React, { useState } from "react";

const FormInput = ({
    type,
    id,
    placeholder,
    value,
    onChange,
    onBlur,
    isValid,
    errorMessage,
}) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
        onBlur && onBlur(id);
    };

    return (
        <>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`input-form ${
                    touched && !isValid ? "input-error" : ""
                }`}
                value={value}
                onChange={(e) => onChange(id, e.target.value)} // Ensure 'e.target.value' is accessible
                onBlur={handleBlur}
            />
            {touched && !isValid && <p id={`invalid-${id}`}>{errorMessage}</p>}
        </>
    );
};

export default FormInput;
