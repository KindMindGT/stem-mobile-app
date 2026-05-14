import { LinearGradient } from 'expo-linear-gradient';
import React, { useId } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLG } from 'react-native-svg';
import { FONTS } from '../theme/typography';

const RING_PADDING = 3;

export default function PhotoCircle({ size = 56, initials = 'AS', ring = true }) {
  const outer = size + (ring ? RING_PADDING * 2 : 0);
  const rawId = useId();
  const ringId = `pcring-${rawId.replace(/[^a-zA-Z0-9-]/g, '')}`;
  return (
    <View style={{ width: outer, height: outer, position: 'relative' }}>
      {ring && (
        <Svg width={outer} height={outer} viewBox={`0 0 ${outer} ${outer}`} style={StyleSheet.absoluteFill}>
          <Defs>
            <SvgLG id={ringId} x1="0" y1="0" x2={outer} y2={outer} gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#ff7a1a" />
              <Stop offset="0.35" stopColor="#ff1f7a" />
              <Stop offset="0.7" stopColor="#2a8eff" />
              <Stop offset="1" stopColor="#ff7a1a" />
            </SvgLG>
          </Defs>
          <Circle cx={outer / 2} cy={outer / 2} r={outer / 2} fill={`url(#${ringId})`} />
        </Svg>
      )}
      <View
        style={[
          styles.inner,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            margin: ring ? RING_PADDING : 0,
          },
        ]}
      >
        <LinearGradient
          colors={['#3a1a4a', '#1a2d4a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: size / 2 }]}
        />
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    color: '#fff',
    letterSpacing: -0.5,
  },
});
