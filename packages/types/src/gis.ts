//Input before normalize
export type RawCsvRowDto = {
  [key: string]: string;
};

//Output after normalize
export type CsvRowDto = {
  lat: number;      // normalized to number
  lng: number;      // normalized to number
  [key: string]: any; // keep extra fields for popup/properties
};

export type GeoJsonDto = {
  type: "FeatureCollection";
  features: GeoJsonFeatureDto[];
};

export type GeoJsonFeatureDto = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  properties: CsvRowDto; // include all CSV properties
};
