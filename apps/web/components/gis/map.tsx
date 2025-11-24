"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { MarkerCluster } from "leaflet";
import { useGis } from "@/hooks/useGis";
import MapLoading from "./map-loading";
import MapCustomController from "./map-custom-controller";
import "leaflet/dist/leaflet.css";
import MapFailAlert from "./map-fail-alert";
import { useRouter, useSearchParams } from "next/navigation";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const defaultFileName = searchParam.get("map") || "1_ocd.csv";
  const [fileName, setFileName] = useState<string>(defaultFileName);
  const { data, isLoading, error } = useGis(fileName);
  const maxRadius = data?.features?.length
    ? Math.min(Math.max(data.features.length / 20, 150), 40)
    : 0;
  const mapCenter: [number, number] = [12, 99.05];

  const handleFileSelect = (selectedFileName: string) => {
    if (selectedFileName === fileName) return;
    setFileName(selectedFileName);

    router.replace(`?map=${selectedFileName}`);
  };

  if (isLoading || !data) return <MapLoading />;
  if (error) return <MapFailAlert />;

  return (
    <div className="relative h-[94dvh] w-full animate-fadeInSmooth">
      <MapContainer className="h-[100%] w-[100%]" center={mapCenter} zoom={5.5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapCustomController
          center={mapCenter}
          selectedFileName={fileName}
          isLoading={isLoading}
          onSelectFile={handleFileSelect}
        />

        {data.features.length >= 150 ? (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={maxRadius}
            iconCreateFunction={(cluster: MarkerCluster) => {
              const count = cluster.getChildCount();
              return L.divIcon({
                html: `<div class="bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-white">${count}</div>`,
                className: "",
                iconSize: L.point(40, 40, true),
              });
            }}
          >
            {data.features.map((feature, idx) => {
              const { id, ...props } = feature.properties;
              const key = `${id ?? "key"}-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}-${idx}`;

              return (
                <Marker
                  key={key}
                  position={[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                  ]}
                >
                  <Popup>
                    {Object.entries(props)
                      .filter(([k]) => k !== "lat" && k !== "lng")
                      .map(([k, v]) => (
                        <div key={k}>
                          <b>{k}</b>: {v}
                        </div>
                      ))}
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        ) : (
          <>
            {data.features.map((feature, idx) => {
              const { id, ...props } = feature.properties;
              const key = `${id ?? "key"}-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}-${idx}`;

              return (
                <Marker
                  key={key}
                  position={[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                  ]}
                >
                  <Popup>
                    {Object.entries(props)
                      .filter(([k]) => k !== "lat" && k !== "lng")
                      .map(([k, v]) => (
                        <div key={k}>
                          <b>{k}</b>: {v}
                        </div>
                      ))}
                  </Popup>
                </Marker>
              );
            })}
          </>
        )}
      </MapContainer>
    </div>
  );
}
