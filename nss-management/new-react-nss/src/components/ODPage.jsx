// src/components/ODPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';

const ODPage = () => {
  const [odRequests, setOdRequests] = useState([]);
  const [volunteerName, setVolunteerName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const submitOdRequest = () => {
    const newRequest = { volunteerName, reason, date };
    setOdRequests([...odRequests, newRequest]);
    setVolunteerName('');
    setReason('');
    setDate('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>OD Page</Typography>
      <TextField
        label="Volunteer Name"
        value={volunteerName}
        onChange={(e) => setVolunteerName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={submitOdRequest} sx={{ mt: 2 }}>
        Submit OD Request
      </Button>
      <List sx={{ mt: 3 }}>
        {odRequests.map((request, index) => (
          <ListItem key={index}>{`${request.date} - ${request.volunteerName}: ${request.reason}`}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ODPage;
