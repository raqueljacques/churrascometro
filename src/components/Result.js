import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import Title from "./Title";
import Button from "./Button";

const Result = () => {
    const translatedProducts = {
        totalCarne: "Carne",
        totalPaoDeAlho: "Pão de alho",
        totalCarvao: "Carvão",
        totalSal: "Sal",
        totalGelo: "Gelo",
        totalRefrigerante: "Refrigerante",
        totalAgua: "Água",
    };

    const translatedPeople = {
        menCount: "Homens",
        womenCount: "Mulheres",
        kidCount: "Crianças",
    };

    const { state } = useLocation();
    const navigate = useNavigate();

    // Verifica se existe o estado com os dados
    if (!state || !state.products) {
        return null;
    }

    const { people, products } = state;

    const renderProductList = () => {
        return Object.keys(products).map((productName, index) => (
            <li key={index}>
                <strong>{translatedProducts[productName]}</strong>
                <span>{products[productName]}</span>
            </li>
        ));
    };

    const renderPeopleList = () => {
        return Object.keys(people).map((personName, index) => (
            <span key={index} className="guest-list">
                {people[personName]} {translatedPeople[personName]}
            </span>
        ));
    };

    const returnHome = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <Title />
            <div className="calculator">
                <div className="result-total-guest">
                    <p>Confira a lista para o seu churrasco!</p>
                    <p id="total-guest">
                        {people.menCount + people.womenCount + people.kidCount}{" "}
                        convidado
                    </p>
                    {renderPeopleList()}
                </div>
                <div className="input-group-result">
                    <div id="header-result">
                        <p>ITEM</p>
                        <p>QUANTIDADE</p>
                    </div>
                    <ul className="results">{renderProductList()}</ul>
                </div>
                <div className="row">
                    <Button onClick={returnHome} label="Novo cálculo" />
                </div>
            </div>
            <ThemeSwitch />
        </div>
    );
};

export default Result;
