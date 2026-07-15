import './App.css'
import SchemeCards from './components/RecentScheme/RecentScheme';
import SearchEligibilty from './components/Search/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistant/AiAssistant';
import Footer from './components/Footer/Footer';
import SearchCategory from './components/Search/SearchCategory';
import SchemeDetails from './components/SchemeDetails/SchemeDetails';
import { Route, BrowserRouter, Routes } from 'react-router-dom'; 

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <SchemeCards />
      <SearchEligibilty />
      <SearchCategory />          
      <AiAssistant/>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div>                
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/schemes/:id" element={<SchemeDetails />} />
        </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;