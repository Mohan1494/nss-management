// src/components/ToolsManagementPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography, Select, MenuItem } from '@mui/material';

const ToolsManagementPage = () => {
  const [tools, setTools] = useState([]);
  const [toolName, setToolName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('Inflow');

  const manageTool = () => {
    setTools([...tools, { toolName, quantity, type }]);
    setToolName('');
    setQuantity('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Tools Management Page</Typography>
      <TextField
        label="Tool Name"
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Inflow">Inflow</MenuItem>
        <MenuItem value="Outflow">Outflow</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={manageTool} sx={{ mt: 2 }}>
        Manage Tool
      </Button>
      <List sx={{ mt: 3 }}>
        {tools.map((tool, index) => (
          <ListItem key={index}>{`${tool.toolName} - ${tool.quantity} (${tool.type})`}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ToolsManagementPage;
