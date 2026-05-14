import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

function FlagJP({ size } : { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect width="28" height="28" rx="14" fill="#fff" />
      <Circle cx="14" cy="14" r="6.5" fill="#bc002d" />
    </Svg>
  );
}

function FlagDE({ size } : { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Defs>
        <ClipPath id="cde">
          <Circle cx="14" cy="14" r="14" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#cde)">
        <Rect y="0" width="28" height="9.3" fill="#111" />
        <Rect y="9.3" width="28" height="9.3" fill="#dd0000" />
        <Rect y="18.6" width="28" height="9.4" fill="#ffce00" />
      </G>
    </Svg>
  );
}

function FlagKR({ size } : { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Rect width="28" height="28" rx="14" fill="#fff" />
      <Path
        d="M9 14 A 5 5 0 0 1 19 14 A 2.5 2.5 0 0 0 14 14 A 2.5 2.5 0 0 1 9 14 Z"
        fill="#cd2e3a"
      />
      <Path
        d="M9 14 A 5 5 0 0 0 19 14 A 2.5 2.5 0 0 1 14 14 A 2.5 2.5 0 0 0 9 14 Z"
        fill="#0047a0"
      />
    </Svg>
  );
}

const FLAGS_BY_CODE = { "JP": FlagJP, "DE": FlagDE, "KR": FlagKR };

export function FlagByCode({ code, size = 28 } : { code: string; size?: number }) {
  const Cmp = FLAGS_BY_CODE[code as keyof typeof FLAGS_BY_CODE];
  return Cmp ? <Cmp size={size} /> : null;
}
