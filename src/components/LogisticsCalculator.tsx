import React from 'react';
import { Grid, Typography } from '@mui/material';

const LogisticsCalculator: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {/* Route Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Укажите маршрут
        </Typography>
      </Grid>

      {/* Results Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Результаты расчета
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LogisticsCalculator; 