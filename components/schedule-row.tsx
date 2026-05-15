import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GRADIENTS } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';
import CheckBadge from './check-badge';
import GradientText from './gradient-text';

type Props = {
  time1: string;
  time2: string;
  session: string;
  name: string;
  done?: boolean;
  last?: boolean;
  onPress?: (id: string) => void;
};

export default function ScheduleRow({ time1, time2, session, name, done, last, onPress } : Props) {
  const content = (
    <>
      <View style={styles.timeCol}>
        <Text style={styles.time}>{time1}</Text>
        <Text style={styles.time}>{time2}</Text>
      </View>
      <View style={styles.middle}>
        <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.sessionLabel}>
          {session}
        </GradientText>
        <Text style={styles.name}>{name}</Text>
      </View>
      <CheckBadge done={done} />
    </>
  );

  const rowStyle = [styles.row, !last && styles.divider];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name?.replace('\n', ' ')}
        style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
        onPress={() => onPress && onPress(name)}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: 18,
    gap: 14,
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  timeCol: {
    width: 64,
  },
  time: {
    fontFamily: FONTS.archivoSemiBold,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 17,
  },
  middle: {
    flex: 1,
  },
  sessionLabel: {
    fontFamily: FONTS.interBold,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  name: {
    ...TEXT.h3,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.3,
    marginTop: 2,
  },
});
