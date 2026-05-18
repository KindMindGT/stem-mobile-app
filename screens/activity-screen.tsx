import { IconBack } from '@/components/ui/icon-back';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import { BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Data ──────────────────────────────────────────────────────────────────────

type ClassGroup = {
  id: string;
  month: string;       // 'Sept 2026'
  entries: { label: string; count: number }[];
};

const HISTORY: ClassGroup[] = [
  {
    id: 'g1', month: 'Sept 2026',
    entries: [
      { label: 'PMI',               count: 6 },
      { label: 'Recovery',          count: 6 },
      { label: 'Engineer + Design', count: 6 },
      { label: 'Branding',          count: 6 },
    ],
  },
  {
    id: 'g2', month: 'Oct 2026',
    entries: [
      { label: 'PMI',               count: 6 },
      { label: 'Recovery',          count: 6 },
      { label: 'Engineer + Design', count: 6 },
      { label: 'Branding',          count: 6 },
    ],
  },
  {
    id: 'g3', month: 'Nov 2026',
    entries: [
      { label: 'PMI',               count: 6 },
      { label: 'Recovery',          count: 5 },
      { label: 'Engineer + Design', count: 4 },
      { label: 'Branding',          count: 4 },
    ],
  },
];

const TOTAL_CLASSES = HISTORY.reduce(
  (sum, g) => sum + g.entries.reduce((s, e) => s + e.count, 0),
  0,
);

type Achievement = {
  id: string;
  label: string;
  unlocked: boolean;
};

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', label: '1 month of Classes\nin a row',     unlocked: true  },
  { id: 'a2', label: 'Most viewed\nepisode (podcast)',   unlocked: true  },
  { id: 'a3', label: 'September\nbest team',             unlocked: true  },
  { id: 'a4', label: 'Race\nChampion',                   unlocked: false },
  { id: 'a5', label: 'Pit Stop\nMaster',                 unlocked: false },
  { id: 'a6', label: 'Final\nLine',                      unlocked: false },
];

// ─── Achievement icons ─────────────────────────────────────────────────────────

function AchievementIcon({ id, size = 52 }: { id: string; size?: number }) {
  const s = 'rgba(255,255,255,0.85)';
  const sw = 1.4;
  switch (id) {
    case 'a1': // Checkered flag
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Path d="M10 8 L10 40" stroke={s} strokeWidth={sw * 1.2} strokeLinecap="round" />
          <Path d="M10 8 L38 8 L38 26 L10 26 Z" stroke={s} strokeWidth={sw} />
          <Rect x={10} y={8}  width={9} height={9} fill={s} opacity={0.7} />
          <Rect x={28} y={8}  width={9} height={9} fill={s} opacity={0.7} />
          <Rect x={19} y={17} width={9} height={9} fill={s} opacity={0.7} />
        </Svg>
      );
    case 'a2': // Podcast mic
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Rect x={17} y={6} width={14} height={20} rx={7} stroke={s} strokeWidth={sw} />
          <Path d="M10 24 C10 33.9 14.9 38 24 38 C33.1 38 38 33.9 38 24" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Line x1={24} y1={38} x2={24} y2={44} stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Line x1={16} y1={44} x2={32} y2={44} stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Circle cx={21} cy={16} r={2} fill={s} opacity={0.6} />
          <Circle cx={27} cy={16} r={2} fill={s} opacity={0.6} />
        </Svg>
      );
    case 'a3': // Racer helmet
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Path d="M8 28 C8 18 15 10 24 10 C33 10 40 18 40 28 C40 34 38 38 34 40 L14 40 C10 38 8 34 8 28 Z" stroke={s} strokeWidth={sw} />
          <Path d="M8 28 L40 28" stroke={s} strokeWidth={sw} />
          <Path d="M12 28 L12 38" stroke={s} strokeWidth={sw * 0.8} />
          <Path d="M10 32 C12 30 16 30 18 32" stroke={s} strokeWidth={sw * 0.8} strokeLinecap="round" />
          <Ellipse cx={30} cy={24} rx={7} ry={5} stroke={s} strokeWidth={sw * 0.8} opacity={0.6} />
        </Svg>
      );
    case 'a4': // Trophy
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Path d="M16 6 L32 6 L32 26 C32 31.5 28.4 36 24 36 C19.6 36 16 31.5 16 26 Z" stroke={s} strokeWidth={sw} />
          <Path d="M16 12 C10 12 8 18 10 22 C11.5 25 14 26 16 26" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M32 12 C38 12 40 18 38 22 C36.5 25 34 26 32 26" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Line x1={24} y1={36} x2={24} y2={42} stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Line x1={16} y1={42} x2={32} y2={42} stroke={s} strokeWidth={sw} strokeLinecap="round" />
        </Svg>
      );
    case 'a5': // Racing wheel (stopwatch as pit-stop)
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Circle cx={24} cy={26} r={16} stroke={s} strokeWidth={sw} />
          <Circle cx={24} cy={26} r={6}  stroke={s} strokeWidth={sw} />
          <Line x1={24} y1={10} x2={24} y2={6}  stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Line x1={24} y1={20} x2={24} y2={26} stroke={s} strokeWidth={sw * 1.2} strokeLinecap="round" />
          <Line x1={24} y1={26} x2={30} y2={22} stroke={s} strokeWidth={sw}       strokeLinecap="round" />
          <Line x1={20} y1={6}  x2={28} y2={6}  stroke={s} strokeWidth={sw}       strokeLinecap="round" />
        </Svg>
      );
    case 'a6': // Racing flag at finish line
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <Line x1={8}  y1={6}  x2={8}  y2={42} stroke={s} strokeWidth={sw * 1.2} strokeLinecap="round" />
          <Rect x={8}  y={6}  width={6} height={6} fill={s} opacity={0.85} />
          <Rect x={20} y={6}  width={6} height={6} fill={s} opacity={0.85} />
          <Rect x={14} y={12} width={6} height={6} fill={s} opacity={0.85} />
          <Rect x={26} y={12} width={6} height={6} fill={s} opacity={0.85} />
          <Rect x={8}  y={18} width={6} height={6} fill={s} opacity={0.85} />
          <Rect x={20} y={18} width={6} height={6} fill={s} opacity={0.85} />
          <Line x1={4} y1={38} x2={44} y2={38} stroke={s} strokeWidth={sw * 1.4} strokeLinecap="round" />
        </Svg>
      );
    default:
      return null;
  }
}

