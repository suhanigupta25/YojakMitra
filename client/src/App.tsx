import './App.css'
import SchemeCards from './components/RecentScheme/RecentScheme';
import SearchEligibilty from './components/Search/SearchEligibilty'
import Navbar from './components/Navbar/NavBar';
import Hero from './components/Hero/Hero';
import AiAssistant from './components/AiAssistantdemo/AIdemo';
import Footer from './components/Footer/Footer';
import SearchCategory from './components/Search/SearchCategory';
import SchemeDetails from './components/SchemeDetails/SchemeDetails';
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'; 
import AboutUs from './pages/About';
import AiChatbot from './pages/AiChatbot';
import ExploreSchemes from './pages/ExploreScheme';
import { LoginPage } from './authentication/Login';
import { SignupPage } from './authentication/Signup';

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

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/explore" element={<ExploreSchemes />} />
          <Route path="/aiassistant" element={<AiChatbot />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;