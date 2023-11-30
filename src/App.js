import './App.css';
import React from 'react';
import Header from './components/Header';
import Title from './components/Title';
import Button from './components/Button';
import ContainerBox from './components/ContainerBox';
import ThemeSwitch from './components/ThemeSwitch';

function App() {
  return (
    <div className="container">
      <Title/>
      <div className='calculator'>
        <Header/>
        <ContainerBox/>
      </div>
      <Button/>
      <ThemeSwitch/>
    </div>
  );
}

export default App;
