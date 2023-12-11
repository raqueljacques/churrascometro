import "./App.css";
import React from "react";
import Title from "./components/Title";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "./components/Result";
import Calculator from "./components/Calculator";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Title />
                <Routes>
                    <Route path="/" element={<Calculator />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
