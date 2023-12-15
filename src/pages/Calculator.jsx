import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Header from "../components/Header";
import Button from "../components/Button";
import ThemeSwitch from "../components/ThemeSwitch";
import Title from "../components/Title";

const Calculator = () => {
    const headerTitle = [
        "Precisa de uma ajudinha com o churrasco? :)",
        "Quantas pessoas vão participar?",
    ];

    const [menCount, setMenCount] = useState(0);
    const [womenCount, setWomenCount] = useState(0);
    const [kidCount, setKidCount] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    //TODO: Poderia fazer o calculo só no result.js
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
            const people = {
                menCount,
                womenCount,
                kidCount,
            };
            if (localStorage.getItem("registerData") === null) {
                navigate("/register", {
                    state: { people, products },
                });
            } else {
                navigate("/result", {
                    state: { people, products },
                });
            }
        }
    };

    return (
        <div className="container">
            <Title />
            <div className="calculator">
                <Header headerTitle={headerTitle} />
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
                <p
                    id="invalid-input"
                    style={{
                        visibility: showErrorMessage ? "visible" : "hidden",
                    }}
                >
                    Por favor, selecione a quantidade de pessoas.
                </p>
                <Button onClick={handleCalculateClick} label="Calcular" />
            </div>
            <ThemeSwitch />
        </div>
    );
};

export default Calculator;
