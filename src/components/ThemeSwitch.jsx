import React, { useState, useEffect } from "react";

const ThemeSwitch = () => {
    const storedTheme = localStorage.getItem("isDarkTheme");
    const [isDarkTheme, setIsDarkTheme] = useState(storedTheme === "true");

    const handleThemeToggle = () => {
        const newTheme = !isDarkTheme;
        localStorage.setItem("isDarkTheme", newTheme);
        setIsDarkTheme(newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkTheme");
        setIsDarkTheme(storedTheme === "true");
    }, []);

    return (
        <div className="theme-container">
            <label id="label-theme-text" htmlFor="input-theme">
                Tema {isDarkTheme ? "Escuro" : "Claro"}
            </label>
            <label className="switch">
                <input
                    type="checkbox"
                    id="input-theme"
                    checked={isDarkTheme}
                    onChange={handleThemeToggle}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ThemeSwitch;
