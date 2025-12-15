"use client";

import { useRef, useState, useMemo } from "react";
import Map from "react-map-gl/maplibre";
import maplibregl, { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, LineLayer } from "@deck.gl/layers";
import { MapViewState, ViewStateChangeParameters } from "@deck.gl/core";

import {
  PointData,
  LineData,
  INTERACTION_ACTION,
  LayerState,
  LayerId,
} from "@repo/types";

import MapLayerPanel from "./map-layer-panel";
import MapBasemapPanel from "./map-basemap-panel";

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

export default function MapComponent() {
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: 100.5018,
    latitude: 13.7563,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  });

  const [layerState, setLayerState] = useState<LayerState>({
    roads: true,
    population: true,
    buildings: false,
  });

  const points: PointData[] = [
    { position: [100.5018, 13.7563], size: 200 },
    { position: [100.515, 13.75], size: 150 },
  ];

  const lines: LineData[] = [
    { source: [100.49, 13.75], target: [100.53, 13.77] },
  ];

  const layers = useMemo(() => {
    const result = [];

    if (layerState.population) {
      result.push(
        new ScatterplotLayer({
          id: "population",
          data: points,
          getPosition: (d: PointData) => d.position,
          getRadius: (d: PointData) => d.size,
          radiusUnits: "meters",
        })
      );
    }

    if (layerState.roads) {
      result.push(
        new LineLayer({
          id: "roads",
          data: lines,
          getSourcePosition: (d: LineData) => d.source,
          getTargetPosition: (d: LineData) => d.target,
          getWidth: 5,
        })
      );
    }

    return result;
  }, [layerState]);

  const prevViewStateRef = useRef<MapViewState | null>(null);

  const handleViewStateChange = ({ viewState }: ViewStateChangeParameters) => {
    const prev = prevViewStateRef.current;
    if (prev) {
      const action = detectInteraction(prev, viewState as MapViewState);
      console.log(action);
    }

    prevViewStateRef.current = viewState as MapViewState;
    setViewState(viewState as MapViewState);
  };

  const handleLayerPanelToggle = (id: LayerId) => {
    setLayerState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full h-full">
      <DeckGL
        controller
        layers={layers}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
      >
        <Map mapLib={maplibregl} mapStyle={MAP_STYLE} />
      </DeckGL>

      <MapLayerPanel
        layerState={layerState}
        onLayerToggle={handleLayerPanelToggle}
      />
      <MapBasemapPanel
        layerState={layerState}
        onLayerToggle={handleLayerPanelToggle}
      />
    </div>
  );
}

/* ---------- Interaction detection ---------- */
function detectInteraction(
  prev: MapViewState,
  next: MapViewState
): INTERACTION_ACTION {
  if (next.zoom !== prev.zoom) return "ZOOM";
  if (next.longitude !== prev.longitude || next.latitude !== prev.latitude)
    return "PAN";
  if (next.bearing !== prev.bearing) return "ROTATE";
  if (next.pitch !== prev.pitch) return "PITCH";
  return "UNKNOWN";
}
