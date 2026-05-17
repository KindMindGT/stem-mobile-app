import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import DayChip from '../components/day-chip';
import GradientHeader from '../components/gradient-header';
import ScheduleRow from '../components/schedule-row';
import TabBar from '../components/tab-bar';
import { BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type Session = {
  id: string;
  title: string;
  time: string;
  duration: string;
  teacher: { name: string; initials: string };
  done?: boolean;
};

// Sessions keyed by ISO date string 'yyyy-MM-dd'
export type SessionMap = Record<string, Session[]>;

// ─── Session data ──────────────────────────────────────────────────────────────
// Add or remove entries here; the calendar adapts automatically.

export const SESSIONS: SessionMap = {
  '2026-05-10': [
    { id: 's-fri-1', title: 'PMI', time: '02:30', duration: '1.5hrs', teacher: { name: 'Pablo Melendez', initials: 'PM' }, done: true },
    { id: 's-fri-2', title: 'Growth', time: '02:30', duration: '1.5hrs', teacher: { name: 'Ines Ordonez', initials: 'IO' }, done: true },
    { id: 's-fri-3', title: 'Design + Engineer', time: '02:30', duration: '1.5hrs', teacher: { name: 'Gabriel Rodriguez', initials: 'GR' } },
  ],
  '2026-05-11': [
    { id: 's-sat-1', title: 'Aerodinámica Básica', time: '08:30', duration: '2hrs', teacher: { name: 'Andrea Solís', initials: 'AS' } },
    { id: 's-sat-2', title: 'Telemetría 101', time: '11:00', duration: '1.5hrs', teacher: { name: 'Pablo Melendez', initials: 'PM' } },
  ],
  '2026-05-12': [
    { id: 's-sun-1', title: 'Suspensión y Geometría', time: '09:00', duration: '2hrs', teacher: { name: 'Andrea Solís', initials: 'AS' } },
  ],
  '2026-05-13': [
    { id: 's-mon-1', title: 'Aerodynamic workshop', time: '02:30', duration: '1.5hrs', teacher: { name: 'Hasso Tangelmann', initials: 'HT' } },
    { id: 's-mon-2', title: 'Race Strategy', time: '14:00', duration: '1hr', teacher: { name: 'Ines Ordonez', initials: 'IO' } },
  ],
  '2026-05-14': [
    { id: 's-tue-1', title: 'Gran Final', time: '10:00', duration: '3hrs', teacher: { name: 'Gabriel Rodriguez', initials: 'GR' } },
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const dateKey = (d: Date) => format(d, 'yyyy-MM-dd');

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Full heading label: "Viernes, 10 Sept" */
const dayLabel = (d: Date) =>
  capitalize(format(d, "EEEE, d MMM", { locale: es }));

/** Month + year heading: "Septiembre 2025" */
const monthLabel = (d: Date) =>
  capitalize(format(d, 'MMMM yyyy', { locale: es }));

// ─── SessionRow ────────────────────────────────────────────────────────────────

function SessionRow({
  session,
  isLast,
  onPress,
}: {
  session: Session;
  isLast: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={session.title}
      style={({ pressed }) => [
        styles.sessionRow,
        !isLast && styles.sessionDivider,
        pressed && styles.sessionPressed,
      ]}
    >
      {
        /*
        <PhotoCircle size={46} initials={session.teacher.initials} ring={false} />
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{session.title}</Text>
          <Text style={styles.sessionMeta}>{session.time} · {session.duration}</Text>
          <Text style={styles.sessionTeacher}>{session.teacher.name}</Text>
        </View>
        {session.done && <View style={styles.doneDot} />}
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
  );
}

// ─── SessionsBlock ─────────────────────────────────────────────────────────────

function SessionsBlock({
  date,
  sessions,
  onOpenClass,
}: {
  date: Date;
  sessions: Session[];
  onOpenClass: (id: string) => void;
}) {
  return (
    <View>
      <Text style={styles.dateHeading}>{dayLabel(date)}</Text>
      <View style={styles.sessionsCard}>
        {sessions.map((s, i) => (
          <SessionRow
            key={s.id}
            session={s}
            isLast={i === sessions.length - 1}
            onPress={() => onOpenClass(s.id)}
          />
        ))}
      </View>
    </View>
  );
}

// ─── MonthNavigator ────────────────────────────────────────────────────────────

function MonthNavigator({
  current,
  onPrev,
  onNext,
}: {
  current: Date;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.monthNav}>
      <Pressable onPress={onPrev} hitSlop={12} accessibilityLabel="mes anterior">
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
      <Text style={styles.monthLabel}>{monthLabel(current)}</Text>
      <Pressable onPress={onNext} hitSlop={12} accessibilityLabel="mes siguiente">
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
    </View>
  );
}

// ─── MyScheduleView ────────────────────────────────────────────────────────────

function MyScheduleView({ onOpenClass }: { onOpenClass: (id: string) => void }) {
  const today = startOfToday();
  const [viewMonth, setViewMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const calendarRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;

  // All days in the viewed month
  const daysInMonth = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(viewMonth), end: endOfMonth(viewMonth) }),
    [viewMonth],
  );

  // Sessions for the selected day
  const selectedSessions = SESSIONS[dateKey(selectedDate)] ?? [];

  // When the month changes, keep selectedDate inside the new month
  const handlePrevMonth = useCallback(() => {
    setViewMonth(prev => {
      const next = subMonths(prev, 1);
      setSelectedDate(d => isSameMonth(d, prev) ? startOfMonth(next) : d);
      return next;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewMonth(prev => {
      const next = addMonths(prev, 1);
      setSelectedDate(d => isSameMonth(d, prev) ? startOfMonth(next) : d);
      return next;
    });
  }, []);

  // Scroll calendar to the selected chip
  useEffect(() => {
    const idx = daysInMonth.findIndex(d => isSameDay(d, selectedDate));
    if (idx >= 0) {
      calendarRef.current?.scrollTo({
        x: idx * (DAY_CHIP_WIDTH + DAY_CHIP_GAP),
        animated: true,
      });
    }
  }, [selectedDate, daysInMonth]);

  return (
    <View style={styles.flex}>
      <MonthNavigator
        current={viewMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      {/* Horizontal day strip */}
      <ScrollView
        ref={calendarRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarRow}
      >
        {daysInMonth.map((d) => {
          const key = dateKey(d);
          const hasSessions = Boolean(SESSIONS[key]?.length);
          return (
            <DayChip
              key={key}
              dow={format(d, 'EEE', { locale: es }).toUpperCase().slice(0, 3)}
              day={format(d, 'd')}
              selected={isSameDay(d, selectedDate)}
              today={isToday(d)}
              hasSessions={hasSessions}
              onPress={() => setSelectedDate(d)}
            />
          );
        })}
      </ScrollView>

      {/* Sessions for selected day */}
      <ScrollView
        style={styles.flex}
        contentContainerStyle={{ paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateHeading}>{dayLabel(selectedDate)}</Text>
        {selectedSessions.length === 0 ? (
          <Text style={styles.emptyText}>Sin sesiones para este día.</Text>
        ) : (
          <View style={styles.sessionsCard}>
            {selectedSessions.map((s, i) => (
              <SessionRow
                key={s.id}
                session={s}
                isLast={i === selectedSessions.length - 1}
                onPress={() => onOpenClass(s.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ─── AllSessionsView ───────────────────────────────────────────────────────────

function AllSessionsView({ onOpenClass }: { onOpenClass: (id: string) => void }) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + LAYOUT.tabBarBottom + LAYOUT.tabBarHeight + 16;

  // Sort the entries by date and render each group
  const sortedDays = useMemo(
    () =>
      Object.keys(SESSIONS)
        .sort()
        .map(key => ({ date: new Date(key + 'T00:00:00'), sessions: SESSIONS[key] })),
    [],
  );

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{ paddingBottom }}
      showsVerticalScrollIndicator={false}
    >
      {sortedDays.map(({ date, sessions }) => (
        <SessionsBlock
          key={dateKey(date)}
          date={date}
          sessions={sessions}
          onOpenClass={onOpenClass}
        />
      ))}
    </ScrollView>
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

      <TabBar active="cal" onChange={onTabChange} />
    </View>
  );
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const DAY_CHIP_WIDTH = 60;
const DAY_CHIP_GAP   = 8;

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen:  { flex: 1, backgroundColor: STEM_BG, overflow: 'hidden' },
  flex:    { flex: 1 },

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
  tabText:       { color: 'rgba(255,255,255,0.45)', ...(TEXT.tabLabel as object) },
  tabTextActive: { color: '#fff' },
  tabUnderline: {
    position: 'absolute',
    left: '22%', right: '22%', bottom: -1,
    height: 3, borderRadius: 99,
  },

  // Month navigator
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 14,
    paddingBottom: 4,
  },
  monthLabel: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 17,
    color: '#fff',
    letterSpacing: -0.2,
  },

  // Calendar strip
  calendarRow: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: 10,
    gap: DAY_CHIP_GAP,
  },

  // Date heading
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
    paddingVertical: 12,
    gap: 12,
  },
  sessionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.10)',
  },
  sessionPressed:  { backgroundColor: 'rgba(255,255,255,0.06)' },
  sessionInfo:     { flex: 1 },
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
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
  },

  // Empty state
  emptyText: {
    ...TEXT.bodyMuted,
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 8,
  },
  rows: {
    marginTop: 6,
    flex: 1,
  },
});
