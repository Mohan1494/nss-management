// src/components/AttendancePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchSheetData, updateSheetData, initClient, signIn, signOut } from '../googleSheetAPI';

const AttendancePage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [date, setDate] = useState('');
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSheetData();
      setVolunteers(data.volunteers);
      setStatuses(data.volunteers.reduce((acc, volunteer) => ({ ...acc, [volunteer.id]: '' }), {}));
    };
    fetchData();
  }, []);

  const handleStatusChange = (volunteerId, status) => {
    setStatuses(prevStatuses => ({ ...prevStatuses, [volunteerId]: status }));
  };

  const recordAttendance = async () => {
    const records = Object.entries(statuses).map(([volunteerId, status]) => ({ date, volunteerId, status }));
    await updateSheetData(records);
    setStatuses(prevStatuses => Object.keys(prevStatuses).reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
    setDate('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Attendance Page</Typography>
      <Button variant="outlined" color="primary" onClick={signIn} sx={{ mr: 2 }}>Sign In</Button>
      <Button variant="outlined" color="secondary" onClick={signOut}>Sign Out</Button>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <List sx={{ mt: 3 }}>
        {volunteers.map(volunteer => (
          <ListItem key={volunteer.id}>
            <Typography variant="body1" sx={{ mr: 2 }}>{volunteer.name}:</Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statuses[volunteer.id] || ''}
                onChange={(e) => handleStatusChange(volunteer.id, e.target.value)}
              >
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={recordAttendance} sx={{ mt: 2 }}>
        Record Attendance
      </Button>
    </Container>
  );
};

export default AttendancePage;
