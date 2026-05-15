import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import DayChip, { DAY_CHIP_SIZE } from '../components/day-chip';
import GradientHeader from '../components/gradient-header';
import ScheduleRow from '../components/schedule-row';
import TabBar from '../components/tab-bar';
import { BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';
import { TEXT } from '../theme/typography';

const FAB_SIZE = 58;
const PEEK_OFFSET = -(DAY_CHIP_SIZE - LAYOUT.screenPadding);
export const DAYS = [
  { dow: 'FRI', day: '10' },
  { dow: 'SAT', day: '11' },
  { dow: 'SUN', day: '12', active: true },
  { dow: 'MON', day: '13' },
  { dow: 'TUE', day: '14' },
];

export const SCHEDULE_ROWS = [
  {
    id: 's1',
    time1: '08:30',
    time2: '11:00',
    session: 'SESSION 2 / RACE 1',
    name: 'Asia Pacific',
    done: true,
  },
  {
    id: 's2',
    time1: '08:30',
    time2: '11:00',
    session: 'SESSION 2 / RACE 2',
    name: 'Europe\n& Middle East',
    done: true,
  },
  {
    id: 's3',
    time1: '08:30',
    time2: '11:00',
    session: 'SESSION 2 / RACE 3',
    name: 'Americas',
  },
];

type Props = {
  onTabChange: (tab: string) => void;
  onOpenClass: (id: string) => void;
};

export default function ScheduleScreen({ onTabChange, onOpenClass }: Props) {
  return (
    <View style={styles.screen}>
      <GradientHeader title="Schedule" variant="blue-gradient" />

      <View style={styles.tabs}>
        <View style={styles.tab}>
          <Text style={[styles.tabText, styles.tabTextActive]}>MY SCHEDULE</Text>
          <LinearGradient
            colors={[PITLANE_PINK, BURNOUT_ORANGE]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.tabUnderline}
          />
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>ALL SESSIONS</Text>
        </View>
      </View>

      <View style={styles.dayPicker}>
        {DAYS.map((d, i) => {
          const isFirst = i === 0;
          const isLast = i === DAYS.length - 1;
          const margin =
            isFirst ? { marginLeft: PEEK_OFFSET } :
            isLast ? { marginRight: PEEK_OFFSET } : null;
          return (
            <View key={d.dow + d.day} style={margin}>
              <DayChip dow={d.dow} day={d.day} active={d.active} />
            </View>
          );
        })}
      </View>

      <View style={styles.rows}>
        {SCHEDULE_ROWS.map((row) => (
          <ScheduleRow
            key={row.id}
            time1={row.time1}
            time2={row.time2}
            session={row.session}
            name={row.name}
            done={row.done}
            onPress={onOpenClass}
          />
        ))}
      </View>

      <Pressable
        style={styles.fab}
        accessibilityRole="button"
        accessibilityLabel="agregar sesión"
      >
        <LinearGradient
          colors={['#ff2a8a', '#c01880']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
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
            <Path
              d="M12 5 V19 M5 12 H19"
              stroke="#fff"
              strokeWidth={2.6}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>

      <TabBar active="cal" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
    overflow: 'hidden',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 14,
    position: 'relative',
  },
  tabText: {
    color: 'rgba(255,255,255,0.55)',
    ...(TEXT.tabLabel as any),
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '800',
  },
  tabUnderline: {
    position: 'absolute',
    left: '22%',
    right: '22%',
    bottom: -1,
    height: 3,
    borderRadius: 99,
  },
  dayPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
    gap: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rows: {
    marginTop: 6,
  },
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
});
