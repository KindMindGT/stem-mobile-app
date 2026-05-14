import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { GRADIENTS } from '../theme/colors';
import { SHADOWS } from '../theme/shadows';
import { TEXT } from '../theme/typography';

type GradientKey = keyof typeof GRADIENTS;

type Props = {
  label: string;
  onPress: () => void;
  height?: number;
  radius?: number;
  variant?: GradientKey;
  accessibilityLabel?: string;
};

export default function GradientButton({
  label,
  onPress,
  height = 60,
  radius = 18,
  variant = 'blue-gradient',
  accessibilityLabel,
}: Props) {
  const grad = GRADIENTS[variant] ?? GRADIENTS['blue-gradient'];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      style={({ pressed }): ViewStyle[] => [
        styles.btn,
        { height, borderRadius: radius },
        pressed ? styles.pressed : {},
      ]}
    >
      <LinearGradient
        colors={grad.colors as [string, string, ...string[]]}
        locations={grad.locations as [number, number, ...number[]]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.sheen} pointerEvents="none">
        <LinearGradient
          colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']}
          locations={[0, 0.6]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.pinkCta,
  },
  pressed: {
    opacity: 0.92,
  },
  sheen: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    ...TEXT.ctaLabel,
  },
});
