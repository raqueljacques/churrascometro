import { BrowserRouter, Routes, Route } from 
'react-router-dom';
import Home from '../pages/Home';
import Result from '../components/Result';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;