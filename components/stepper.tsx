import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../theme/typography';
import { useLanguage } from '../contexts/LanguageContext';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  compact?: boolean;
  min?: number;
  max?: number;
};

export default function Stepper({ value = 1, onChange, compact = false, min = 0, max = 99 } : Props) {
  const { t } = useLanguage();
  const size = compact ? 26 : 32;
  const dec = () => onChange && onChange(Math.max(min, value - 1));
  const inc = () => onChange && onChange(Math.min(max, value + 1));
  return (
    <View style={[styles.row, { gap: compact ? 8 : 14 }]}>
      <Pressable
        onPress={dec}
        accessibilityRole="button"
        accessibilityLabel={t.stepper.decrease}
        style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <Text style={[styles.value, { fontSize: compact ? 16 : 18 }]}>{value}</Text>
      <Pressable
        onPress={inc}
        accessibilityRole="button"
        accessibilityLabel={t.stepper.increase}
        style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontFamily: FONTS.archivoBold,
    fontWeight: '700',
    fontSize: 16,
  },
  value: {
    minWidth: 22,
    textAlign: 'center',
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    color: '#fff',
  },
});
