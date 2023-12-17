import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";
import Title from "../components/Title";
import Button from "../components/Button";

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

    const renderUserData = () => {
        const user = localStorage.getItem("registerData");
        return user ? JSON.parse(user).name : "Olá";
    };

    const returnCalculator = () => {
        navigate("/");
    };

    const resetData = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="container">
            <Title />
            <div className="calculator">
                <div className="result-total-guest">
                    <p>
                        {renderUserData()}, confira a lista para o seu
                        churrasco!
                    </p>
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
                <div
                    className="row"
                    style={{
                        width: "350px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button onClick={returnCalculator} label="Novo cálculo" />
                    <Button onClick={resetData} label="Limpar dados" />
                </div>
            </div>
            <ThemeSwitch />
        </div>
    );
};

export default Result;
