import Svg, { Circle, Path } from 'react-native-svg';

export function IconHelp({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
      <Path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        stroke={color} strokeWidth={2} strokeLinecap="round"
      />
      <Circle cx="12" cy="17" r="0.5" fill={color} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}