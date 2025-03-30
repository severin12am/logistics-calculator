import React, { useEffect, useRef } from 'react';
import type { YMaps } from 'yandex-maps';
import { YANDEX_MAPS_CONFIG, MAP_STYLE } from '../../config/yandex-maps';
import { loadYandexMaps } from '../../utils/loadYandexMaps';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onMapLoad?: (map: YMaps['Map']) => void;
}

export const Map: React.FC<MapProps> = ({
  center = YANDEX_MAPS_CONFIG.center,
  zoom = YANDEX_MAPS_CONFIG.zoom,
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YMaps['Map'] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        await loadYandexMaps();
        
        if (!isMounted || !mapRef.current) return;

        await window.ymaps.ready();
        
        const map = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: YANDEX_MAPS_CONFIG.controls,
          type: YANDEX_MAPS_CONFIG.type,
        });

        mapInstanceRef.current = map;
        onMapLoad?.(map);
      } catch (error) {
        console.error('Error initializing Yandex Maps:', error);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy?.();
      }
    };
  }, [center, zoom, onMapLoad]);

  return <div ref={mapRef} style={MAP_STYLE} />;
}; 