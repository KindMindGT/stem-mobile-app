import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../theme/typography';

type Props = {
  label: string;
  value: string;
};

export default function CartSummaryLine({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#fff',
    fontFamily: FONTS.archivoBold,
    fontWeight: '700',
  },
});
