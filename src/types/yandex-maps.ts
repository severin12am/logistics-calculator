export interface YMaps {
  Map: any;
  Placemark: any;
  GeoObject: any;
  MapType: any;
  ZoomControl: any;
  TypeControl: any;
  ScaleLine: any;
  SearchControl: any;
  TrafficControl: any;
  FullscreenControl: any;
  GeolocationControl: any;
  RouteEditor: any;
  RouteButton: any;
  RoutePanel: any;
  Route: any;
  Polyline: any;
  Rectangle: any;
  Circle: any;
  Polygon: any;
  GeoQueryResult: any;
  GeoQuery: any;
  GeoQueryResultSet: any;
  GeoQueryResultCollection: any;
  GeoQueryResultFeature: any;
  GeoQueryResultFeatureCollection: any;
  GeoQueryResultGeometry: any;
  GeoQueryResultGeometryCollection: any;
  GeoQueryResultPoint: any;
  GeoQueryResultMultiPoint: any;
  GeoQueryResultLineString: any;
  GeoQueryResultMultiLineString: any;
  GeoQueryResultPolygon: any;
  GeoQueryResultMultiPolygon: any;
}

export interface YMapsInstance {
  ready: () => Promise<YMaps>;
}

export interface YMapsScript {
  load: () => Promise<YMapsInstance>;
}

declare global {
  interface Window {
    ymaps: {
      ready: () => Promise<YMaps>;
      load: (apiKey: string) => Promise<YMapsInstance>;
    };
  }
} 