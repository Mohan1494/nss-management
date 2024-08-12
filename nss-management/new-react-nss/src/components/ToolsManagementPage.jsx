// src/components/ToolsManagementPage.jsx
import React, { useState } from 'react';

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
    <div>
      <h1>Tools Management System</h1>
      <input 
        type="text" 
        placeholder="Tool Name" 
        value={toolName} 
        onChange={(e) => setToolName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Inflow">Inflow</option>
        <option value="Outflow">Outflow</option>
      </select>
      <button onClick={manageTool}>Record Tool</button>
      <ul>
        {tools.map((tool, index) => (
          <li key={index}>{`${tool.toolName}: ${tool.quantity} (${tool.type})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsManagementPage;
