import axios from 'axios';

interface OrderData {
  date: string;
  customerName: string;
  address: string;
  phone: string;
  vehicleType: string;
  price: number;
}

export const submitOrderToTelegram = async (orderData: OrderData) => {
  try {
    const message = `
Новый заказ:
Дата: ${orderData.date}
Клиент: ${orderData.customerName}
Адрес: ${orderData.address}
Телефон: ${orderData.phone}
Тип ТС: ${orderData.vehicleType}
Цена: ${orderData.price}
    `;

    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    throw error;
  }
}; 