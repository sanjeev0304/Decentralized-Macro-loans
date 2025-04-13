import React from 'react';
import Header from '../Components/Header';
const AboutPage = () => {
  return (
    <div className="page-container">
      <Header />
      <section id="about" className="section">
        <h1>About DeFi Builders</h1>
        <p>
          DeFi Builders is a pioneering platform in the decentralized finance space, offering secure and transparent crypto-backed loans. Founded in 2024, we're committed to making DeFi lending accessible to everyone while maintaining the highest standards of security and compliance.
        </p>
        
        <div className="features">
          <div className="feature-card">
            <h3>Secure Platform</h3>
            <p>
              Multi-signature wallets, cold storage, and regular security audits ensure your assets are protected.
            </p>
          </div>
          <div className="feature-card">
            <h3>Competitive Rates</h3>
            <p>
              Our smart contract-powered system ensures you get the best lending rates in the market.
            </p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>
              Our dedicated team is always available to assist you with any questions or concerns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;