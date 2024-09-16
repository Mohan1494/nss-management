import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { getAccessTokenFromUrl, uploadFile, getAuthUrl, signOutUser } from '../googleDriveAPI'; // Assuming you have this utility file

// Replace with your target folder ID for NSS -> Doc -> folder
const TARGET_FOLDER_ID = '1vKmq6EIsL5CiqSmsJGgGPQh4zDvVZekY'; // Replace this with the actual folder ID

const DocTeamPage = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [fileName, setFileName] = useState(''); // State for the file name
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleSave = async () => {
    if (!isSignedIn) {
      alert('Please sign in to upload files.');
      return;
    }

    if (!fileName) {
      alert('Please provide a file name.');
      return;
    }

    // Create a Blob from document content
    const file = new Blob([documentContent], { type: 'text/plain' });
    file.name = fileName + '.txt'; // Use the specified file name

    // Upload the file to the specific folder
    const response = await uploadFile(accessToken, file, TARGET_FOLDER_ID);
    if (response) {
      alert(`File "${fileName}.txt" uploaded successfully to the NSS -> Doc -> folder!`); // Alert the user
    } else {
      console.error('File upload failed');
      alert('Failed to upload the file.');
    }
  };

  const handleSignIn = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };

  const handleSignOut = () => {
    signOutUser(); // Call the sign-out function
    setIsSignedIn(false);
    setAccessToken('');
    alert('Signed out successfully.');
  };

  const checkIfSignedIn = () => {
    const token = getAccessTokenFromUrl();
    if (token) {
      setIsSignedIn(true);
      setAccessToken(token);
    }
  };

  React.useEffect(() => {
    // Check if the user is signed in after page load
    checkIfSignedIn();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Doc Team Page</Typography>

      {/* Sign In/Out button */}
      {isSignedIn ? (
        <Button variant="outlined" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleSignIn}>
          Sign In
        </Button>
      )}

      {/* File Name Input */}
      <TextField
        label="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Document Content Input */}
      <TextField
        label="Document Content"
        value={documentContent}
        onChange={(e) => setDocumentContent(e.target.value)}
        multiline
        rows={10}
        fullWidth
        margin="normal"
      />

      {/* Save Button */}
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save & Upload
      </Button>
    </Container>
  );
};

export default DocTeamPage;
