import { useState } from 'react'
import './App.css'
import SchemeCards from './components/SchemeCards/SchemeCards';
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';

function App() {
   return (
    <div>
      <Navbar/>
      <Hero/>
      <SchemeCards/>
    </div>
  );
}

export default App
