import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import PhotoCircle from '../components/photo-circle';
import { AERO_SKY, GRADIENTS, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Data ──────────────────────────────────────────────────────────────────────

const FEATURED_CLASS = {
  id: 'c-pmi-2-3',
  courseLabel: 'Project Management',
  about:
    'This course teaches students how to plan, organize, and execute a competitive project from start to finish. Inspired by PMI methodologies, students learn to manage timelines, roles, deliverables, resources, risks, and goals as a professional team',
  teacher: {
    initials: 'PM',
    name: 'Pablo Melendez',
    role: 'PMI Academic',
  },
  ctaLabel: 'Go to Class',
  countdownLabel: 'DISPONIBLE EN',
  countdownValue: '02:14:33',
};

const HERO_IMAGE = require('../assets/images/Gradients_Cold.png');

// ─── Sponsor block (PMI logo replica) ─────────────────────────────────────────

function SponsorBlock() {
  return (
    <View style={styles.sponsorBlock}>
      
      {/* Left: stylised "E+" mark in orange/black */}
      <View style={styles.sponsorMark}>
        
      </View>

      {/* Right: text stack */}
      <View style={styles.sponsorText}>
        <Text style={styles.sponsorLine1}>Educational</Text>
        <Text style={styles.sponsorLine2}>Foundation</Text>
        <Text style={styles.sponsorLine3}>Project</Text>
        <Text style={styles.sponsorLine3}>Management</Text>
        <Text style={styles.sponsorLine3}>Institute.</Text>
      </View>
    </View>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

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

function ChevronRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

type Props = {
  classId: string;
  countdown?: boolean;
  onBack: () => void;
  onTeacher: () => void;
  onEnter: () => void;
};

export default function ClassDetailScreen({
  classId,
  countdown = false,
  onBack,
  onTeacher,
  onEnter,
}: Props) {
  // TODO: resolve class data by classId when a real data layer is available
  const cls = FEATURED_CLASS;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <GradientHeader title="Courses" variant="blue-gradient" />

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
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero card with gradient background ── */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={GRADIENTS['blue-green-gradient'].colors as [string, string]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <SponsorBlock />
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* Course label in pink */}
          <Text style={styles.courseLabel}>{cls.courseLabel}</Text>

          {/* About */}
          <Text style={styles.sectionTitle}>About:</Text>
          <Text style={styles.aboutText}>{cls.about}</Text>

          {/* Trainer */}
          <Text style={styles.trainerHeading}>Trainer</Text>

          <Pressable
            style={styles.teacherCard}
            onPress={onTeacher}
            accessibilityRole="button"
            accessibilityLabel={`ver perfil de ${cls.teacher.name}`}
          >
            <PhotoCircle size={52} initials={cls.teacher.initials} ring={false} />
            <Text style={styles.teacherName}>
              {cls.teacher.name} / {cls.teacher.role}
            </Text>
            <ChevronRightIcon />
          </Pressable>
        </View>
      </ScrollView>

      {/* ── CTA fixed at bottom ── */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        {countdown ? (
          <View style={styles.countdown}>
            <Text style={styles.countdownLabel}>{cls.countdownLabel}</Text>
            <Text style={styles.countdownValue}>{cls.countdownValue}</Text>
          </View>
        ) : (
          <Pressable
            style={styles.ctaBtn}
            onPress={onEnter}
            accessibilityRole="button"
            accessibilityLabel={cls.ctaLabel}
          >
            <Text style={styles.ctaBtnText}>{cls.ctaLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const HERO_HEIGHT = 150;

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
  scroll:     { paddingTop: 20 },

  // Hero card
  heroCard: {
    marginHorizontal: LAYOUT.screenPadding,
    height: HERO_HEIGHT,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
  },
  sponsorMark: {
    width: 64,
    height: 64,
  },
  sponsorText: {
    gap: 0,
  },
  sponsorLine1: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700' as const,
    fontSize: 18,
    color: '#1a1a1a',
    lineHeight: 22,
  },
  sponsorLine2: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700' as const,
    fontSize: 18,
    color: '#1a1a1a',
    lineHeight: 22,
  },
  sponsorLine3: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: '#1a1a1a',
    lineHeight: 17,
  },

  // Body
  body: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 20,
    gap: 6,
  },
  courseLabel: {
    fontFamily: FONTS.archivoBoldItalic,
    //fontWeight: '700' as const,
    fontSize: 18,
    color: PITLANE_PINK,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700' as const,
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  aboutText: {
    ...TEXT.body,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.85)',
  },
  trainerHeading: {
    fontFamily: FONTS.archivoBoldItalic,
    //fontWeight: '700' as const,
    fontSize: 18,
    color: AERO_SKY,
    marginTop: 16,
    marginBottom: 8,
  },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(10,20,70,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  teacherName: {
    flex: 1,
    fontFamily: FONTS.interSemiBold,
    //fontWeight: '600' as const,
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.1,
  },

  // CTA
  ctaWrap: {
    position: 'absolute',
    left: LAYOUT.screenPadding,
    right: LAYOUT.screenPadding,
    bottom: 0,
  },
  ctaBtn: {
    height: 56,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: AERO_SKY,
  },
  ctaBtnText: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700' as const,
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.2,
  },

  // Countdown
  countdown: {
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(30,30,38,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownLabel: {
    fontSize: 10,
    letterSpacing: 1.6,
    fontFamily: FONTS.interBold,
    //fontWeight: '800' as const,
    color: 'rgba(255,255,255,0.55)',
  },
  countdownValue: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    //fontStyle: 'italic' as const,
    //fontWeight: '800' as const,
    fontSize: 22,
    color: '#fff',
    letterSpacing: 0.5,
    marginTop: 1,
  },
});