// ─── Back icon ─────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── History view ──────────────────────────────────────────────────────────────

function HistoryView() {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + 24;

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.historyContent, { paddingBottom }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Total counter */}
      <View style={styles.totalBlock}>
        <Text style={styles.totalNumber}>{TOTAL_CLASSES}</Text>
        <Text style={styles.totalLabel}>total classes</Text>
      </View>

      <View style={styles.dividerLine} />

      {/* Monthly groups */}
      {HISTORY.map((group, gi) => (
        <View key={group.id}>
          <Text style={styles.monthHeading}>{group.month}</Text>
          {group.entries.map((entry, ei) => (
            <View
              key={entry.label}
              style={[
                styles.historyRow,
                ei < group.entries.length - 1 && styles.historyRowDivider,
              ]}
            >
              <Text style={styles.historyLabel}>{entry.label}</Text>
              <Text style={styles.historyCount}>{entry.count} Classes</Text>
            </View>
          ))}
          {gi < HISTORY.length - 1 && <View style={styles.dividerLine} />}
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Achievements view ─────────────────────────────────────────────────────────

function AchievementsView() {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + 24;

  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked);
  const milestones = ACHIEVEMENTS.filter(a => !a.unlocked);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.achievementsContent, { paddingBottom }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Latest achievements */}
      <Text style={styles.achieveSection}>Latest Achievements</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.achieveRow}
      >
        {unlocked.map(a => (
          <View key={a.id} style={styles.achieveCard}>
            <LinearGradient
              colors={['#1a6edc', '#24c88a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.achieveIconWrap}>
              <AchievementIcon id={a.id} size={52} />
            </View>
            <Text style={styles.achieveLabel}>{a.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Milestones grid */}
      <Text style={styles.achieveSection}>Milestones</Text>

      <View style={styles.milestonesGrid}>
        {milestones.map(a => (
          <View key={a.id} style={styles.milestoneCell}>
            <AchievementIcon id={a.id} size={48} />
            <Text style={styles.milestoneLabel}>{a.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

type ScreenTab = 'history' | 'achievements';

type Props = {
  onBack: () => void;
};

export default function ActivityScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<ScreenTab>('history');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <GradientHeader title="Activity" variant="blue-gradient" />

      {/* Back button */}
      <Pressable
        style={[styles.backBtn, { top: insets.top + 12 }]}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="atrás"
      >
        <IconBack />
      </Pressable>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['history', 'achievements'] as ScreenTab[]).map(t => {
          const isActive = t === activeTab;
          const label = t === 'history' ? 'History' : 'Achievements';
          return (
            <Pressable
              key={t}
              //style={styles.tab}
              onPress={() => setActiveTab(t)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {label}
              </Text>
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

      {activeTab === 'history'
        ? <HistoryView />
        : <AchievementsView />
      }
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const ACHIEVE_CARD_W = 140;

const styles = StyleSheet.create({
  screen:  { flex: 1, backgroundColor: STEM_BG },
  flex:    { flex: 1 },

  backBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    gap: 32,
    marginTop: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 12,
    position: 'relative',
  },
  tabText: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 17,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: -0.2,
  },
  tabTextActive: {
    color: '#fff',
  },
  tabUnderline: {
    position: 'absolute',
    left: '20%', right: '20%', bottom: -1,
    height: 3, borderRadius: 99,
  },

  // ── History
  historyContent: {
    paddingTop: 8,
  },
  totalBlock: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  totalNumber: {
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic' as const,
    fontWeight: '900' as const,
    fontSize: 80,
    lineHeight: 84,
    color: '#fff',
    letterSpacing: -3,
  },
  totalLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: LAYOUT.screenPadding,
    marginVertical: 8,
  },
  monthHeading: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontStyle: 'italic' as const,
    fontSize: 18,
    color: '#fff',
    letterSpacing: -0.3,
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 14,
    paddingBottom: 6,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: 11,
  },
  historyRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  historyLabel: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 15,
    color: '#fff',
  },
  historyCount: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic' as const,
    fontWeight: '700' as const,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },

  // ── Achievements
  achievementsContent: {
    paddingTop: 18,
    paddingHorizontal: LAYOUT.screenPadding,
    gap: 4,
  },
  achieveSection: {
    ...TEXT.h2,
    fontSize: 22,
    lineHeight: 26,
    color: '#fff',
    marginBottom: 14,
    marginTop: 8,
  } as any,
  achieveRow: {
    gap: 12,
    paddingBottom: 8,
    paddingRight: LAYOUT.screenPadding,
  },
  achieveCard: {
    width: ACHIEVE_CARD_W,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  achieveIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  achieveLabel: {
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600' as const,
    fontSize: 12,
    color: '#fff',
    lineHeight: 16,
  },

  // ── Milestones grid
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
  },
  milestoneCell: {
    width: '30%',
    flexGrow: 1,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  milestoneLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 14,
  },
});
