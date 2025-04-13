import React, { useState } from 'react';
import Header from '../Components/Header';
import './Loan.css';

const LoansPage = () => {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [loanDuration, setLoanDuration] = useState(2);
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loanSummary, setLoanSummary] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const calculateLoan = () => {
    // Validate UPI ID format
    if (!upiId.includes('@') || upiId.indexOf('@') === 0 || upiId.indexOf('@') === upiId.length - 1) {
      setUpiError(true);
      return;
    } else {
      setUpiError(false);
    }

    const amount = parseFloat(loanAmount);
    const months = parseInt(loanDuration);
    const annualInterestRate = 0.02; // 2% fixed interest rate
    const monthlyInterestRate = annualInterestRate / 12;

    // Calculate monthly payment using the loan amortization formula
    const monthlyPayment = amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months) 
                         / (Math.pow(1 + monthlyInterestRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    // Update loan summary
    setLoanSummary({
      monthlyPayment,
      totalPayment,
      totalInterest
    });

    // Generate amortization schedule
    let remainingBalance = amount;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    setAmortizationSchedule(schedule);
    setShowResults(true);
  };

  return (
    <div className="loan-calculator">
      <h1>Loan Calculator</h1>
      <Header />
      <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount (₹):</label>
        <select 
          id="loanAmount" 
          value={loanAmount} 
          onChange={(e) => setLoanAmount(e.target.value)}
        >
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
        <select 
          id="loanDuration" 
          value={loanDuration} 
          onChange={(e) => setLoanDuration(e.target.value)}
        >
          <option value="2">2 months</option>
          <option value="6">6 months</option>
          <option value="12">12 months</option>
          <option value="24">24 months</option>
          <option value="36">36 months</option>
          <option value="48">48 months</option>
          <option value="60">60 months</option>
        </select>
      </div>
      
      <div className="interest-display">
        Fixed Interest Rate: 2% per annum
      </div>
      
      <div className="form-group">
        <label htmlFor="upiId">UPI ID:</label>
        <input 
          type="text" 
          id="upiId" 
          name="UPIID" 
          placeholder="Enter your UPI ID (e.g., name@upi)" 
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required 
        />
        {upiError && (
          <span className="error-message visible">
            Invalid UPI ID! Please enter a valid UPI ID with "@" in the middle (e.g., name@upi).
          </span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="binanceId">OUR Binance ID:</label>
        <input 
          type="text" 
          id="binanceId" 
          value="810047394" 
          readOnly 
        />
      </div>
      
      <button className='btns' onClick={calculateLoan}>Calculate Loan</button>

      {showResults && (
        <div className="results">
          <div className="summary">
            <h2>Loan Summary</h2>
            <p><strong>Monthly Payment (₹):</strong> ₹{loanSummary.monthlyPayment.toFixed(2)}</p>
            <p><strong>Total Payment (₹):</strong> ₹{loanSummary.totalPayment.toFixed(2)}</p>
            <p><strong>Total Interest (₹):</strong> ₹{loanSummary.totalInterest.toFixed(2)}</p>
          </div>
          <h3>Amortization Schedule</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment (₹)</th>
                <th>Principal (₹)</th>
                <th>Interest (₹)</th>
                <th>Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>₹{row.payment.toFixed(2)}</td>
                  <td>₹{row.principal.toFixed(2)}</td>
                  <td>₹{row.interest.toFixed(2)}</td>
                  <td>₹{row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoansPage;