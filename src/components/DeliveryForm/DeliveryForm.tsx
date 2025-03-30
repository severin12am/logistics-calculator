import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { submitOrderToSheets } from '../../services/sheets';
import { submitOrderToTelegram } from '../../services/telegram';
import { Map } from '../Map/Map';

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
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 800,
          mx: 'auto',
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Route Section */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Укажите маршрут
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: 200 }}
                  label="Откуда"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  placeholder="Введите адрес отправления"
                />
                <TextField
                  sx={{ flex: 1, minWidth: 200 }}
                  label="Куда"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="Введите адрес назначения"
                />
              </Box>
              <Box sx={{ mt: 2, height: 400, borderRadius: 1, overflow: 'hidden' }}>
                <Map />
              </Box>
            </Box>

            {/* Date and Time Section */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Выберите дату и время
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                    <DatePicker
                      label="Дата"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Box>
                <FormControl sx={{ flex: 1, minWidth: 200 }}>
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
              </Box>
            </Box>

            {/* Vehicle Selection Section */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Выберите транспорт
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {vehicles.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    sx={{
                      flex: 1,
                      minWidth: 250,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      border: selectedVehicle === vehicle.id ? '2px solid' : '2px solid transparent',
                      borderColor: selectedVehicle === vehicle.id ? 'primary.main' : 'transparent',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={vehicle.imageUrl}
                      alt={vehicle.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {vehicle.name}
                      </Typography>
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
                ))}
              </Box>
            </Box>

            {/* Contact Information Section */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Контактная информация
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  error={!!errors.contact}
                  helperText={errors.contact}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  error={!!errors.contact}
                />
                <TextField
                  label="Комментарий"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={!!submitStatus}
        autoHideDuration={6000}
        onClose={() => setSubmitStatus(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSubmitStatus(null)}
          severity={submitStatus?.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {submitStatus?.message || ''}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeliveryForm; 