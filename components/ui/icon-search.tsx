import Svg, { Circle, Path } from 'react-native-svg';

export function IconSearch() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} />
      <Path d="M16.5 16.5 L21 21" stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}