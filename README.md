# Logistics Calculator

A modern web application for calculating delivery costs and submitting delivery orders.

## Features

- Address selection using Yandex Maps
- Date and time selection
- Vehicle selection with images and specifications
- Contact form with validation
- Order submission to Google Sheets and/or Telegram
- Responsive design
- Modern UI with Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Yandex Maps API key
- Google Sheets API credentials (if using Google Sheets integration)
- Telegram Bot Token (if using Telegram integration)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd logistics-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
REACT_APP_YANDEX_MAPS_API_KEY=your_yandex_maps_api_key
REACT_APP_GOOGLE_SHEETS_API_URL=your_google_apps_script_url
REACT_APP_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
REACT_APP_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

4. Start the development server:
```bash
npm start
```

## Configuration

### Yandex Maps Integration

1. Get a Yandex Maps API key from the [Yandex Developer Console](https://developer.tech.yandex.ru/)
2. Add the API key to your `.env` file
3. Update the map configuration in `src/config/yandex-maps.ts`

### Google Sheets Integration

1. Create a Google Sheet to store orders
2. Set up a Google Apps Script to handle form submissions
3. Deploy the script as a web app
4. Add the web app URL to your `.env` file

### Telegram Integration

1. Create a Telegram bot using [@BotFather](https://t.me/botfather)
2. Get the bot token and chat ID
3. Add them to your `.env` file

## Deployment

The application can be deployed to Netlify:

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Set up environment variables in Netlify
4. Deploy!

## Development

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
