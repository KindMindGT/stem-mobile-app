import { LinearGradient } from 'expo-linear-gradient';
import React, { useId } from 'react';
import { StyleSheet, Text, View, DimensionValue } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { TONE_RAMP } from '../theme/tones';

type Props = {
  label?: string;
  tone?: keyof typeof TONE_RAMP;
  radius?: number;
  width?: DimensionValue;
  height?: DimensionValue;
};

export default function ImgPlaceholder({
  label = 'image',
  tone = 'pink',
  radius = 14,
  height = '100%',
  width = '100%',
} : Props) {
  const ramp = TONE_RAMP[tone] || TONE_RAMP.pink;
  const [a, b, c] = ramp;
  const rawId = useId();
  const patternId = `imgp-${rawId.replace(/[^a-zA-Z0-9-]/g, '')}`;
  return (
    <View style={[styles.wrap, { width, height, borderRadius: radius }]}>
      <LinearGradient
        colors={[a, b]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <Pattern
            id={patternId}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <Rect width="14" height="14" fill={a} opacity="0" />
            <Rect width="2" height="14" fill={c} opacity="0.18" />
          </Pattern>
        </Defs>
        <Rect width="200" height="200" fill={`url(#${patternId})`} />
      </Svg>
      {label ? (
        <View style={[StyleSheet.absoluteFill, styles.labelWrap]} pointerEvents="none">
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    position: 'relative',
  },
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Menlo',
    fontSize: 10,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.55)',
    textTransform: 'uppercase',
  },
});
