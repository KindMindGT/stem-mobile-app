// function to set alpha values for a color
export const setAlpha = (color: string, alpha: number) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Primary pallette
export const CARBON_SHADOW = '#05000B';
export const PITLANE_PINK = '#E6007E';

// Secondary palette
export const CHICANE_VIOLET = '#961B81';
export const IGNITE_INDIGO = '#312783';
export const APEX_GLACIER = '#005CA9';
export const AERO_SKY = '#009FE3';
export const TURBO_VERDE = '#008A3F';
export const GRID_LIME = '#95C11F';
export const PODIUM_GOLD = '#FCBC00';
export const BURNOUT_ORANGE = '#ED6D05';

// Blue theme palette (for STEM app UI)
export const STEM_BG = '#1565C0';
export const STEM_HEADER = '#0D47A1';
export const STEM_NAV = '#1A237E';

// function to set gradients with palette colors as parameters
export const createGradient = (colors: string[]) => {
  const step = 1 / (colors.length - 1);
  const locations = colors.map((_, i) => i * step);
  return { colors, locations };
};

export const GRADIENTS = {
  'primary-gradient-1': createGradient([CARBON_SHADOW, '#504D54']),
  'primary-gradient-2': createGradient([IGNITE_INDIGO, CHICANE_VIOLET, PITLANE_PINK, BURNOUT_ORANGE, PODIUM_GOLD]),
  'blue-gradient': createGradient([APEX_GLACIER, AERO_SKY]),
  'green-gradient': createGradient([TURBO_VERDE, GRID_LIME]),
  'blue-green-gradient': createGradient([AERO_SKY, GRID_LIME]),
  'orange-gradient': createGradient([BURNOUT_ORANGE, PODIUM_GOLD]),
  'pink-gradient': createGradient([CHICANE_VIOLET, PITLANE_PINK, BURNOUT_ORANGE]),
  'stem-header-gradient': createGradient([STEM_HEADER, STEM_BG]),
}
