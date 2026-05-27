import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';
import CheckBadge from './check-badge';
import PhotoCircle from './photo-circle';

type Props = {
  id?: string;
  time_start: string;
  duration: string;
  session: string;
  name: string;
  initials: string;
  done?: boolean;
  last?: boolean;
  onPress?: (id: string) => void;
};

export default function ScheduleRow({ id = 'su3', time_start, duration, session, name, initials, done, last, onPress }: Props) {
  const content = (
    <>
      <View style={styles.timeCol}>
        <PhotoCircle size={46} initials={initials} ring={false} />
      </View>
      <View style={styles.middle}>
        <Text style={styles.sessionTitle}>{session}</Text>
        <Text style={styles.time}>{time_start} - {duration}</Text>
        <Text style={styles.sessionTeacher}>{name}</Text>
      </View>
      <CheckBadge done={done} />
    </>
  );

  const rowStyle = [styles.row];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name?.replace('\n', ' ')}
        style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
        onPress={() => onPress && onPress(id)}
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
  sessionTitle: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 15,
    color: '#fff',
    letterSpacing: -0.2,
  },
  sessionMeta: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 1,
  },
  sessionTeacher: {
    fontFamily: FONTS.interMedium,
    fontWeight: '500' as const,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 1,
  },
});
