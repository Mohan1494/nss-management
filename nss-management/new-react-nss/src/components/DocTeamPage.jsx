// src/components/DocTeamPage.jsx
import React, { useState } from 'react';

const DocTeamPage = () => {
  const [documentContent, setDocumentContent] = useState('');

  const handleSave = async () => {
    // Replace with your upload logic
    console.log('Document content saved:', documentContent);
  };

  return (
    <div>
      <h1>Doc Team Page</h1>
      <textarea 
        value={documentContent} 
        onChange={(e) => setDocumentContent(e.target.value)} 
        rows="10" 
        cols="30"
      />
      <button onClick={handleSave}>Save & Upload</button>
    </div>
  );
};

export default DocTeamPage;
