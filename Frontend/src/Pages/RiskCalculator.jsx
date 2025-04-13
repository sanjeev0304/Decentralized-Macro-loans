import { useState } from 'react';
import "./Risk.css"
import Header from '../Components/Header';
const LoanRiskCalculator = () => {
  const [formData, setFormData] = useState({
    loan_amount: '1000',
    loan_duration: '2',
    age: '',
    employment_status: 'Employed',
    annual_income: '',
    credit_score: ''
  });
  
  const [riskResult, setRiskResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.age || !formData.annual_income || !formData.credit_score) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/calculate-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate risk');
      }

      const data = await response.json();
      setRiskResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating risk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
    <Header />
      <div className="container">
        <h1>Risk Calculator</h1>

        {error && (
          <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>
        )}

        {riskResult ? (
          <div id="results">
            <div className="summary" style={{
              border: '1px solid',
              borderColor: riskResult.risk === 'Low Risk' ? 'green' : 'red',
              backgroundColor: riskResult.risk === 'Low Risk' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
              padding: '1rem',
              borderRadius: '5px',
              marginBottom: '1rem'
            }}>
              <h2>Risk Assessment Result</h2>
              <p>{riskResult.risk}</p>
              {riskResult.message && <p>{riskResult.message}</p>}
            </div>
            <button className='btns' onClick={() => setRiskResult(null)}>Calculate Again</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount (₹):</label>
              <select id="loanAmount" name="loan_amount" value={formData.loan_amount} onChange={handleChange}>
                <option value="1000">1,000</option>
                <option value="5000">5,000</option>
                <option value="10000">10,000</option>
                <option value="25000">25,000</option>
                <option value="50000">50,000</option>
                <option value="100000">100,000</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="loanDuration">Loan Duration (months):</label>
              <select id="loanDuration" name="loan_duration" value={formData.loan_duration} onChange={handleChange}>
                <option value="2">2 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
              </select>
            </div>

            <div className="interest-display">Fixed Interest Rate: 2% per annum</div>

            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" placeholder="Enter your Age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="employmentStatus">Employment Status:</label>
              <select id="employmentStatus" name="employment_status" value={formData.employment_status} onChange={handleChange}>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Self-Employed">Self-Employed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="annualIncome">Annual Income:</label>
              <input type="number" id="annualIncome" name="annual_income" placeholder="Enter your Annual Income" value={formData.annual_income} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="creditScore">Credit Score:</label>
              <input type="number" id="creditScore" name="credit_score" placeholder="Enter your Credit Score" value={formData.credit_score} onChange={handleChange} required />
            </div>

            <button type="submit" className="btns" disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate Risk'}
                </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default LoanRiskCalculator;