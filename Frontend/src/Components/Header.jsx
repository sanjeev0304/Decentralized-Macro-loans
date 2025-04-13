import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [Authenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5009/checkAuth", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    console.log("Authenticated changed:", Authenticated);
  }, [Authenticated]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5009/logout", {
        method: "POST",
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setIsAuthenticated(false); // Reset auth state
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <header>
      <nav>
        <div className="logo">Microloan Platform</div>
        <ul className="nav-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/loans">Loans</Link></li>
          <li><Link to="/working">How It Works</Link></li>
          <li><Link to="http://127.0.0.1:5000">Risk Calculator</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {!Authenticated ? (
            <li>
              <button className="btn" onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
          ) : (
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
