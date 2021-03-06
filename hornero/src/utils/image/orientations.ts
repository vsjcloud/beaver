export type Orientation = {
  rotation: number;
  xScale: number;
  yScale: number;
};

export const ORIENTATIONS: Record<number, Orientation> = {
  1: {
    rotation: 0,
    xScale: 1,
    yScale: 1,
  },
  2: {
    rotation: 0,
    xScale: -1,
    yScale: 1,
  },
  3: {
    rotation: 180,
    xScale: 1,
    yScale: 1,
  },
  4: {
    rotation: 180,
    xScale: -1,
    yScale: 1,
  },
  5: {
    rotation: 90,
    xScale: 1,
    yScale: -1,
  },
  6: {
    rotation: 90,
    xScale: 1,
    yScale: 1,
  },
  7: {
    rotation: 270,
    xScale: 1,
    yScale: -1,
  },
  8: {
    rotation: 270,
    xScale: 1,
    yScale: 1,
  },
};
