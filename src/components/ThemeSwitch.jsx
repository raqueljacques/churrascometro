import React, { useState } from 'react';

const ThemeSwitch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className="theme-container">
      <label id="label-theme-text" htmlFor="input-theme">
        Tema {isDarkTheme ? 'Escuro' : 'Claro'}
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
