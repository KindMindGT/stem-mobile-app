import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
//import { FONTS } from '../theme/typography';
//import ApexMark from './ApexMark';

export default function BrandLockup({
  markSize = 92,
  pillLabel,
  pillFontSize = 13,
  titleSize = 28,
}: {
  markSize?: number;
  pillLabel?: string;
  pillFontSize?: number;
  titleSize?: number;
}) {
  const { t } = useLanguage();
  const resolvedPill = pillLabel ?? t.brandLookup.defaultPill;
  return (
    <View style={styles.row}>
      {/* <ApexMark size={markSize} /> */}
      <View style={styles.col}>
        <View style={styles.pill}>
          <Text style={[styles.pillText, { fontSize: pillFontSize }]}>{resolvedPill}</Text>
        </View>
        <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleSize - 1 }]}>
          {t.brandLookup.brandTitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  col: {
    alignItems: 'flex-start',
    gap: 6,
  },
  pill: {
    backgroundColor: '#1a8eff',
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 4,
    borderRadius: 4,
  },
  pillText: {
    //fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    //fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    color: '#fff',
    letterSpacing: -0.5,
    fontWeight: '800',
  },
});
