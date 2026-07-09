import { useState } from 'react'
import './App.css'
import SchemeCards from './components/SchemeCards/SchemeCards';
import SearchEligibilty from './components/SearchEligibilty/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistant/AiAssistant';
import Footer from './components/Footer/Footer';

function App() {
   return (
    <div>
      <Navbar/>
      <Hero/>
      <SchemeCards/>
      <SearchEligibilty/>
      <AiAssistant/>
      <Footer/>
    </div>
  );
}

export default App
