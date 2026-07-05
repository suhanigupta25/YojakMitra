import React from 'react';
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

const  App =()=> {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>

    </div>
  );
}

export default App;
