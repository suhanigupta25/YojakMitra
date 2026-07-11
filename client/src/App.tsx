
import './App.css'
import SchemeCards from './components/RecentScheme/RecentScheme';
import SearchEligibilty from './components/Search/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistant/AiAssistant';
import Footer from './components/Footer/Footer';
import SearchCategory from './components/Search/SearchCategory';

function App() {
   return (
    <div>
      <Navbar/>
      <Hero/>
      <SchemeCards/>
      <SearchEligibilty/>
      <SearchCategory/>
      <AiAssistant/>
      <Footer/>
    </div>
  );
}

export default App
