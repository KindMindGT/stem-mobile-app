import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import CheckBadge from '../components/check-badge';
import GradientHeader from '../components/gradient-header';
import PhotoCircle from '../components/photo-circle';
import { AERO_SKY, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

// ─── Data ──────────────────────────────────────────────────────────────────────

const TEACHER = {
  initials: 'IO',
  name: 'Ines Ordonez',
  role: 'Lead Academic',
  email: 'hola@stemracing.gt',
  bio: 'Inés leads the academic structure of STEM Racing Guatemala, ensuring that every learning experience combines international methodology, critical thinking, and the integral development of children and young people',
  upcomingLabel: 'UPCOMING CLASSES WITH',
  upcoming: [
    {
      id: 'tu1',
      date: '14 MAYO',
      time: '2:30 PM',
      name: 'Recovery - Underspreassure\nClass #1',
      done: true,
    },
    {
      id: 'tu2',
      date: '14 MAYO',
      time: '2:30 PM',
      name: 'Recovery - Underspreassure\nClass #1',
      done: true,
    },
    {
      id: 'tu3',
      date: '14 MAYO',
      time: '2:30 PM',
      name: 'Recovery - Underspreassure\nClass #1',
      done: true,
    },
  ],
};

// ─── Back icon ─────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Class row ─────────────────────────────────────────────────────────────────

function ClassRow({
  row,
  isLast,
}: {
  row: typeof TEACHER.upcoming[0];
  isLast: boolean;
}) {
  return (
    <View style={[styles.classRow, !isLast && styles.classRowDivider]}>
      {/* Date + time */}
      <View style={styles.classDateTime}>
        <Text style={styles.classDate}>{row.date}</Text>
        <Text style={styles.classTime}>{row.time}</Text>
      </View>

      {/* Class name */}
      <Text style={styles.className}>{row.name}</Text>

      {/* Check badge */}
      <CheckBadge done={row.done} />
    </View>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

type Props = {
  classId: string;
  onBack: () => void;
};

export default function TeacherProfileScreen({ classId, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <GradientHeader title="Profile" variant="blue-gradient" />

      {/* Back button */}
      <Pressable
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="atrás"
      >
        <BackIcon />
      </Pressable>

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <PhotoCircle size={120} initials={TEACHER.initials} ring={false} />
          <Text style={styles.name}>{TEACHER.name}</Text>
          <Text style={styles.role}>{TEACHER.role}</Text>
          <Text style={styles.email}>{TEACHER.email}</Text>
          <Text style={styles.bio}>{TEACHER.bio}</Text>
        </View>

        {/* ── Upcoming classes ── */}
        <View style={styles.upcoming}>
          <Text style={styles.upcomingLabel}>
            {TEACHER.upcomingLabel}
          </Text>

          <View style={styles.classCard}>
            {TEACHER.upcoming.map((row, i) => (
              <ClassRow
                key={row.id}
                row={row}
                isLast={i === TEACHER.upcoming.length - 1}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  backBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollWrap: { flex: 1 },
  scroll: { paddingTop: 24 },

  // ── Hero
  hero: {
    alignItems: 'center',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingBottom: 8,
  },
  name: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700' as const,
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginTop: 18,
    lineHeight: 30,
  },
  role: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700' as const,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  email: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: AERO_SKY,
    marginTop: 6,
    letterSpacing: 0.1,
  },
  bio: {
    fontFamily: FONTS.archivoBoldItalic,
    //fontStyle: 'italic' as const,
    //fontWeight: '700' as const,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: 320,
  },

  // ── Upcoming
  upcoming: {
    marginTop: 28,
    paddingHorizontal: LAYOUT.screenPadding,
  },
  upcomingLabel: {
    fontFamily: FONTS.interBold,
    //fontWeight: '800' as const,
    fontSize: 11,
    letterSpacing: 2,
    color: '#fff',
    marginBottom: 14,
  },
  classCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  classRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  classDateTime: {
    width: 60,
  },
  classDate: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700' as const,
    fontSize: 12,
    color: '#fff',
    letterSpacing: 0.2,
  },
  classTime: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  className: {
    flex: 1,
    fontFamily: FONTS.archivoBoldItalic,
    //fontStyle: 'italic' as const,
    //fontWeight: '700' as const,
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
});
