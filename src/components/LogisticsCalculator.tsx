import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import DeliveryForm from './DeliveryForm/DeliveryForm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const LogisticsCalculator: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <LocalShippingIcon
          sx={{
            fontSize: 48,
            color: 'primary.main',
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 500,
            color: 'text.primary',
            mb: 1,
          }}
        >
          Калькулятор логистики
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
            mb: 4,
          }}
        >
          Рассчитайте стоимость доставки вашего груза. Укажите маршрут, выберите транспорт и получите расчет стоимости.
        </Typography>
      </Box>
      <DeliveryForm />
    </Container>
  );
};

export default LogisticsCalculator; 