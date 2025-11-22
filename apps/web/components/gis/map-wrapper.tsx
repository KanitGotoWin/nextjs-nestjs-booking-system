"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/gis/map"), { ssr: false });

export default function MapWrapper() {
  return <Map />;
}
