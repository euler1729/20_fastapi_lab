import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';

function TextBox() {
  const [textBoxes, setTextBoxes] = useState([{ value: '', error: '' }]);
  const [sum, setSum] = useState(0);

  const addTextBox = () => {
    setTextBoxes([...textBoxes, { value: '', error: '' }]);
  };

  const handleTextBoxChange = (index, value) => {
    if (!isNaN(value) && value !== '') {
      const newTextBoxes = [...textBoxes];
      newTextBoxes[index] = { ...newTextBoxes[index], value: value, error: '' };
      setTextBoxes(newTextBoxes);
      calculateSum(newTextBoxes);
    } else {
      const newTextBoxes = [...textBoxes];
      newTextBoxes[index] = { ...newTextBoxes[index], value: value, error: 'Please enter a valid number' };
      setTextBoxes(newTextBoxes);
    }
  };

  const handleDelete = (index) => {
    const newTextBoxes = textBoxes.filter((_, i) => i !== index);
    setTextBoxes(newTextBoxes);
    calculateSum(newTextBoxes);
  };

  const calculateSum = (newTextBoxes) => {
    const total = newTextBoxes.reduce((acc, curr) => {
      const num = parseFloat(curr.value);
      return isNaN(num) ? acc : acc + num;
    }, 0);
    setSum(total);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        {textBoxes.map((textBox, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label={`Textbox ${index + 1}`}
              variant="outlined"
              value={textBox.value}
              error={!!textBox.error}
              helperText={textBox.error}
              onChange={(e) => handleTextBoxChange(index, e.target.value)}
            />
            <Button onClick={() => handleDelete(index)}>Delete</Button>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={addTextBox} style={{margin:'20px'}}>
        Add Textbox
      </Button>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Sum: {sum}
      </Typography>
    </div>
  );
}

export default TextBox;
