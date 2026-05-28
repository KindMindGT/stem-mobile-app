import Svg, { Path } from 'react-native-svg';

export function IconChevron({ color, expanded }: { color: string; expanded?: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path 
        d={expanded ? 'M6 15 L12 9 L18 15' : 'M9 18 L15 12 L9 6'}
        stroke={color} 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </Svg>
  );
}