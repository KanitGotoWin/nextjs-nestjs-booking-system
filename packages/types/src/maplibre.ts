export type PointData = {
  position: [number, number];
  size: number;
};

export type LineData = {
  source: [number, number];
  target: [number, number];
};

export type INTERACTION_ACTION =
  | "PAN"
  | "ZOOM"
  | "ROTATE"
  | "PITCH"
  | "UNKNOWN";

export type LayerId = "roads" | "population" | "buildings";
export type LayerState = Record<LayerId, boolean>;
export type LayerConfig = {
  id: LayerId;
  label: string;
  group: "base" | "data";
  mutuallyExclusive?: boolean;
};

