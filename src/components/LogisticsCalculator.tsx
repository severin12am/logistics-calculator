import React from 'react';
import { Container } from '@mui/material';
import DeliveryForm from './DeliveryForm/DeliveryForm';

const LogisticsCalculator: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DeliveryForm />
    </Container>
  );
};

export default LogisticsCalculator; 