import { csvToGeoJSON } from "@/lib/gis";
import { RawCsvRowDto } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Papa from "papaparse";

export function useGis(fileName: string) {
  return useQuery({
    queryKey: ["csv", fileName],
    queryFn: async () => {
      const res = await axios.get(`/csv/${fileName}`);
      const parsed = Papa.parse(res.data, { header: true });
      const rawData = parsed.data as RawCsvRowDto[];
      return csvToGeoJSON(rawData);
    },
  });
}
