// src/components/EventsPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const addEvent = () => {
    if (eventName && eventDate) {
      setEvents([...events, { eventName, eventDate }]);
      setEventName('');
      setEventDate('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Events Page</Typography>
      <TextField
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Date"
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={addEvent} sx={{ mt: 2 }}>
        Add Event
      </Button>
      <List sx={{ mt: 3 }}>
        {events.map((event, index) => (
          <ListItem key={index}>{`${event.eventName}: ${event.eventDate}`}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EventsPage;
  