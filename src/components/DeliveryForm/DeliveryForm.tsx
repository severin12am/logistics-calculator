import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { submitOrderToSheets } from '../../services/sheets';
import { submitOrderToTelegram } from '../../services/telegram';

interface Vehicle {
  id: string;
  name: string;
  length: string;
  height: string;
  volume: string;
  imageUrl: string;
}

const vehicles: Vehicle[] = [
  {
    id: 'gazelle-3m',
    name: 'Газель Тент 3м',
    length: '3м',
    height: '1.6м',
    volume: '9м³',
    imageUrl: 'https://example.com/gazelle-3m.jpg',
  },
  // Add more vehicles here
];

const DeliveryForm: React.FC = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!phone && !email) {
      newErrors.contact = 'Укажите телефон или email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const orderData = {
          fromAddress,
          toAddress,
          selectedDate,
          selectedTime,
          selectedVehicle,
          name,
          phone,
          email,
          comment,
        };

        // Try to submit to both services
        const [sheetsSuccess, telegramSuccess] = await Promise.all([
          submitOrderToSheets(orderData),
          submitOrderToTelegram(orderData),
        ]);

        if (sheetsSuccess || telegramSuccess) {
          setSubmitStatus({
            success: true,
            message: 'Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.',
          });
          // Clear form
          setFromAddress('');
          setToAddress('');
          setSelectedDate(null);
          setSelectedTime('');
          setSelectedVehicle('');
          setName('');
          setPhone('');
          setEmail('');
          setComment('');
          setErrors({});
        } else {
          throw new Error('Failed to submit order');
        }
      } catch (error) {
        setSubmitStatus({
          success: false,
          message: 'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Рассчитать стоимость доставки
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Route Section */}
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>
                Укажите маршрут
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Откуда"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    placeholder="Введите адрес отправления"
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Куда"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    placeholder="Введите адрес назначения"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Date and Time Section */}
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>
                Выберите дату и время
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                    <DatePicker
                      label="Дата"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Время</InputLabel>
                    <Select
                      value={selectedTime}
                      label="Время"
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <MenuItem key={i} value={`${i}:00`}>
                          {`${i}:00`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Vehicle Selection Section */}
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>
                Выберите тип транспорта
              </Typography>
              <Grid container spacing={2}>
                {vehicles.map((vehicle) => (
                  <Grid xs={12} sm={6} md={4} key={vehicle.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedVehicle === vehicle.id ? '2px solid #1976d2' : 'none',
                      }}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={vehicle.imageUrl}
                        alt={vehicle.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{vehicle.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Длина: {vehicle.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Высота: {vehicle.height}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Объем: {vehicle.volume}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Contact Information Section */}
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>
                Контактная информация
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    error={!!errors.contact}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    label="Комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Рассчитать стоимость'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Status Snackbar */}
      <Snackbar
        open={!!submitStatus}
        autoHideDuration={6000}
        onClose={() => setSubmitStatus(null)}
      >
        <Alert
          onClose={() => setSubmitStatus(null)}
          severity={submitStatus?.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {submitStatus?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeliveryForm; 