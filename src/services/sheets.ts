import axios from 'axios';

interface OrderData {
  date: string;
  customerName: string;
  address: string;
  phone: string;
  vehicleType: string;
  price: number;
}

export const submitOrderToSheets = async (orderData: OrderData) => {
  try {
    const response = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}/values/A1:append?valueInputOption=USER_ENTERED`,
      {
        values: [[
          orderData.date,
          orderData.customerName,
          orderData.address,
          orderData.phone,
          orderData.vehicleType,
          orderData.price
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