import "./NavBar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <h2>YojnaMitra</h2>
                    <span className="logo-dot">.</span>
                </div>

                <ul className="nav-links">
                    <li className="nav-item active">Home</li>
                    <li className="nav-item">Explore Schemes</li>
                    <li className="nav-item">AI Assistant</li>
                    <li className="nav-item">About</li>
                </ul>

                <div className="nav-actions">
                    <button className="btn-login">Login / Register</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;