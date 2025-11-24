import { CsvRowDto, GeoJsonDto, RawCsvRowDto } from "@repo/types";

const LAT_KEYWORDS = [
  "lat",
  "latitude",
  "y",
  "north",
  "ละติ",
  "ละติจูด N",
  "ละติจูด (N)",
];

const LNG_KEYWORDS = [
  "lng",
  "longtitude",
  "x",
  "east",
  "ลองติจูด",
  "ลองจิจ",
  "ลองจิจูด €",
  "ลองจิจูด (E)",
];

export function normalizeCsvRow(row: RawCsvRowDto): CsvRowDto | null {
  const normalized: CsvRowDto = {
    ...row,
    lat: undefined as unknown as number,
    lng: undefined as unknown as number,
  };

  for (const key of Object.keys(row)) {
    const value = row[key];
    if (!value) continue;

    if (LAT_KEYWORDS.some((kw) => key.toLowerCase().includes(kw))) {
      normalized.lat = parseFloat(value);
    }

    if (LNG_KEYWORDS.some((kw) => key.toLowerCase().includes(kw))) {
      normalized.lng = parseFloat(value);
    }
  }

  if (normalized.lat === undefined || normalized.lng === undefined) {
    return null; //Can't show if there are no lattitude or longtitude
  }

  return normalized;
}

export function csvToGeoJSON(rows: unknown[]): GeoJsonDto {
  const normalizedRows: CsvRowDto[] = rows
    .filter((r): r is RawCsvRowDto => typeof r === "object" && r !== null)
    .map(normalizeCsvRow)
    .filter((r): r is CsvRowDto => r !== null);

  return {
    type: "FeatureCollection",
    features: normalizedRows.map((r) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [r.lng, r.lat],
      },
      properties: r,
    })),
  };
}
