// src/components/AttendancePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';
import { fetchSheetData, updateSheetData, initClient, signIn, signOut } from '../googleSheetAPI';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [volunteerName, setVolunteerName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSheetData();
      setAttendance(data);
    };
    fetchData();
  }, []);

  const recordAttendance = async () => {
    const newRecord = { date, volunteerName, status };
    await updateSheetData(newRecord);
    setAttendance([...attendance, newRecord]);
    setVolunteerName('');
    setStatus('');
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
      <TextField
        label="Volunteer Name"
        value={volunteerName}
        onChange={(e) => setVolunteerName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={recordAttendance} sx={{ mt: 2 }}>
        Record Attendance
      </Button>
      <List sx={{ mt: 3 }}>
        {attendance.map((record, index) => (
          <ListItem key={index}>{`${record.date} - ${record.volunteerName}: ${record.status}`}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AttendancePage;
