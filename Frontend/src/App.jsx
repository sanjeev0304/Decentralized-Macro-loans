import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Components/Header.jsx';
// Pages
import Home from './Pages/Home';
import AboutPage from './pages/AboutPage.jsx';
import LoansPage from './Pages/LoansPage.jsx';
// import WorkingPage from './pages/Working';
import ProfilePage from './Pages/ProfilePage.jsx';
import LoginPage from './Pages/LoginPage.jsx'; 
import RegisterPage from './Pages/RegisterPage.jsx';
// import RiskCalculator from './pages/RiskCalculator';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/loans" element={<LoansPage />} />
            {/* <Route path="/working" element={<WorkingPage />} />
            <Route path="/risk-calculator" element={<RiskCalculator />} /> */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;




