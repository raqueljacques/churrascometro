import React, { useState } from "react";
import Title from "../components/Title";
import formInputData from "../components/form/formInputData";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        postalCode: "",
    });

    const [isValid, setIsValid] = useState({
        name: true,
        email: true,
        postalCode: true,
    });

    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.products) {
        return null;
    }

    const { people, products } = state;

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case "name":
                return /^[a-zA-Z\s]+$/.test(value);
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case "postalCode":
                return /^\d{8}$/.test(value);
            default:
                return false;
        }
    };

    const handleInputChange = (fieldName, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleBlur = (fieldName) => {
        setIsValid((prevValid) => ({
            ...prevValid,
            [fieldName]: validateField(fieldName, formValues[fieldName]),
        }));
    };

    const handleSubmit = () => {
        const isValidForm = Object.keys(formInputData).every((key) => {
            const isValidField = validateField(key, formValues[key]);
            setIsValid((prevValid) => ({
                ...prevValid,
                [key]: isValidField,
            }));
            return isValidField;
        });

        if (isValidForm) {
            localStorage.setItem("registerData", JSON.stringify(formValues));
            console.log("Formulário válido. Dados:", formValues);
            navigate("/result", {
                state: { people, products },
            });
        } else {
            console.log(
                "Formulário inválido. Corrija os erros antes de enviar.",
                isValid
            );
        }
    };

    const handleBack = () => {
        //TODO: Poderia voltar lembrando os dados que foram escolhidos na primeira escolha
        navigate("/");
    };

    const handleSkip = () => {
        navigate("/result", {
            state: { people, products },
        });
    };

    return (
        <div className="container">
            <Title />
            <div className="calculator">
                <div className="row">
                    <div className="input-form-group">
                        <p id="header-form">
                            Fique por dentro de todas as novidades. Cadastre seu
                            e-mail e receba promoções especiais!
                        </p>
                        <form>
                            {Object.keys(formInputData).map((key) => (
                                <div key={key}>
                                    <input
                                        type={formInputData[key].type}
                                        id={formInputData[key].id}
                                        placeholder={
                                            formInputData[key].placeholder
                                        }
                                        className={`input-form ${
                                            !isValid[key] ? "input-error" : ""
                                        }`}
                                        value={formValues[key]}
                                        onChange={(e) =>
                                            handleInputChange(
                                                key,
                                                e.target.value
                                            )
                                        }
                                        onBlur={() => handleBlur(key)}
                                    />
                                    {isValid[key] || (
                                        <p id="invalid-input">
                                            {formInputData[key].errorMessage}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <Button onClick={handleSubmit} label="Cadastrar" />
                    </div>
                    <div id="nav-container">
                        <button id="back-nav" onClick={handleBack}>
                            Voltar
                        </button>
                        <button id="skip-register" onClick={handleSkip}>
                            Pular
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
