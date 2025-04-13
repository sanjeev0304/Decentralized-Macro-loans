
import React from 'react';
import { useState } from 'react';
import './login.css'; // Import the separate CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const navigate = useNavigate();
  
  const  handleSubmit = async (e) => {
  e.preventDefault();
  
  try{
    const response = await axios.post("http://localhost:5009/signup", {fullName,email,password}, {withCredentials: true});
    
    if(!response){
      throw new Error("Login failed");
    }
    if(response.status === 201){
        navigate("/");
      }
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
          <h2 className="login-heading">Create a new Account</h2>
          
          <form className="login-form" onSubmit={handleSubmit}>

          <input 
              className="login-input" 
              placeholder="FullName" 
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              required 

            />

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
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
            <button type="submit" className="login-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


