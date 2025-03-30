export const YANDEX_MAPS_CONFIG = {
  apiKey: process.env.REACT_APP_YANDEX_MAPS_API_KEY || '',
  center: [55.76, 37.64], // Moscow coordinates
  zoom: 10,
  controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
  type: 'yandex#map' as const,
};

export const MAP_STYLE = {
  width: '100%',
  height: '400px',
};

export const DEFAULT_ROUTE_POINTS = {
  from: [55.76, 37.64], // Moscow
  to: [55.76, 37.64], // Moscow
}; 