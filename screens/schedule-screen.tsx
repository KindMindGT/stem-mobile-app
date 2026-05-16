import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import DayChip from '../components/day-chip';
import GradientHeader from '../components/gradient-header';
import ScheduleRow from '../components/schedule-row';
import TabBar from '../components/tab-bar';
import { BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';
import { FONTS, TEXT } from '../theme/typography';
// ─── Data ─────────────────────────────────────────────────────────────────────

export type Session = {
  id: string;
  title: string;
  time: string;
  duration: string;
  teacher: { name: string; initials: string };
  done?: boolean;
};

export type Day = {
  id: string;       // unique key, e.g. '2025-09-10'
  dow: string;      // 'FRI'
  day: string;      // '10'
  month: string;    // 'Sept'
  label: string;    // 'Friday, Sept 10'
  sessions: Session[];
};

export const SCHEDULE: Day[] = [
  {
    id: '2025-09-10',
    dow: 'FRI', day: '10', month: 'Sept',
    label: 'Friday, Sept 10',
    sessions: [
      { id: 's-fri-1', title: 'PMI', time: '02:30', duration: '1.5hrs', teacher: { name: 'Pablo Melendez',  initials: 'PM' }, done: true },
      { id: 's-fri-2', title: 'Growth', time: '02:30', duration: '1.5hrs', teacher: { name: 'Ines Ordonez',   initials: 'IO' }, done: true },
      { id: 's-fri-3', title: 'Design + Engineer', time: '02:30', duration: '1.5hrs', teacher: { name: 'Gabriel Rodriguez', initials: 'GR' } },
    ],
  },
  {
    id: '2025-09-11',
    dow: 'SAT', day: '11', month: 'Sept',
    label: 'Saturday, Sept 11',
    sessions: [
      { id: 's-sat-1', title: 'Aerodinámica Básica', time: '08:30', duration: '2hrs', teacher: { name: 'Andrea Solís', initials: 'AS' } },
      { id: 's-sat-2', title: 'Telemetría 101', time: '11:00', duration: '1.5hrs', teacher: { name: 'Pablo Melendez', initials: 'PM' } },
    ],
  },
  {
    id: '2025-09-12',
    dow: 'SUN', day: '12', month: 'Sept',
    label: 'Sunday, Sept 12',
    sessions: [
      { id: 's-sun-1', title: 'Suspensión y Geometría', time: '09:00', duration: '2hrs', teacher: { name: 'Andrea Solís', initials: 'AS' } },
    ],
  },
  {
    id: '2025-09-13',
    dow: 'MON', day: '13', month: 'Sept',
    label: 'Monday, Sept 13',
    sessions: [
      { id: 's-mon-1', title: 'Aerodynamic workshop', time: '02:30', duration: '1.5hrs', teacher: { name: 'Hasso Tangelmann', initials: 'HT' } },
      { id: 's-mon-2', title: 'Race Strategy', time: '14:00', duration: '1hr', teacher: { name: 'Ines Ordonez', initials: 'IO' } },
    ],
  },
  {
    id: '2025-09-14',
    dow: 'TUE', day: '14', month: 'Sept',
    label: 'Tuesday, Sept 14',
    sessions: [
      { id: 's-tue-1', title: 'Gran Final', time: '10:00', duration: '3hrs', teacher: { name: 'Gabriel Rodriguez', initials: 'GR' } },
    ],
  },
];

const FAB_SIZE = 58;

// ─── Session row (image style) ─────────────────────────────────────────────────

function SessionRow({ session, isLast, onPress }: { session: Session; isLast: boolean; onPress: () => void }) {
  return (
    <>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={session.title}
        style={({ pressed }) => [styles.sessionRow, !isLast && styles.sessionDivider, pressed && styles.sessionPressed]}
      >
        {
        /*
          
       <PhotoCircle size={46} initials={session.teacher.initials} ring={false} />
       <View style={styles.sessionInfo}>
         <Text style={styles.sessionTitle}>{session.title}</Text>
         <Text style={styles.sessionMeta}>{session.time} · {session.duration}</Text>
         <Text style={styles.sessionTeacher}>{session.teacher.name}</Text>
       </View>
        */
        }
        <View style={styles.rows}>
          <ScheduleRow
            time1={session.time}
            time2={session.duration}
            session={session.title}
            name={session.teacher.name}
            done={session.done}
          />
        </View>
        {/* {session.done && <View style={styles.doneDot} />} */}
      </Pressable>
    </>
  );
}

// ─── All-sessions grouped view ────────────────────────────────────────────────

function AllSessionsView({ onOpenClass }: { onOpenClass: (id: string) => void }) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.allSessionsContent, { paddingBottom }]}
      showsVerticalScrollIndicator={false}
    >
      {SCHEDULE.map((day) => (
        <View key={day.id}>
          {/* Date heading */}
          <Text style={styles.dateHeading}>{day.label}</Text>
          {/* Sessions card */}
          <View style={styles.sessionsCard}>
            {day.sessions.map((s, i) => (
              <SessionRow
                key={s.id}
                session={s}
                isLast={i === day.sessions.length - 1}
                onPress={() => onOpenClass(s.id)}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── My-schedule view (calendar + day sessions) ────────────────────────────────

function MyScheduleView({ onOpenClass }: { onOpenClass: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState(SCHEDULE[0].id);
  const calendarRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;

  const selectedDay = SCHEDULE.find(d => d.id === selectedId) ?? SCHEDULE[0];

  return (
    <View style={styles.flex}>
      {/* Horizontal calendar */}
      <ScrollView
        ref={calendarRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarRow}
      >
        {SCHEDULE.map((day) => (
          <DayChip
            key={day.id}
            dow={day.dow}
            day={day.day}
            selected={day.id === selectedId}
            onPress={() => setSelectedId(day.id)}
          />
        ))}
      </ScrollView>

      {/* Sessions for selected day */}
      <ScrollView
        //style={styles.flex}
        contentContainerStyle={{ paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateHeading}>{selectedDay.label}</Text>
        {selectedDay.sessions.length === 0 ? (
          <Text style={styles.emptyText}>Sin sesiones para este día.</Text>
        ) : (
          <View style={styles.sessionsCard}>
            {selectedDay.sessions.map((s, i) => (
              <SessionRow
                key={s.id}
                session={s}
                isLast={i === selectedDay.sessions.length - 1}
                onPress={() => onOpenClass(s.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

type Props = {
  onTabChange: (tab: string) => void;
  onOpenClass: (id: string) => void;
};

type ScreenTab = 'my' | 'all';

export default function ScheduleScreen({ onTabChange, onOpenClass }: Props) {
  const [activeTab, setActiveTab] = useState<ScreenTab>('my');

  return (
    <View style={styles.screen}>
      <GradientHeader title="Schedule" variant="blue-gradient" />

      {/* Inner tabs */}
      <View style={styles.tabs}>
        {(['my', 'all'] as ScreenTab[]).map((t) => {
          const isActive = t === activeTab;
          const label = t === 'my' ? 'MY SCHEDULE' : 'ALL SESSIONS';
          return (
            <Pressable
              key={t}
              style={styles.tab}
              onPress={() => setActiveTab(t)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
              {isActive && (
                <LinearGradient
                  colors={[PITLANE_PINK, BURNOUT_ORANGE]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.tabUnderline}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {activeTab === 'my'
        ? <MyScheduleView onOpenClass={onOpenClass} />
        : <AllSessionsView onOpenClass={onOpenClass} />
      }

      {/* FAB */}
      <Pressable style={styles.fab} accessibilityRole="button" accessibilityLabel="agregar sesión">
        <LinearGradient colors={['#ff2a8a', '#c01880']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <Svg width={FAB_SIZE} height={FAB_SIZE} viewBox={`0 0 ${FAB_SIZE} ${FAB_SIZE}`} style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="fabGlow" cx="45.24" cy="10.44" r="31.9" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#ff8a2a" stopOpacity="1" />
              <Stop offset="0.55" stopColor="#ff8a2a" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width={FAB_SIZE} height={FAB_SIZE} fill="url(#fabGlow)" />
        </Svg>
        <View style={styles.fabIcon} pointerEvents="none">
          <Svg width="26" height="26" viewBox="0 0 24 24">
            <Path d="M12 5 V19 M5 12 H19" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" />
          </Svg>
        </View>
      </Pressable>

      <TabBar active="cal" onChange={onTabChange} />
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  // Inner tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 12,
    position: 'relative',
  },
  tabText: {
    color: 'rgba(255,255,255,0.45)',
    ...(TEXT.tabLabel as object),
  },
  tabTextActive: {
    color: '#fff',
  },
  tabUnderline: {
    position: 'absolute',
    left: '22%',
    right: '22%',
    bottom: -1,
    height: 3,
    borderRadius: 99,
  },

  // Calendar strip
  calendarRow: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: 14,
    gap: 10,
  },

  // Date heading (both views)
  dateHeading: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 20,
    color: '#fff',
    letterSpacing: -0.3,
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 18,
    paddingBottom: 10,
  },

  // Sessions card
  sessionsCard: {
    marginHorizontal: LAYOUT.screenPadding,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    //paddingVertical: 12,
    gap: 12,
  },
  sessionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.10)',
  },
  sessionPressed: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  sessionInfo: {
    flex: 1,
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
  doneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
  },

  // Empty state
  emptyText: {
    ...TEXT.bodyMuted,
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 8,
  },

  // All sessions scroll padding
  allSessionsContent: {
    paddingBottom: 120,
  },

  // FAB
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 28,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: 99,
    overflow: 'hidden',
    ...SHADOWS.fab,
  },
  fabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  rows: {
    marginTop: 6,
    flex: 1,
  },
});
