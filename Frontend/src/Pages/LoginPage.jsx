// LoginPage.jsx
import React, { use } from 'react';
import { useState } from 'react';
import './login.css'; // Import the separate CSS file
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  
  const  handleSubmit = async (e) => {
  e.preventDefault();
  
  try{
    
    const response = await fetch('http://localhost:5009/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ email, password })
    });
    console.log("Response headers:", response.headers);
    
    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }
    
    const data = await response.json();
    console.log("Login response data:", data); // Log the response data
    navigate("/");

  }
  catch(error){
    console.error("Login error: ", error.message);
    throw new Error("Login failed");
  }
  
  }
 
  

  return (
    <div className="login-page-wrapper">
      <div className="login-main">
        <div className="login-container">
          <h2 className="login-heading">Login to Your Account</h2>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              className="login-input" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 

            />
            <input 
              type="password" 
              className="login-input" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="login-agreement">
            Do not have an Account? <a href="/signup">Register Now</a> 
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;