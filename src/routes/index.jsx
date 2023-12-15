import { BrowserRouter, Routes, Route } from "react-router-dom";
import Result from "../pages/Result";
import Register from "../pages/Register";
import Calculator from "../pages/Calculator";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/register" element={<Register />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
