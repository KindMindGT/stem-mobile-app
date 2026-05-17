import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GradientHeader from '../components/gradient-header';
import GradientText from '../components/gradient-text';
import RaceCard from '../components/race-card';
import TabBar from '../components/tab-bar';
import { GRADIENTS, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

const STRIP_EDGE_PADDING = 33;
const UPCOMING_RACES = [
  {
    id: 'r1',
    left: { flagCode: 'JP', name: 'Dynamis\nRacing' },
    right: { flagCode: 'KR', name: 'Goldcrest\nRacing' },
    start: '13:00 (SGT)',
    date: 'Sat 11 July',
  },
  {
    id: 'r2',
    left: { flagCode: 'DE', name: 'Nordring\nGP' },
    right: { flagCode: 'JP', name: 'Sakura\nApex' },
    start: '15:30 (CEST)',
    date: 'Sat 18 July',
  },
];
const SPONSOR_COUNT = 6;
const SPONSOR_ACTIVE_INDEX = 1;

<<<<<<< Updated upstream
export default function HomeScreen({ onTabChange } : { onTabChange: (id: string) => void }) {
=======
const NEWS = [
  { id: 'n1', image: require('../assets/images/news-inscripciones.png'), date: '15 - 30 Agosto 2026', location: 'HQ zona 14' },
  { id: 'n2', image: require('../assets/images/news-inscripciones.png'), date: '1 - 15 Sept 2026',    location: 'Campus Norte' },
  { id: 'n3', image: require('../assets/images/news-inscripciones.png'), date: '20 Sept 2026',         location: 'Lab B, zona 10' },
];

const GRID_ITEMS = [
  { id: 'schedule', label: 'schedule',  tab: 'home',   action: null },
  { id: 'profile',  label: 'profile',   tab: 'home',   action: null },
  { id: 'hub',      label: 'hub',       tab: null,     action: 'hub' },
  { id: 'activity', label: 'activity',  tab: 'home',   action: null },
  { id: 'events',   label: 'events',    tab: null,     action: 'events' },
  { id: 'whoswho',  label: "who's who", tab: 'home',   action: null },
  { id: 'code',     label: 'code',      tab: 'home',   action: null },
  { id: 'surveys',  label: 'surveys',   tab: 'home',   action: null },
  { id: 'nukunem',  label: 'nukunem',   tab: 'home',   action: null },
];

// ─── Grid icons ───────────────────────────────────────────────────────────────

function GridIcon({ id }: { id: string }) {
  const s = '#fff';
  const sw = 1.5;
  switch (id) {
    case 'schedule':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Rect x={5} y={8} width={30} height={27} rx={4} stroke={s} strokeWidth={sw} />
          <Path d="M13 4 L13 12" stroke={s} strokeWidth={2} strokeLinecap="round" />
          <Path d="M27 4 L27 12" stroke={s} strokeWidth={2} strokeLinecap="round" />
          <Path d="M5 17 H35" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Rect x={11} y={22} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
          <Rect x={18} y={22} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
          <Rect x={25} y={22} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
          <Rect x={11} y={29} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
          <Rect x={18} y={29} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
          <Rect x={25} y={29} width={4} height={4} rx={1} stroke={s} strokeWidth={1.2} />
        </Svg>
      );
    case 'profile':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Circle cx={25} cy={7} r={3.5} stroke={s} strokeWidth={sw} />
          <Path d="M23 11 L17 20" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M21 14 L28 10" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M20 17 L14 21" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M17 20 L22 30" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M17 20 L10 28" stroke={s} strokeWidth={sw} strokeLinecap="round" />
        </Svg>
      );
    case 'hub':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Path d="M20 4 C13.4 4 8 9.4 8 16 C8 24 20 36 20 36 C20 36 32 24 32 16 C32 9.4 26.6 4 20 4 Z" stroke={s} strokeWidth={sw} />
          <Circle cx={20} cy={16} r={5} stroke={s} strokeWidth={sw} />
        </Svg>
      );
    case 'activity':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Path d="M8 6 L8 32" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Path d="M8 32 L34 32" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Rect x={11} y={24} width={5} height={8} rx={1.5} stroke={s} strokeWidth={1.3} />
          <Rect x={19} y={18} width={5} height={14} rx={1.5} stroke={s} strokeWidth={1.3} />
          <Rect x={27} y={12} width={5} height={20} rx={1.5} stroke={s} strokeWidth={1.3} />
          <Path d="M11 22 L21 14 L33 10" stroke={s} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'events':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Path d="M5 15 C5 13.3 6.3 12 8 12 L32 12 C33.7 12 35 13.3 35 15 L35 17 C33.3 17 32 18.3 32 20 C32 21.7 33.3 23 35 23 L35 25 C35 26.7 33.7 28 32 28 L8 28 C6.3 28 5 26.7 5 25 L5 23 C6.7 23 8 21.7 8 20 C8 18.3 6.7 17 5 17 Z" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
          <Path d="M14 12 L14 28" stroke={s} strokeWidth={1.2} strokeLinecap="round" strokeDasharray="2.5 2" />
          <Path d="M18 18 H30" stroke={s} strokeWidth={1.2} strokeLinecap="round" />
          <Path d="M18 22 H26" stroke={s} strokeWidth={1.2} strokeLinecap="round" />
        </Svg>
      );
    case 'whoswho':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Circle cx={24} cy={12} r={5} stroke={s} strokeWidth={sw} />
          <Path d="M14 34 C14 27.4 18.5 24 24 24 C29.5 24 34 27.4 34 34" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          <Circle cx={16} cy={12} r={5} stroke={s} strokeWidth={sw} fill="#0D1B4B" />
          <Path d="M6 34 C6 27.4 10.5 24 16 24 C21.5 24 26 27.4 26 34" stroke={s} strokeWidth={sw} strokeLinecap="round" fill="#0D1B4B" />
        </Svg>
      );
    case 'code':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Path d="M9 4 L27 4 L35 12 L35 36 C35 37.1 34.1 38 33 38 L9 38 C7.9 38 7 37.1 7 36 L7 6 C7 4.9 7.9 4 9 4 Z" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
          <Path d="M27 4 L27 12 L35 12" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
          <Path d="M13 19 H27" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
          <Path d="M13 25 H27" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
          <Path d="M13 31 H21" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
        </Svg>
      );
    case 'surveys':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Rect x={7} y={8} width={26} height={30} rx={3.5} stroke={s} strokeWidth={sw} />
          <Path d="M15 8 L15 5 C15 3.9 15.9 3 17 3 L23 3 C24.1 3 25 3.9 25 5 L25 8" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
          <Path d="M14 22 L18 27 L26 17" stroke={s} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'nukunem':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          <Path d="M6 20 C6 14.5 9.5 11 14 11 C16.5 11 18.5 12.5 20 14.5 C21.5 12.5 23.5 11 26 11 C30.5 11 34 14.5 34 20 C34 25.5 30.5 29 26 29 C23.5 29 21.5 27.5 20 25.5 C18.5 27.5 16.5 29 14 29 C9.5 29 6 25.5 6 20 Z" stroke={s} strokeWidth={sw} />
          <Path d="M17.5 14 C18.5 16 18.5 24 17.5 26" stroke="#0D1B4B" strokeWidth={3} strokeLinecap="round" />
          <Path d="M22.5 14 C21.5 16 21.5 24 22.5 26" stroke="#0D1B4B" strokeWidth={3} strokeLinecap="round" />
          <Path d="M8.5 20 C8.5 16 10.5 13.5 14 13.5 C16 13.5 17.5 15 18.5 17 C17.5 19 16 20.5 16 20 C16 21 17.5 21.5 18.5 23 C17.5 25 16 26.5 14 26.5 C10.5 26.5 8.5 24 8.5 20 Z" stroke={s} strokeWidth={1} />
          <Path d="M31.5 20 C31.5 24 29.5 26.5 26 26.5 C24 26.5 22.5 25 21.5 23 C22.5 21 24 20 24 20 C24 20 22.5 19 21.5 17 C22.5 15 24 13.5 26 13.5 C29.5 13.5 31.5 16 31.5 20 Z" stroke={s} strokeWidth={1} />
        </Svg>
      );
    default:
      return null;
  }
}

