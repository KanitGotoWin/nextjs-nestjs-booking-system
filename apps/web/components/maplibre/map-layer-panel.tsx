"use client";

import { LayerConfig, LayerId, LayerState } from "@repo/types";

type Props = {
  layerState: LayerState;
  onLayerToggle: (layerId: LayerId) => void;
};

const LAYERS: LayerConfig[] = [
  { id: "roads", label: "Roads", group: "data" },
  { id: "population", label: "Population", group: "data" },
  { id: "buildings", label: "Buildings", group: "data" },
];

export default function MapLayerPanel({ layerState, onLayerToggle }: Props) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 bg-white shadow rounded p-3 space-y-2">
        {LAYERS.map((layer) => (
          <label key={layer.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={layerState[layer.id]}
              onChange={() => onLayerToggle(layer.id)}
            />
            {layer.label}
          </label>
        ))}
      </div>
    </div>
  );
}
