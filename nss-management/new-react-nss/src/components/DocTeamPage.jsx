// src/components/DocTeamPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const DocTeamPage = () => {
  const [documentContent, setDocumentContent] = useState('');

  const handleSave = async () => {
    // Implement your document save logic here
    console.log('Document saved:', documentContent);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Doc Team Page</Typography>
      <TextField
        label="Document Content"
        value={documentContent}
        onChange={(e) => setDocumentContent(e.target.value)}
        multiline
        rows={10}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save & Upload
      </Button>
    </Container>
  );
};

export default DocTeamPage;
