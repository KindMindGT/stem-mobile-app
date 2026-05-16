import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SHADOWS } from '../theme/shadows';
import { FONTS } from '../theme/typography';

export const DAY_CHIP_SIZE = 72;

type Props = {
  dow: string;
  day: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function DayChip({ dow, day, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${dow} ${day}`}
      accessibilityState={{ selected }}
      style={[styles.chip, selected && SHADOWS.bluePop]}
    >
      <LinearGradient
        colors={selected ? ['#1a9eff', '#1466d6'] : ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={[styles.dow, selected && styles.dowActive]}>{dow}</Text>
      <Text style={[styles.day, selected && styles.dayActive]}>{day}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: DAY_CHIP_SIZE,
    height: DAY_CHIP_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  dow: {
    fontFamily: FONTS.interBold,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '700' as const,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
  },
  dowActive: {
    color: '#fff',
  },
  day: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic' as const,
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: -1,
    color: 'rgba(255,255,255,0.6)',
  },
  dayActive: {
    color: '#fff',
  },
});
