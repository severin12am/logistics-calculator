import axios from 'axios';

interface OrderData {
  fromAddress: string;
  toAddress: string;
  selectedDate: Date | null;
  selectedTime: string;
  selectedVehicle: string;
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export const submitOrderToTelegram = async (orderData: OrderData) => {
  try {
    const formattedDate = orderData.selectedDate 
      ? orderData.selectedDate.toLocaleDateString('ru-RU')
      : '';

    const message = `
Новый заказ:
Дата: ${formattedDate} ${orderData.selectedTime}
Маршрут: ${orderData.fromAddress} → ${orderData.toAddress}
Клиент: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}
Тип ТС: ${orderData.selectedVehicle}
Комментарий: ${orderData.comment || 'Нет комментария'}
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