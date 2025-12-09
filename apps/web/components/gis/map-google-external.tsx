import { ExternalLinkIcon } from "lucide-react";
import React from "react";

type Props = {
  lat: number;
  lng: number;
};

export default function MapGoogleExternal({ lat, lng }: Props) {
  return (
    <a
      href={`https://www.google.com/maps?q=${lat},${lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="leaflet-link text-center flex justify-center gap-1 items-center border-2 border-blue-300 rounded-md p-1 hover:!text-white hover:bg-blue-400 duration-200 transition-all hover:border-blue-400"
    >
      <ExternalLinkIcon size={16} />
      Google Map
    </a>
  );
}
