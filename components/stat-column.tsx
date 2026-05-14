import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TONE_PAIR } from '../theme/tones';
import { FONTS } from '../theme/typography';
import GradientText from './gradient-text';

type Props = {
  value: string;
  label: string;
  tone?: 'pink' | 'orange' | 'blue' | 'purple';
};

export default function StatColumn({ value, label, tone = 'pink' }: Props) {
  const colors = TONE_PAIR[tone] || TONE_PAIR.pink;
  return (
    <View style={styles.col}>
      <GradientText colors={colors} style={styles.value}>
        {value}
      </GradientText>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: -0.4,
  },
  label: {
    marginTop: 2,
    fontSize: 9,
    letterSpacing: 1.8,
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.55)',
  },
});
