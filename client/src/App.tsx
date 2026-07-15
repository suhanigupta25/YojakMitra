
import './App.css'
import SchemeCards from './components/RecentScheme/RecentScheme';
import SearchEligibilty from './components/Search/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistant/AiAssistant';
import Footer from './components/Footer/Footer';
import SearchCategory from './components/Search/SearchCategory';
import { Route, Routes } from 'react-router-dom';
import SchemeDetails from './components/SchemeDetails/SchemeDetails';

function App() {
   return (
    <div>
      <Navbar/>
      <Hero/>
      <SchemeCards/>
      <SearchEligibilty/>
      <SearchCategory/>
      <Routes>
        <Route path="/" element={<SearchCategory />} />
        <Route path="/schemes/:id" element={<SchemeDetails />} />
      </Routes>
      <AiAssistant/>
      <Footer/>
    </div>
  );
}

export default App
