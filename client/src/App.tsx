import './App.css'
import SchemeCards from './components/RecentScheme/RecentScheme';
import SearchEligibilty from './components/Search/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistantdemo/AIdemo';
import Footer from './components/Footer/Footer';
import SearchCategory from './components/Search/SearchCategory';
import SchemeDetails from './components/SchemeDetails/SchemeDetails';
import { Route, BrowserRouter, Routes } from 'react-router-dom'; 
import AboutUs from './pages/About';
import AiChatbot from './pages/AiChatbot';

const Home = () => {
  return (
    <div>
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
       <Navbar/>
                
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/aiasistant" element={<AiChatbot />} />
          <Route path="/about" element={<AboutUs />} />
          
        </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;