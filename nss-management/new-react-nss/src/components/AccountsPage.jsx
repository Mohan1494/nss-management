// src/components/AccountsPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';

const AccountsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [eventName, setEventName] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (eventName && amount) {
      setExpenses([...expenses, { eventName, amount }]);
      setEventName('');
      setAmount('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Accounts Page</Typography>
      <TextField
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addExpense} sx={{ mt: 2 }}>
        Add Expense
      </Button>
      <List sx={{ mt: 3 }}>
        {expenses.map((expense, index) => (
          <ListItem key={index}>
            {`${expense.eventName}: $${expense.amount}`}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AccountsPage;
