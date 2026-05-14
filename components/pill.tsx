import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../theme/typography';

type Props = {
  label: string;
  size?: 'sm' | 'md';
  style?: any;
};

export default function Pill({ label, size = 'md', style }: Props) {
  const padStyle = size === 'sm' ? styles.padSm : styles.padMd;
  const textStyle = size === 'sm' ? styles.textSm : styles.textMd;
  return (
    <View style={[styles.pill, padStyle, style]}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 99,
    backgroundColor: 'rgba(20,20,26,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  padSm: {
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 8,
  },
  padMd: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 9,
  },
  textSm: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  textMd: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.88)',
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
