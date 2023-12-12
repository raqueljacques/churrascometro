'react-router-dom';
import Calculator from "../components/Calculator";
import ThemeSwitch from "../components/ThemeSwitch";
import Title from "../components/Title";

function Home() {
  return (
    <div className="container">
        <Title />
        <Calculator />
        <ThemeSwitch />
    </div>
  )
}

export default Home;