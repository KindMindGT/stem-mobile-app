import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GRADIENTS, STEM_HEADER } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';
import { TEXT } from '../theme/typography';

type GradientKey = keyof typeof GRADIENTS;

type Props = {
  title: string;
  variant?: GradientKey;
};

export default function GradientHeader({ title, variant = 'stem-header-gradient' } : Props) {
  const grad = GRADIENTS[variant] ?? GRADIENTS['stem-header-gradient'];
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={grad.colors as [string, string, ...string[]]}
        locations={grad.locations as [number, number, ...number[]]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: LAYOUT.headerHeight,
    paddingTop: LAYOUT.safeTop,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    ...SHADOWS.headerGlow,
  },
  title: {
    ...TEXT.h2,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});