// ─── Small icons ──────────────────────────────────────────────────────────────

function ChevronUpIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M6 15 L12 9 L18 15" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PinIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" stroke="#fff" strokeWidth={1.8} />
      <Circle cx={12} cy={8} r={2} stroke="#fff" strokeWidth={1.8} />
    </Svg>
  );
}
function PlusIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5 V19 M5 12 H19" stroke="rgba(255,255,255,0.6)" strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}
function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} />
      <Path d="M16.5 16.5 L21 21" stroke="rgba(255,255,255,0.5)" strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
function CalendarIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4} width={18} height={17} rx={3} stroke="#fff" strokeWidth={1.6} />
      <Path d="M3 9 H21" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M8 2 V6 M16 2 V6" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_GAP = 10;
const GRID_COLS = 3;
const CARD_WIDTH = Dimensions.get('window').width - LAYOUT.screenPadding * 2;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen({
  onTabChange,
  onOpenEvents,
  onOpenHub,
}: {
  onTabChange: (id: string) => void;
  onOpenEvents: () => void;
  onOpenHub: () => void;
}) {
  const [activeNews, setActiveNews] = useState(0);
  const newsScrollRef = useRef<ScrollView>(null);

  const handleNewsScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveNews(index);
  };

  const handleGridPress = (item: typeof GRID_ITEMS[0]) => {
    if (item.action === 'events') {
      onOpenEvents();
    } else if (item.action === 'hub') {
      onOpenHub();
    } else if (item.tab) {
      onTabChange(item.tab);
    }
  };

