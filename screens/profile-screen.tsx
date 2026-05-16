import GradientHeader from '@/components/gradient-header';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from '../components/icon-button';
import PhotoCircle from '../components/photo-circle';
import Pill from '../components/pill';
import ScheduleRow from '../components/schedule-row';
import SettingRow from '../components/setting-row';
import SmallCapsHeader from '../components/small-caps-header';
import TabBar from '../components/tab-bar';
import { GRADIENTS, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

const HEADER_GRAD = GRADIENTS['blue-gradient'];
const STUDENT = {
  initials: 'MR',
  name: 'Mateo Ramírez',
  levelLabel: 'NIVEL 2 · ESTUDIANTE',
  pills: ['📍 Hub Zona 10', '14 años', 'Apex desde 2024'],
  stats: [
    { value: '24', label: 'CLASES', tone: 'pink' },
    { value: '7', label: 'LOGROS', tone: 'orange' },
    { value: '92%', label: 'ASIST.', tone: 'blue' },
  ],
  progress: {
    label: 'PROGRESO NIVEL 2',
    value: '12 / 16',
    pct: 0.75,
    hint: 'Te faltan 4 clases para pasar al Nivel 3.',
  },
  upcoming: [
    {
      id: 'su1',
      time1: '14 MAY',
      time2: '08:30',
      session: 'NIVEL 2 · CLASE 3',
      name: 'Aerodinámica Básica',
    },
    {
      id: 'su2',
      time1: '21 MAY',
      time2: '08:30',
      session: 'NIVEL 2 · CLASE 4',
      name: 'Suspensión y Geometría',
    },
    {
      id: 'su3',
      time1: '28 MAY',
      time2: '14:00',
      session: 'TALLER ABIERTO',
      name: 'Telemetría 101',
    },
  ],
  team: {
    name: 'Lunar Boys',
    members: ['Facundo Casse', 'Juan P. Rodas', 'Fredy Bressani', 'Daniel Castaneda'],
  },
  badges: [
    { id: 'b1', label: 'Primer\ndiseño', tone: 'pink' },
    { id: 'b2', label: 'Asistencia\nperfecta', tone: 'orange' },
    { id: 'b3', label: '10 clases\ncompletas', tone: 'blue' },
    { id: 'b4', label: 'Trabajo\nen equipo', tone: 'purple' },
  ],
  settings: [
    { id: 'edit', label: 'Editar perfil' },
    { id: 'notif', label: 'Notificaciones' },
    { id: 'help', label: 'Ayuda y soporte' },
    { id: 'logout', label: 'Cerrar sesión', danger: true },
  ],
};

const noop = () => {};

type Props = {
  onTabChange: (tab: string) => void;
  onOpenClass: (id: string) => void;
  onLogout: () => void;
};

export default function ProfileScreen({ onTabChange, onOpenClass, onLogout }: Props) {
  const [teamExpanded, setTeamExpanded] = useState(false);
  const settingHandlers = {
    edit: noop,
    notif: noop,
    help: noop,
    logout: onLogout,
  };
  const insets = useSafeAreaInsets();
  const scrollBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;
  
  return (
    <View style={styles.screen}>
      <GradientHeader title="My Profile" variant="blue-gradient" />

      <View style={styles.headerRow}>
        <IconButton icon="settings" variant="translucent" accessibilityLabel="ajustes" onPress={() => {}} />
        <IconButton
          icon="logout"
          variant="translucent"
          onPress={onLogout}
          accessibilityLabel="cerrar sesión"
        />
      </View>

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={[styles.scroll, { paddingBottom: scrollBottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileBlock}>
          <PhotoCircle size={108} initials={STUDENT.initials} />
          <Text style={styles.name}>{STUDENT.name}</Text>
          {
            /*
          <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.metaLabel}>
            {STUDENT.levelLabel}
          </GradientText>
            */
          }
          <View style={styles.pillRow}>
            {STUDENT.pills.map((p) => (
              <Pill key={p} label={p} size="sm" />
            ))}
          </View>
        </View>

        {/* ── Team card ── */}
        <View style={styles.teamCard}>
          <Pressable
            style={styles.teamHeader}
            onPress={() => setTeamExpanded(v => !v)}
            accessibilityRole="button"
            accessibilityLabel={teamExpanded ? 'ocultar equipo' : 'ver equipo'}
          >
            <View style={styles.teamNameRow}>
              <Text style={styles.teamLabel}>EQUIPO</Text>
              <Text style={styles.teamName}>{STUDENT.team.name}</Text>
            </View>
            <View style={styles.teamMembersToggle}>
              <Text style={styles.teamMembersLabel}>MIEMBROS</Text>
              <Text style={[styles.teamChevron, teamExpanded && styles.teamChevronUp]}>
                {'›'}
              </Text>
            </View>
          </Pressable>

          {teamExpanded && (
            <View style={styles.memberList}>
              {STUDENT.team.members.map((member) => (
                <View key={member} style={styles.memberChip}>
                  <Text style={styles.memberName}>{member}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Stats card ── */}
        {
          /*
        <View style={styles.statsCard}>
          {STUDENT.stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <StatColumn value={s.value} label={s.label} tone={s.tone as any} />
              {i < STUDENT.stats.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{STUDENT.progress.label}</Text>
            <Text style={styles.progressVal}>{STUDENT.progress.value}</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[PITLANE_PINK, BURNOUT_ORANGE]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.progressFill, { width: `${STUDENT.progress.pct * 100}%` }]}
            />
          </View>
          <Text style={styles.progressHint}>{STUDENT.progress.hint}</Text>
        </View>
          */
        }

        { /* ── Upcoming classes ── */ }
        <View style={styles.section}>
          <SmallCapsHeader top={0} bottom={4}>MIS PRÓXIMAS CLASES</SmallCapsHeader>
        </View>
        {STUDENT.upcoming.map((row, i) => (
          <ScheduleRow
            key={row.id}
            id={row.id}
            time1={row.time1}
            time2={row.time2}
            session={row.session}
            name={row.name}
            last={i === STUDENT.upcoming.length - 1}
            onPress={onOpenClass}
          />
        ))}

        { /* ── Badges ── */ }
        { 
          /*
        <View style={styles.section}>
          <SmallCapsHeader top={0} bottom={10}>LOGROS RECIENTES</SmallCapsHeader>
          <View style={styles.badges}>
            {STUDENT.badges.map((b) => (
              <BadgeCard key={b.id} label={b.label} tone={b.tone as any} />
            ))}
          </View>
        </View>
          */
        }

        <View style={styles.section}>
          <SmallCapsHeader top={0} bottom={10}>CUENTA</SmallCapsHeader>
          {STUDENT.settings.map((s) => (
            <SettingRow
              key={s.id}
              label={s.label}
              danger={s.danger}
              onPress={settingHandlers[s.id as keyof typeof settingHandlers]}
            />
          ))}
        </View>
      </ScrollView>

      <TabBar active="user" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
    overflow: 'hidden',
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LAYOUT.headerHeight,
  },
  headerRow: {
    //height: LAYOUT.headerHeight,
    paddingTop: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...TEXT.h2,
    fontSize: 22,
    letterSpacing: -0.3,
  },
  scrollWrap: {
    flex: 1,
  },
  scroll: {
    paddingBottom: LAYOUT.scrollBottomWithTabs,
  },
  profileBlock: {
    alignItems: 'center',
    paddingTop: 18,
    paddingHorizontal: LAYOUT.screenPadding,
  },
  name: {
    marginTop: 14,
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 28,
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 30,
    textAlign: 'center',
  },
  metaLabel: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800',
  },
  pillRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  statsCard: {
    marginTop: 12,
    marginHorizontal: LAYOUT.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  progressCard: {
    marginTop: 12,
    marginHorizontal: LAYOUT.screenPadding,
    padding: 16,
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  progressLabel: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
  },
  progressVal: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.4,
  },
  progressTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
  },
  progressHint: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: FONTS.interMedium,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
  },
  section: {
    paddingHorizontal: LAYOUT.screenPadding,
    marginTop: 24,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  // ── Team card ──────────────────────────────────────────────────────────────
  teamCard: {
    marginTop: 22,
    marginHorizontal: LAYOUT.screenPadding,
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    overflow: 'hidden',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  teamNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  teamLabel: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800' as const,
    color: 'rgba(255,255,255,0.55)',
  },
  teamName: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 15,
    color: '#fff',
    letterSpacing: -0.2,
  },
  teamMembersToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  teamMembersLabel: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800' as const,
    color: 'rgba(255,255,255,0.55)',
  },
  teamChevron: {
    fontSize: 18,
    color: '#fff',
    transform: [{ rotate: '90deg' }],
    lineHeight: 20,
  },
  teamChevronUp: {
    transform: [{ rotate: '-90deg' }],
  },
  memberList: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 8,
  },
  memberChip: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(10,30,90,0.5)',
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  memberName: {
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.1,
  },
});
