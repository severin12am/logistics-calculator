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

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

export const submitOrderToTelegram = async (orderData: OrderData): Promise<boolean> => {
  try {
    const message = formatOrderMessage(orderData);
    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error submitting order to Telegram:', error);
    return false;
  }
};

const formatOrderMessage = (orderData: OrderData): string => {
  return `
<b>Новый заказ на доставку</b>

<b>Маршрут:</b>
От: ${orderData.fromAddress}
До: ${orderData.toAddress}

<b>Дата и время:</b>
${orderData.selectedDate?.toLocaleDateString('ru-RU')} ${orderData.selectedTime}

<b>Транспорт:</b>
${orderData.selectedVehicle}

<b>Контактные данные:</b>
Имя: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}

<b>Комментарий:</b>
${orderData.comment || 'Нет комментария'}
  `.trim();
}; 