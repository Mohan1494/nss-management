// src/components/AttendancePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchSheetData, updateSheetData, initClient, signIn, signOut } from '../googleSheetAPI'; // Ensure you import necessary API functions

const AttendancePage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [date, setDate] = useState('');
  const [statuses, setStatuses] = useState({});
  const [year, setYear] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Initialize Google API client on component mount
  useEffect(() => {
    const initializeClient = async () => {
      await initClient();
    };
    initializeClient();
  }, []);

  // Fetch data when the year is selected and user is signed in
  useEffect(() => {
    if (year && isSignedIn) {
      const fetchData = async () => {
        const data = await fetchSheetData(year);  // Fetch data for the selected year
        setVolunteers(data.volunteers);
        // Initialize statuses to empty string
        setStatuses(data.volunteers.reduce((acc, volunteer) => ({ ...acc, [volunteer.id]: '' }), {}));
      };
      fetchData();
    }
  }, [year, isSignedIn]);

  // Handle volunteer status change (Present or Absent)
  const handleStatusChange = (volunteerId, status) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [volunteerId]: status === 'present' ? 1 : 0,  // 1 for Present, 0 for Absent
    }));
  };

  // Record the attendance to the sheet
  const recordAttendance = async () => {
    if (!date) {
      alert('Please select a date');
      return;
    }

    const records = Object.entries(statuses).map(([volunteerId, status]) => ({
      date,
      volunteerId,
      volunteerName: volunteers.find((volunteer) => volunteer.id === volunteerId)?.name || '',
      status,
    }));

    await updateSheetData(year, records);  // Update the Google Sheet with attendance data
    // Reset statuses and date after recording
    setStatuses((prevStatuses) => Object.keys(prevStatuses).reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
    setDate('');
  };

  // Handle Google Sign In
  const handleSignIn = async () => {
    await signIn();
    setIsSignedIn(true); // Set signed-in state
  };

  // Handle Google Sign Out
  const handleSignOut = async () => {
    await signOut();
    setIsSignedIn(false); // Reset signed-in state
    setVolunteers([]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Attendance Page</Typography>
      {!isSignedIn ? (
        <Button variant="outlined" color="primary" onClick={handleSignIn} sx={{ mr: 2 }}>
          Sign In
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      )}

      {isSignedIn && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <MenuItem value={1}>Year 1</MenuItem>
              <MenuItem value={2}>Year 2</MenuItem>
              <MenuItem value={3}>Year 3</MenuItem>
              <MenuItem value={4}>Year 4</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {year && volunteers.length > 0 && (
            <List sx={{ mt: 3 }}>
              {volunteers.map((volunteer) => (
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
          )}

          <Button variant="contained" color="primary" onClick={recordAttendance} sx={{ mt: 2 }}>
            Record Attendance
          </Button>
        </>
      )}
    </Container>
  );
};

export default AttendancePage;