>>>>>>> Stashed changes
  return (
    <View style={styles.screen}>
      <GradientHeader title="Event guide" variant="blue-gradient" />
      <View style={styles.heroBlock}>
        <Text style={styles.heroTitle}>Grand Final</Text>
        <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.heroSubtitle}>
          Tokyo 2026
        </GradientText>
        <Text style={styles.upcomingLabel}>UPCOMING RACES</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.strip}
        contentContainerStyle={styles.stripContent}
      >
        {UPCOMING_RACES.map((race) => (
          <RaceCard key={race.id} separator pair={race} />
        ))}
      </ScrollView>

      <View style={styles.sponsorWrap}>
        <View style={styles.sponsorBlock}>
          <View style={styles.sponsorHeader}>
            <Text style={styles.sponsorTitle}>SPONSORS</Text>
            <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.viewAll}>
              VIEW ALL
            </GradientText>
          </View>
          <View style={styles.sponsorBox}>
            <View style={styles.nordfield}>
              <Text style={styles.nordfieldText}>NORDFIELD</Text>
            </View>
          </View>
          <View style={styles.dots}>
            {Array.from({ length: SPONSOR_COUNT }).map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === SPONSOR_ACTIVE_INDEX && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </View>

      <TabBar active="home" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
    overflow: 'hidden',
  },
  heroBlock: {
    paddingTop: 28,
    paddingHorizontal: LAYOUT.screenPadding,
    alignItems: 'center',
  },
  heroTitle: {
    ...TEXT.display,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 22,
    marginTop: 4,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  upcomingLabel: {
    marginTop: 22,
    fontSize: 11,
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONTS.interBold,
    fontWeight: '700',
  },
  strip: {
    marginTop: 14,
    flexGrow: 0,
  },
  stripContent: {
    paddingLeft: STRIP_EDGE_PADDING,
    paddingRight: STRIP_EDGE_PADDING,
    gap: 14,
  },
  sponsorWrap: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 18,
  },
  sponsorBlock: {
    backgroundColor: 'rgba(13,71,161,0.6)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  sponsorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sponsorTitle: {
    fontSize: 10,
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: FONTS.interBold,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '800',
    fontFamily: FONTS.interBold,
  },
  sponsorBox: {
    marginTop: 10,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(13,71,161,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nordfield: {
    backgroundColor: '#1a8eff',
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 7,
    borderRadius: 6,
  },
  nordfieldText: {
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic',
    fontWeight: '900',
    color: '#fff',
    fontSize: 22,
    letterSpacing: 0.4,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
});
