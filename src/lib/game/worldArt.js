// Composition data for the illustrated world maps.
// Coordinates are in the artwork's own space (percent of the 1392 x 752 image).
// Each node was traced off the painted road in its background, so the quest
// trail follows the trail in the art instead of a centre column.
export const MAP_IMAGE_RATIO = 1392 / 752;

export const WORLD_ART = {
  w1: {
    image: "/images/world-1.jpg",
    thumbPosition: "52% 58%",
    nodes: [
      { x: 52, y: 16 },
      { x: 50, y: 36 },
      { x: 50, y: 50 },
      { x: 55, y: 67 },
      { x: 52, y: 85 },
    ],
  },
  w2: {
    image: "/images/world-2.jpg",
    thumbPosition: "50% 46%",
    nodes: [
      { x: 50, y: 26 },
      { x: 52, y: 42 },
      { x: 49, y: 58 },
      { x: 46, y: 74 },
      { x: 48, y: 88 },
    ],
  },
  w3: {
    image: "/images/world-3.jpg",
    thumbPosition: "50% 44%",
    nodes: [
      { x: 45, y: 50 },
      { x: 58, y: 61 },
      { x: 50, y: 72 },
      { x: 58, y: 82 },
      { x: 49, y: 92 },
    ],
  },
  w4: {
    image: "/images/world-4.jpg",
    thumbPosition: "50% 46%",
    nodes: [
      { x: 49, y: 46 },
      { x: 56, y: 58 },
      { x: 50, y: 70 },
      { x: 48, y: 82 },
      { x: 55, y: 92 },
    ],
  },
  w5: {
    image: "/images/world-5.jpg",
    thumbPosition: "50% 48%",
    nodes: [
      { x: 46, y: 54 },
      { x: 56, y: 63 },
      { x: 47, y: 72 },
      { x: 57, y: 82 },
      { x: 48, y: 92 },
    ],
  },
  w6: {
    image: "/images/world-6.jpg",
    thumbPosition: "50% 42%",
    nodes: [
      { x: 42, y: 50 },
      { x: 56, y: 60 },
      { x: 45, y: 70 },
      { x: 56, y: 80 },
      { x: 47, y: 90 },
    ],
  },
};

export const WORLD_ART_FALLBACK = WORLD_ART.w1;
