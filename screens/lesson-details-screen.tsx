import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BulletItem from '../components/bullet-item';
import GradientButton from '../components/gradient-button';
import GradientText from '../components/gradient-text';
import IconButton from '../components/icon-button';
import ImgPlaceholder from '../components/image-placeholder';
import PhotoCircle from '../components/photo-circle';
import Pill from '../components/pill';
import SmallCapsHeader from '../components/small-caps-header';
import { CARBON_SHADOW, GRADIENTS } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';
import { useLanguage } from '../contexts/LanguageContext';

const HERO_HEIGHT = 280;
const FEATURED_CLASS = {
  id: 'c-aero-2-3',
  label: 'NIVEL 2 · CLASE 3',
  title: 'Aerodinámica para Karting',
  pills: ['08:30 — 11:00', 'Hub Zona 10', 'Nivel 2'],
  about:
    'Aprenderás cómo el aire se mueve sobre un kart y cómo pequeños cambios en la carrocería afectan la velocidad. Construiremos alerones de cartón y los probaremos en el túnel de viento del Hub Zona 10.',
  teacher: { initials: 'AS', name: 'Andrea Solís', role: 'Ingeniera de pista' },
  bringList: [
    { icon: 'notebook', label: 'Cuaderno y lápiz' },
    { icon: 'bottle', label: 'Botella de agua' },
    { icon: 'ruler', label: 'Regla de 30 cm' },
  ],
  heroLabel: 'foto · clase de aerodinámica',
  countdownLabel: 'DISPONIBLE EN',
  countdownValue: '02:14:33',
  ctaLabel: 'Entrar a la clase',
};

type Props = {
  classId: string;
  countdown?: boolean;
  onBack: () => void;
  onTeacher: () => void;
  onEnter: () => void;
};

export default function ClassDetailScreen({ classId, countdown = false, onBack, onTeacher, onEnter }: Props) {
  const { t } = useLanguage();
  // TODO: look up class data by classId when a real data layer is available
  const cls = {
    ...FEATURED_CLASS,
    heroLabel: t.lessonDetail.photoLabel,
    countdownLabel: t.lesson.availableIn,
    ctaLabel: t.lesson.enterClass,
  };
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <ImgPlaceholder label={cls.heroLabel} tone="orange" radius={0} />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.45)',
              'rgba(0,0,0,0)',
              'rgba(8,8,11,0)',
              'rgba(8,8,11,0.92)',
            ]}
            locations={[0, 0.3, 0.5, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <IconButton
            icon="back"
            onPress={onBack}
            style={styles.backBtn}
            accessibilityLabel={t.common.back}
          />
          <View style={styles.heroText}>
            <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.heroLabel}>
              {cls.label}
            </GradientText>
            <Text style={styles.heroTitle}>{cls.title}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.pills}>
            {cls.pills.map((p) => (
              <Pill key={p} label={p} />
            ))}
          </View>

          <SmallCapsHeader>{t.lesson.about}</SmallCapsHeader>
          <Text style={styles.about}>{cls.about}</Text>

          <SmallCapsHeader>{t.lesson.teacher}</SmallCapsHeader>
          <Pressable
            style={styles.teacherCard}
            onPress={onTeacher}
            accessibilityRole="button"
            accessibilityLabel={t.lesson.viewProfile.replace('{name}', cls.teacher.name)}
          >
            <PhotoCircle size={56} initials={cls.teacher.initials} ring={false} />
            <View style={styles.teacherText}>
              <Text style={styles.teacherName}>{cls.teacher.name}</Text>
              <Text style={styles.teacherRole}>{cls.teacher.role}</Text>
            </View>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 5 L16 12 L9 19"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>

          <SmallCapsHeader>{t.lesson.whatToBring}</SmallCapsHeader>
          <View style={styles.bullets}>
            {cls.bringList.map((b) => (
              <BulletItem key={b.icon} icon={b.icon as "notebook" | "bottle" | "ruler"} label={b.label} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaWrap}>
        {countdown ? (
          <View style={styles.countdown}>
            <Text style={styles.countdownLabel}>{cls.countdownLabel}</Text>
            <Text style={styles.countdownValue}>{cls.countdownValue}</Text>
          </View>
        ) : (
          <GradientButton label={cls.ctaLabel} onPress={onEnter} height={60} radius={18} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: CARBON_SHADOW,
    overflow: 'hidden',
  },
  scrollWrap: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 120,
  },
  hero: {
    height: HERO_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  backBtn: {
    position: 'absolute',
    top: LAYOUT.safeTop,
    left: 18,
  },
  heroText: {
    position: 'absolute',
    left: LAYOUT.screenPadding,
    right: LAYOUT.screenPadding,
    bottom: 14,
  },
  heroLabel: {
    fontSize: 10,
    letterSpacing: 1.8,
    fontFamily: FONTS.interBold,
    fontWeight: '800',
  },
  heroTitle: {
    ...TEXT.h1,
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.6,
    marginTop: 4,
  },
  body: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 18,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  about: {
    ...TEXT.body,
  },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(20,20,26,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  teacherText: {
    flex: 1,
  },
  teacherName: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 18,
    color: '#fff',
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  teacherRole: {
    ...TEXT.bodyMuted,
    marginTop: 2,
  },
  bullets: {
    gap: 10,
  },
  ctaWrap: {
    position: 'absolute',
    left: LAYOUT.edgePadding,
    right: LAYOUT.edgePadding,
    bottom: LAYOUT.tabBarBottom,
  },
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
    fontWeight: '800',
    color: 'rgba(255,255,255,0.55)',
  },
  countdownValue: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 22,
    color: '#fff',
    letterSpacing: 0.5,
    marginTop: 1,
    fontVariant: ['tabular-nums'],
  },
});
