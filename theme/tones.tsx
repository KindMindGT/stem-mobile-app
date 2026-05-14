import { PITLANE_PINK, BURNOUT_ORANGE, APEX_GLACIER, CHICANE_VIOLET } from './colors';

// Three-stop dark→accent gradient ramps for placeholders, badges, tiles.
export const TONE_RAMP = {
  pink: ['#3a0e2a', '#5a1840', PITLANE_PINK],
  orange: ['#3a1a0a', '#5a2c15', BURNOUT_ORANGE],
  blue: ['#0a1f3a', '#15355a', APEX_GLACIER],
  purple: ['#1d0e3a', '#2f1a5a', CHICANE_VIOLET],
  dark: ['#0e0e12', '#1a1a22', '#3a3a48'],
};

// Two-stop accent pair used for gradient text fills.
export const TONE_PAIR = {
  pink: [PITLANE_PINK, '#ff7fb1'],
  orange: [BURNOUT_ORANGE, '#ffb066'],
  blue: [APEX_GLACIER, '#7ec1ff'],
  purple: [CHICANE_VIOLET, '#d266ee'],
};
