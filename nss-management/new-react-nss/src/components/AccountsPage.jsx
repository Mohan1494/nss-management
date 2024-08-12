// src/components/AccountsPage.jsx
import React, { useState } from 'react';

const AccountsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [eventName, setEventName] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    setExpenses([...expenses, { eventName, amount }]);
    setEventName('');
    setAmount('');
  };

  return (
    <div>
      <h1>Accounts Page</h1>
      <input 
        type="text" 
        placeholder="Event Name" 
        value={eventName} 
        onChange={(e) => setEventName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={addExpense}>Add Expense</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{`${expense.eventName}: $${expense.amount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsPage;
