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
}
