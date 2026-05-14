import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type IconSpec = {
  d: string;
  strokeWidth: number;
  size: number;
  stroke?: string;
};

const ICONS: Record<string, IconSpec> = {
  back: {
    d: 'M15 5 L8 12 L15 19',
    strokeWidth: 2.4,
    size: 14,
  },
  forward: {
    d: 'M9 5 L16 12 L9 19',
    strokeWidth: 2.2,
    size: 14,
  },
  heart: {
    d: 'M12 20 C 4 14 2 9 6 6 C 9 4 11 6 12 8 C 13 6 15 4 18 6 C 22 9 20 14 12 20 Z',
    strokeWidth: 1.8,
    size: 16,
  },
  settings: {
    d: 'M12 3 L13 5 H19 V11 L21 12 L19 13 V19 H13 L12 21 L11 19 H5 V13 L3 12 L5 11 V5 H11 Z',
    strokeWidth: 1.8,
    size: 16,
  },
  logout: {
    d: 'M10 4 H6 A 2 2 0 0 0 4 6 V18 A 2 2 0 0 0 6 20 H10 M16 8 L20 12 L16 16 M10 12 H20',
    strokeWidth: 1.8,
    size: 16,
  },
  trash: {
    d: 'M5 7 H19 M9 7 V5 A 1 1 0 0 1 10 4 H14 A 1 1 0 0 1 15 5 V7 M7 7 L8 20 H16 L17 7',
    strokeWidth: 1.6,
    size: 18,
    stroke: 'rgba(255,255,255,0.5)',
  },
};

const VARIANT_STYLES = {
  dark: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  ghost: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  translucent: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bare: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
};

type Props = {
  icon: keyof typeof ICONS;
  onPress: () => void;
  style?: any;
  variant?: keyof typeof VARIANT_STYLES;
  size?: number;
  accessibilityLabel?: string;
};

export default function IconButton({
  icon,
  onPress,
  style,
  variant = 'dark',
  size = 38,
  accessibilityLabel,
}: Props) {
  const spec = ICONS[icon];
  if (!spec) return null;
  const stroke = spec.stroke ?? '#fff';
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || icon}
      style={[
        styles.btn,
        VARIANT_STYLES[variant],
        { width: size, height: size, borderRadius: size },
        style,
      ]}
    >
      <Svg width={spec.size} height={spec.size} viewBox="0 0 24 24" fill="none">
        <Path
          d={spec.d}
          stroke={stroke}
          strokeWidth={spec.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
