import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Header from "./Header";
import ThemeSwitch from "./ThemeSwitch";

const Calculator = () => {
    const [menCount, setMenCount] = useState(0);
    const [womenCount, setWomenCount] = useState(0);
    const [kidCount, setKidCount] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

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
        const totalPeople = menCount + womenCount + kidCount;

        if (totalPeople === 0) {
            setShowErrorMessage(true);

            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000);
        } else {
            setShowErrorMessage(false);
            const products = calculateProducts();
            navigate("/result", {
                state: { totalPeople, products },
            });
        }
    };

    return (
        <>
            <div className="calculator">
                <Header />
                <div className="row-first">
                    <Input
                        label="Homens"
                        id="men"
                        onValueChange={handleMenChange}
                    />
                    <Input
                        label="Mulheres"
                        id="women"
                        onValueChange={handleWomenChange}
                    />
                    <Input
                        label="Crianças"
                        id="kid"
                        onValueChange={handleKidChange}
                    />
                </div>
                {showErrorMessage && (
                    <p style={{ color: "white" }}>
                        Por favor, selecione a quantidade de pessoas.
                    </p>
                )}
                <button
                    className="default-button"
                    onClick={handleCalculateClick}
                >
                    Calcular
                </button>
            </div>
            <ThemeSwitch />
        </>
    );
};

export default Calculator;
