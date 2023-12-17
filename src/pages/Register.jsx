import React, { useState } from "react";
import Title from "../components/Title";
import formInputData from "../components/form/formInputData";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";

const apiUrl = "https://churrascometro-api.vercel.app/leads";

const Register = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        postalCode: "",
        consentInput: true,
    });

    const [isValid, setIsValid] = useState({
        name: true,
        email: true,
        postalCode: true,
    });

    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

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
        if (fieldName === "consentInput") {
            value = !formValues["consentInput"];
        }
        console.log("handleInputChange", fieldName, value);

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

    const handleSubmit = async () => {
        setErrorMessage(false);
        setLoading(true);
        const isValidForm = Object.keys(formInputData).every((key) => {
            const isValidField = validateField(key, formValues[key]);
            setIsValid((prevValid) => ({
                ...prevValid,
                [key]: isValidField,
            }));
            return isValidField;
        });

        if (isValidForm) {
            console.log("Formulário válido. Dados:", formValues);

            try {
                const apiPayload = {
                    email: formValues.email,
                    name: formValues.name,
                    postalCode: formValues.postalCode,
                    optIn: formValues.consentInput,
                };

                const apiRequest = await fetch(apiUrl, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(apiPayload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const apiResponse = await apiRequest.json();

                console.log("apiResponse", apiResponse);

                localStorage.setItem(
                    "registerData",
                    JSON.stringify(formValues)
                );

                navigate("/result", {
                    state: { people, products },
                });
            } catch (error) {
                setErrorMessage(true);
                console.log("Erro ao enviar dados para a API", error);
            }
        } else {
            console.log(
                "Formulário inválido. Corrija os erros antes de enviar.",
                isValid
            );
        }
        setLoading(false);
    };

    const handleBack = () => {
        //TODO: Poderia voltar lembrando os dados que foram escolhidos na primeira tela
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
                            <div id="consent-input">
                                <input
                                    type="checkbox"
                                    id="consent-checkbox"
                                    name="consentInput"
                                    checked={formValues["consentInput"]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "consentInput",
                                            e.target.checked
                                        )
                                    }
                                />
                                <label
                                    htmlFor="consent-checkbox"
                                    id="consent-label"
                                >
                                    Concordo em receber comunicações e ofertas
                                    personalizadas de acordo com meus
                                    interesses.
                                </label>
                            </div>
                            {errorMessage && (
                                <p
                                    id="invalid-input"
                                    style={{ marginTop: "10px" }}
                                >
                                    Ocorreu um erro ao cadastrar o email.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <Button
                            onClick={handleSubmit}
                            label="Cadastrar"
                            isLoading={loading}
                        />
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
            <ThemeSwitch />
        </div>
    );
};

export default Register;
