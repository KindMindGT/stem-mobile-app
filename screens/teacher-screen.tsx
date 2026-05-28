import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GradientText from '../components/gradient-text';
import IconButton from '../components/icon-button';
import PhotoCircle from '../components/photo-circle';
import ScheduleRow from '../components/schedule-row';
import { CARBON_SHADOW, GRADIENTS } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';
import { useLanguage } from '../contexts/LanguageContext';

const TEACHER = {
  initials: 'AS',
  name: 'Andrea Solís',
  role: 'INGENIERA DE PISTA',
  bio: 'Andrea diseña suspensiones de karts profesionales desde 2018. Estudió Ingeniería Mecánica en la USAC y ahora lidera el equipo de pista de Apex en Ciudad de Guatemala.',
  upcoming: [
    {
      id: 'tu1',
      time_start: '14 MAY',
      duration: '08:30',
      session: 'NIVEL 2 · CLASE 3',
      name: 'Aerodinámica Básica',
    },
    {
      id: 'tu2',
      time_start: '21 MAY',
      duration: '08:30',
      session: 'NIVEL 2 · CLASE 4',
      name: 'Suspensión y Geometría',
    },
    {
      id: 'tu3',
      time_start: '28 MAY',
      duration: '14:00',
      session: 'TALLER ABIERTO',
      name: 'Telemetría 101',
    },
  ],
};

type Props = {
  classId: string; // reserved for future data lookup by class
  onBack: () => void;
};

export default function TeacherProfileScreen({ classId, onBack } : Props) {
  const { t } = useLanguage();
  return (
    <View style={styles.screen}>
      <IconButton
        icon="back"
        onPress={onBack}
        style={styles.backBtn}
        variant="ghost"
        accessibilityLabel={t.common.back}
      />

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <PhotoCircle size={140} initials={TEACHER.initials} />
          <Text style={styles.name}>{TEACHER.name}</Text>
          <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.role}>
            {TEACHER.role}
          </GradientText>
          <Text style={styles.bio}>{TEACHER.bio}</Text>
        </View>

        <View style={styles.upcoming}>
          <Text style={styles.sectionLabel}>{t.teacher.upcomingWith.replace('{name}', TEACHER.name)}</Text>
          {TEACHER.upcoming.map((row, i) => (
            <ScheduleRow
              id={row.id}
              key={row.id}
              initials={TEACHER.initials}
              time_start={row.time_start}
              duration={row.duration}
              session={row.session}
              name={row.name}
              last={i === TEACHER.upcoming.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: CARBON_SHADOW,
    overflow: 'hidden',
  },
  backBtn: {
    position: 'absolute',
    top: LAYOUT.safeTop,
    left: 18,
    zIndex: 10,
  },
  scrollWrap: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  hero: {
    paddingTop: 110,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  name: {
    ...TEXT.h1,
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: -0.6,
    marginTop: 22,
    textAlign: 'center',
  },
  role: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800',
  },
  bio: {
    ...TEXT.body,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.75)',
    maxWidth: 320,
    textAlign: 'center',
  },
  upcoming: {
    marginTop: 28,
  },
  sectionLabel: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingBottom: 8,
    fontSize: 10,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONTS.interBold,
    fontWeight: '800',
  },
});
