import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { FONTS } from '../theme/typography';

type Props = {
  label: string;
  danger?: boolean;
  onPress: () => void;
};

export default function SettingRow({ label, danger, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, danger && styles.danger]}>{label}</Text>
      <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 5 L16 12 L9 19"
          stroke={danger ? '#ff5e7a' : 'rgba(255,255,255,0.45)'}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  label: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700',
    fontSize: 15,
    color: 'rgba(255,255,255,0.92)',
  },
  danger: {
    color: '#ff5e7a',
  },
});
