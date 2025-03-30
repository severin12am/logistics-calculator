import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Семь машин
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Доставка грузов по Санкт-Петербургу и области
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              +7 (903) 098-37-31
            </Typography>
            <Typography variant="body2">
              info@darmovoz-spb.ru
            </Typography>
            <Button
              startIcon={<TelegramIcon />}
              variant="outlined"
              size="small"
              href="https://t.me/your_telegram_username"
              target="_blank"
            >
              Telegram
            </Button>
            <Button
              startIcon={<WhatsAppIcon />}
              variant="outlined"
              size="small"
              href="https://wa.me/79030983731"
              target="_blank"
            >
              WhatsApp
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 