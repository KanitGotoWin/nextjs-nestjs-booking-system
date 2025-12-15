export const centralWorldPoint = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [100.53955, 13.74665]  // center of CentralWorld
  },
  properties: {
    name: "CentralWorld Center"
  }
};

export const walkwayLine = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [100.53923, 13.74690], // front of CentralWorld
      [100.53910, 13.74640], // walkway
      [100.53900, 13.74600]  // BTS Chidlom direction
    ]
  },
  properties: {
    name: "Walkway Path"
  }
};
