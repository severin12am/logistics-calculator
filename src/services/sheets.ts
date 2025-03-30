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

export const submitOrderToSheets = async (orderData: OrderData) => {
  try {
    const formattedDate = orderData.selectedDate 
      ? orderData.selectedDate.toLocaleDateString('ru-RU')
      : '';

    const response = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}/values/A1:append?valueInputOption=USER_ENTERED`,
      {
        values: [[
          formattedDate,
          orderData.name,
          `${orderData.fromAddress} → ${orderData.toAddress}`,
          orderData.phone,
          orderData.selectedVehicle,
          orderData.comment || ''
        ]]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}; 