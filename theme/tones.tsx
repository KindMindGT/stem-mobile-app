import { APEX_PINK, APEX_ORANGE, APEX_BLUE, APEX_PURPLE } from './colors';

// Three-stop dark→accent gradient ramps for placeholders, badges, tiles.
export const TONE_RAMP = {
  pink: ['#3a0e2a', '#5a1840', '#ff2080'],
  orange: ['#3a1a0a', '#5a2c15', '#ff7a1a'],
  blue: ['#0a1f3a', '#15355a', '#2a8eff'],
  purple: ['#1d0e3a', '#2f1a5a', '#a020c8'],
  dark: ['#0e0e12', '#1a1a22', '#3a3a48'],
};

// Two-stop accent pair used for gradient text fills.
export const TONE_PAIR = {
  pink: [APEX_PINK, '#ff7fb1'],
  orange: [APEX_ORANGE, '#ffb066'],
  blue: [APEX_BLUE, '#7ec1ff'],
  purple: [APEX_PURPLE, '#d266ee'],
};
