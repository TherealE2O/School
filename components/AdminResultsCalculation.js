import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { calculateResults } from '../firebaseFunctions'; // Ensure this path is correct

const AdminResultsCalculation = () => {
  const handleCalculateResults = async () => {
    try {
      await calculateResults();
      alert('Results calculation completed successfully.');
    } catch (error) {
      console.error('Error calculating results:', error);
      alert('Error calculating results. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Admin - Results Calculation</Typography>
      <Button variant="contained" color="primary" onClick={handleCalculateResults}>
        Calculate Results
      </Button>
    </Container>
  );
};

export default AdminResultsCalculation;

