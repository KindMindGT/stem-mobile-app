import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SHADOWS } from '../theme/shadows';
import { FONTS } from '../theme/typography';

export const DAY_CHIP_SIZE = 108;

type Props = {
  dow: string;
  day: string;
  active?: boolean;
};

export default function DayChip({ dow, day, active } : Props) {
  return (
    <View style={[styles.chip, active && SHADOWS.bluePop]}>
      <LinearGradient
        colors={active ? ['#1a9eff', '#1466d6'] : ['#322258', '#261a48']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.dow}>{dow}</Text>
      <Text style={styles.day}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: DAY_CHIP_SIZE,
    height: DAY_CHIP_SIZE,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dow: {
    fontFamily: FONTS.interBold,
    fontSize: 13,
    letterSpacing: 1.6,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
  },
  day: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontSize: 54,
    lineHeight: 54,
    letterSpacing: -1.5,
    color: '#fff',
  },
});
