import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    
    const navigate=useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <h2>YojnaMitra</h2>
                    <span className="logo-dot">.</span>
                </div>

                <ul className="nav-links">
                    <NavLink to="/" className="nav-item">Home</NavLink>
                     <NavLink to="/explore" className="nav-item">Explore Schemes</NavLink>
       
                    <NavLink to="/aiassistant" className="nav-item">AI Assistant</NavLink>
                    <NavLink to="/about" className="nav-item">About</NavLink>
                </ul>

                <div className="nav-actions">
                    <button className="btn-login">Login / Register</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;