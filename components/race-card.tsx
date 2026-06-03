import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SHADOWS } from '../theme/shadows';
import { FONTS, TEXT } from '../theme/typography';
import { FlagByCode } from './flags';

type RaceCellProps = {
  flagCode: string;
  name: string;
  footLabel: string;
  footValue: string;
  showRight?: boolean;
  footAlign?: 'left' | 'right';
};

type RaceCardProps = {
  pair: {
    left: {
      flagCode: string;
      name: string;
    };
    right: {
      flagCode: string;
      name: string;
    };
    start: string;
    date: string;
  };
  separator?: boolean;
};

function RaceCell({ flagCode, name, footLabel, footValue, showRight, footAlign = 'left' } : RaceCellProps) {
  const rightAlign = footAlign === 'right';
  return (
    <View style={[styles.cell, showRight && styles.cellWithDivider]}>
      <View style={styles.cellTop}>
        <FlagByCode code={flagCode} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.cellBottom}>
        <View style={styles.divider} />
        <View style={rightAlign ? styles.alignEnd : styles.alignStart}>
          <Text style={[styles.footLabel, rightAlign && styles.textRight]}>{footLabel}</Text>
          <Text style={[styles.footValue, rightAlign && styles.textRight]}>{footValue}</Text>
        </View>
      </View>
    </View>
  );
}

export default function RaceCard({ pair, separator = true } : RaceCardProps) {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#2a9eff', '#1a6fd9']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']}
        locations={[0, 0.45]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.row}>
        <RaceCell
          flagCode={pair.left.flagCode}
          name={pair.left.name}
          footLabel="START"
          footValue={pair.start}
          footAlign="left"
          showRight={separator}
        />
        <RaceCell
          flagCode={pair.right.flagCode}
          name={pair.right.name}
          footLabel="DATE"
          footValue={pair.date}
          footAlign="right"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 336,
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOWS.raceCard,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 168,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
    minHeight: 232,
    justifyContent: 'space-between',
  },
  cellWithDivider: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.22)',
  },
  cellTop: {
    alignItems: 'center',
    gap: 14,
  },
  name: {
    ...TEXT.h3,
    fontSize: 22,
    lineHeight: 23,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  cellBottom: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.28)',
    marginBottom: 12,
  },
  alignStart: {
    alignSelf: 'flex-start',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  textRight: {
    textAlign: 'right',
  },
  footLabel: {
    fontFamily: FONTS.interBold,
    color: '#fff',
    fontSize: 9,
    letterSpacing: 1.6,
    opacity: 0.9,
    fontWeight: '700',
  },
  footValue: {
    fontFamily: FONTS.archivoBold,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
  },
});
