import type { YMaps } from 'yandex-maps';

export const loadYandexMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.ymaps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.REACT_APP_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};

// Add type declaration for window.ymaps
declare global {
  interface Window {
    ymaps: {
      ready: () => Promise<YMaps>;
      Map: any;
    };
  }
} 