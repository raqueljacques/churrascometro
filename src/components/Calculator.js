// Calculator.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accountant from "./Accountant";
import Header from "./Header";
import ErrorMessage from "./ErrorMessage";
import ThemeSwitch from "./ThemeSwitch";

const Calculator = () => {
    const [menCount, setMenCount] = useState(0);
    const [womenCount, setWomenCount] = useState(0);
    const [kidCount, setKidCount] = useState(0);

    const navigate = useNavigate(); // Corrigido para s

    // Função para calcular a quantidade de cada produto com base no número e perfil de pessoas
    const calculateProducts = () => {
        const totalCarne = (
            0.4 * menCount +
            0.32 * womenCount +
            0.2 * kidCount
        ).toFixed(2);
        const totalPaoDeAlho = 2 * (menCount + womenCount) + 1 * kidCount;
        const totalCarvao = 1 * (menCount + womenCount + kidCount);
        const totalSal = 0.04 * (menCount + womenCount + kidCount);
        const totalGelo =
            Math.ceil((menCount + womenCount + kidCount) / 10) * 5;
        const totalRefrigerante = Math.ceil(
            (menCount + womenCount + kidCount) / 5
        );
        const totalAgua = Math.ceil((menCount + womenCount + kidCount) / 5);

        return {
            totalCarne,
            totalPaoDeAlho,
            totalCarvao,
            totalSal,
            totalGelo,
            totalRefrigerante,
            totalAgua,
        };
    };

    const handleMenChange = (value) => {
        setMenCount(value);
    };

    const handleWomenChange = (value) => {
        setWomenCount(value);
    };

    const handleKidChange = (value) => {
        setKidCount(value);
    };

    const handleCalculateClick = () => {
        const products = calculateProducts();
        navigate("/result", {
            state: { totalPeople: menCount + womenCount + kidCount, products },
        });
    };

    return (
        <>
            <div className="calculator">
                <Header />
                <div className="row-first">
                    <Accountant
                        label="Homens"
                        id="men"
                        onValueChange={handleMenChange}
                    />
                    <Accountant
                        label="Mulheres"
                        id="women"
                        onValueChange={handleWomenChange}
                    />
                    <Accountant
                        label="Crianças"
                        id="kid"
                        onValueChange={handleKidChange}
                    />
                    <button
                        className="default-button"
                        onClick={handleCalculateClick}
                    >
                        Calcular
                    </button>
                </div>
            </div>
            <ErrorMessage />
            <ThemeSwitch />
        </>
    );
};

export default Calculator;
