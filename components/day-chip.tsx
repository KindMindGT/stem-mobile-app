import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SHADOWS } from '../theme/shadows';
import { FONTS } from '../theme/typography';

export const DAY_CHIP_SIZE = 60; // width; height is taller

type Props = {
  dow: string;        // 'LUN'
  day: string;        // '14'
  selected?: boolean;
  today?: boolean;    // ring highlight when this is today but not selected
  hasSessions?: boolean; // dot indicator
  onPress?: () => void;
};

export default function DayChip({ dow, day, selected, today, hasSessions, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${dow} ${day}`}
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        today && !selected && styles.chipToday,
        selected && SHADOWS.bluePop,
      ]}
    >
      <LinearGradient
        colors={
          selected
            ? ['#1a9eff', '#1466d6']
            : ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.05)']
        }
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Text style={[styles.dow, selected && styles.textActive]}>{dow}</Text>
      <Text style={[styles.day, selected && styles.textActive]}>{day}</Text>

      {/* Session dot */}
      {hasSessions && (
        <View style={[styles.dot, selected && styles.dotSelected]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: DAY_CHIP_SIZE,
    height: 72,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  chipToday: {
    borderColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1.5,
  },
  dow: {
    fontFamily: FONTS.interBold,
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700' as const,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
  },
  day: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic' as const,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.5,
    color: 'rgba(255,255,255,0.5)',
  },
  textActive: {
    color: '#fff',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  dotSelected: {
    backgroundColor: '#fff',
  },
});
