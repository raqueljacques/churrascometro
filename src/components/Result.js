import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Verifica se existe o estado com os dados
    if (!state || !state.products) {
        return null;
    }

    const { totalPeople, products } = state;

    return (
        <div>
            <h3>A soma da quantidade de pessoas é: {totalPeople}</h3>
            <h3>Quantidade de Produtos:</h3>
            <h3>Carne: {products.totalCarne} kg</h3>
            <h3>Pão de Alho: {products.totalPaoDeAlho} unidades</h3>
            <h3>Carvão: {products.totalCarvao} kg</h3>
            <h3>Sal: {products.totalSal} kg</h3>
            <h3>Gelo: {products.totalGelo} kg</h3>
            <h3>Refrigerante: {products.totalRefrigerante} garrafas de 2L</h3>
            <h3>Água: {products.totalAgua} garrafas de 1L</h3>

            <button className="default-button" onClick={() => navigate(-1)}>
                Voltar
            </button>
        </div>
    );
};

export default Result;
