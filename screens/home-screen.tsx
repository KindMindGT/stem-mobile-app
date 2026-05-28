import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { AERO_SKY, APEX_GLACIER, BURNOUT_ORANGE, PITLANE_PINK, STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Static data ─────────────────────────────────────────────────────────────

const COMING_UP = [
  { id: 'c1', title: 'Branding',          date: 'Friday 30 Sept', time: '2:30 pm' },
  { id: 'c2', title: 'Engineer + Design', date: 'Friday 30 Sept', time: '2:30 pm' },
  { id: 'c3', title: 'Engineer + Design', date: 'Friday 30 Sept', time: '2:30 pm' },
  { id: 'c4', title: 'PMI',               date: 'Friday 30 Sept', time: '2:30 pm' },
];

const NEWS = [
  {
    id: 'n1',
    image: require('../assets/images/noti1.jpeg'),
    headline: 'Final SR 2025',
    description: 'Se llevó acabo la final de SR 2025 en Singapur. Donde el gran ganador fue el equipo Lunar de Australia',
    date: '2025',
    location: 'Singapur',
  },
  {
    id: 'n2',
    image: require('../assets/images/noti2.png'),
    headline: 'Nuevo mentor en Ingeniería',
    description: 'Hasso Tangelmann, quién participó en el entorno técnico del TWR Porsche WSC-95, el prototipo ganador de las 24 Horas de Le Mans de 1997, se une al equipo como mentor en el área de Ingeniería',
    date: '2025',
    location: 'STEM Racing',
  },
  {
    id: 'n3',
    image: require('../assets/images/noti3.jpg'),
    headline: 'Guatemala se une a STEM Racing',
    description: 'Guatemala se incorpora al circuito Stem Racing Global, convirtiéndose en el 3er país de Centro América en unirse',
    date: '2025',
    location: 'Centro América',
  },
];

// Grid items — destination is a tab id; for now all redirect to 'home'
const GRID_ITEMS = [
  { id: 'schedule', label: 'schedule', tab: 'home' },
  { id: 'profile',  label: 'profile',  tab: 'home' },
  { id: 'hub',      label: 'hub',      tab: 'home' },
  { id: 'activity', label: 'activity', tab: 'home' },
  { id: 'events',   label: 'events',   tab: 'home' },
  { id: 'whoswho',  label: "who's who", tab: 'home' },
  { id: 'code',     label: 'code',     tab: 'home' },
  { id: 'surveys',  label: 'surveys',  tab: 'home' },
  { id: 'nukunem',  label: 'nukunem',  tab: 'home' },
];

// ─── Grid icons (SVG) ─────────────────────────────────────────────────────────

function GridIcon({ id }: { id: string }) {
  const s = '#fff';
  const sw = 1.5;
  switch (id) {

    case 'schedule':
      return (
        <Image
          source={require('../assets/images/Calendar.png')}
          style={{ width: 52, height: 52 }}
          resizeMode="contain"
        />
      );

    case 'profile':
      return (
        <Image
          source={require('../assets/images/Profile.png')}
          style={{ width: 52, height: 52 }}
          resizeMode="contain"
        />
      );

    // Location pin
    case 'hub':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          {/* Outer pin shape */}
          <Path
            d="M20 4 C13.4 4 8 9.4 8 16 C8 24 20 36 20 36 C20 36 32 24 32 16 C32 9.4 26.6 4 20 4 Z"
            stroke={s}
            strokeWidth={sw}
          />
          {/* Inner circle */}
          <Circle cx={20} cy={16} r={5} stroke={s} strokeWidth={sw} />
        </Svg>
      );

    // Bar chart with trend line
    case 'activity':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          {/* Y axis */}
          <Path d="M8 6 L8 32" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          {/* X axis */}
          <Path d="M8 32 L34 32" stroke={s} strokeWidth={sw} strokeLinecap="round" />
          {/* Bar 1 (short) */}
          <Rect x={11} y={24} width={5} height={8} rx={1.5} stroke={s} strokeWidth={1.3} />
          {/* Bar 2 (medium) */}
          <Rect x={19} y={18} width={5} height={14} rx={1.5} stroke={s} strokeWidth={1.3} />
          {/* Bar 3 (tall) */}
          <Rect x={27} y={12} width={5} height={20} rx={1.5} stroke={s} strokeWidth={1.3} />
          {/* Trend line */}
          <Path d="M11 22 L21 14 L33 10" stroke={s} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );

    // Ticket (angled, with notch)
    case 'events':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          {/* Ticket body — slightly rotated appearance, horizontal */}
          <Path
            d="M5 15 C5 13.3 6.3 12 8 12 L32 12 C33.7 12 35 13.3 35 15 L35 17 C33.3 17 32 18.3 32 20 C32 21.7 33.3 23 35 23 L35 25 C35 26.7 33.7 28 32 28 L8 28 C6.3 28 5 26.7 5 25 L5 23 C6.7 23 8 21.7 8 20 C8 18.3 6.7 17 5 17 Z"
            stroke={s}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          {/* Stub divider */}
          <Path d="M14 12 L14 28" stroke={s} strokeWidth={1.2} strokeLinecap="round" strokeDasharray="2.5 2" />
          {/* Lines on main body */}
          <Path d="M18 18 H30" stroke={s} strokeWidth={1.2} strokeLinecap="round" />
          <Path d="M18 22 H26" stroke={s} strokeWidth={1.2} strokeLinecap="round" />
        </Svg>
      );

    // Two people / who's who
    case 'whoswho':
      return (
        <Image
          source={require('../assets/images/Who\u2019s who.png')}
          style={{ width: 52, height: 52 }}
          resizeMode="contain"
        />
      );

    // Document / code file
    case 'code':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          {/* Page with folded corner */}
          <Path
            d="M9 4 L27 4 L35 12 L35 36 C35 37.1 34.1 38 33 38 L9 38 C7.9 38 7 37.1 7 36 L7 6 C7 4.9 7.9 4 9 4 Z"
            stroke={s} strokeWidth={sw} strokeLinejoin="round"
          />
          {/* Folded corner triangle */}
          <Path d="M27 4 L27 12 L35 12" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
          {/* Text lines */}
          <Path d="M13 19 H27" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
          <Path d="M13 25 H27" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
          <Path d="M13 31 H21" stroke={s} strokeWidth={1.4} strokeLinecap="round" />
        </Svg>
      );

    // Clipboard with checkmark
    case 'surveys':
      return (
        <Image
          source={require('../assets/images/Survey.png')}
          style={{ width: 52, height: 52 }}
          resizeMode="contain"
        />
      );

    // Nukunem — two interlocked oval rings (chain link style)
    case 'nukunem':
      return (
        <Svg width={38} height={38} viewBox="0 0 40 40" fill="none">
          {/* Left oval ring */}
          <Path
            d="M6 20 C6 14.5 9.5 11 14 11 C16.5 11 18.5 12.5 20 14.5 C21.5 12.5 23.5 11 26 11 C30.5 11 34 14.5 34 20 C34 25.5 30.5 29 26 29 C23.5 29 21.5 27.5 20 25.5 C18.5 27.5 16.5 29 14 29 C9.5 29 6 25.5 6 20 Z"
            stroke={s} strokeWidth={sw}
          />
          {/* Inner crossing line (link overlap) */}
          <Path
            d="M17.5 14 C18.5 16 18.5 24 17.5 26"
            stroke="#0D1B4B" strokeWidth={3} strokeLinecap="round"
          />
          <Path
            d="M22.5 14 C21.5 16 21.5 24 22.5 26"
            stroke="#0D1B4B" strokeWidth={3} strokeLinecap="round"
          />
          {/* Left inner oval */}
          <Path
            d="M8.5 20 C8.5 16 10.5 13.5 14 13.5 C16 13.5 17.5 15 18.5 17 C17.5 19 16 20.5 16 20 C16 21 17.5 21.5 18.5 23 C17.5 25 16 26.5 14 26.5 C10.5 26.5 8.5 24 8.5 20 Z"
            stroke={s} strokeWidth={1}
          />
          {/* Right inner oval */}
          <Path
            d="M31.5 20 C31.5 24 29.5 26.5 26 26.5 C24 26.5 22.5 25 21.5 23 C22.5 21 24 20 24 20 C24 20 22.5 19 21.5 17 C22.5 15 24 13.5 26 13.5 C29.5 13.5 31.5 16 31.5 20 Z"
            stroke={s} strokeWidth={1}
          />
        </Svg>
      );

    default:
      return null;
  }
}

// ─── Small reusable icons ─────────────────────────────────────────────────────

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

// ─── Screen ───────────────────────────────────────────────────────────────────

type Props = {
  onTabChange: (id: string) => void;
};

export default function HomeScreen({ onTabChange }: Props) {
  const [activeNews, setActiveNews] = useState(0);
  const newsScrollRef = useRef<ScrollView>(null);

  const handleNewsScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveNews(index);
  };

  return (
    <View style={styles.screen}>
      <GradientHeader title="Explore" variant="blue-gradient" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Upcoming ──────────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <View style={styles.sectionIcons}>
            <Pressable style={styles.iconBtn} hitSlop={8}>
              <ChevronUpIcon />
            </Pressable>
            <Pressable style={styles.iconBtn} hitSlop={8}>
              <PinIcon />
            </Pressable>
          </View>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Nothing is currently schedule</Text>
        </View>

        <Pressable style={styles.exploreBtn}>
          <LinearGradient
            colors={[APEX_GLACIER, AERO_SKY]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.exploreBtnText}>Explore</Text>
        </Pressable>

        {/* ── Coming up ─────────────────────────────────────────────────── */}
        <Text style={[styles.sectionTitle, styles.comingUpTitle]}>Coming up</Text>

        <View style={styles.comingUpCard}>
          {COMING_UP.map((item, index) => {
            const isLast = index === COMING_UP.length - 1;
            return (
              <View key={item.id}>
                <View style={styles.comingRow}>
                  <View style={styles.comingRowLeft}>
                    <Text style={styles.comingRowTitle}>{item.title}</Text>
                    <Text style={styles.comingRowSub}>
                      {item.date}{'  ·  '}{item.time}
                    </Text>
                  </View>
                  <Pressable hitSlop={8}>
                    <PlusIcon />
                  </Pressable>
                </View>
                {!isLast && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        {/* ── News ──────────────────────────────────────────────────────── */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <Text style={styles.searchPlaceholder}>Search</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.newsTitle]}>News</Text>

        <ScrollView
          ref={newsScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleNewsScroll}
          decelerationRate="fast"
          style={styles.newsCarousel}
          contentContainerStyle={styles.newsCarouselContent}
        >
          {NEWS.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <Image
                source={item.image}
                style={styles.newsImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', '#000']}
                start={{ x: 0, y: 0.4 }}
                end={{ x: 0, y: 1 }}
                style={styles.newsOverlay}
              >
                <Text style={styles.newsHeadline}>{item.headline}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </LinearGradient>
              <LinearGradient
                colors={[PITLANE_PINK, BURNOUT_ORANGE]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.newsFooter}
              >
                <CalendarIcon />
                <View style={styles.newsFooterText}>
                  <Text style={styles.newsFooterDate}>{item.date}</Text>
                  <Text style={styles.newsFooterLocation}>{item.location}</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dots}>
          {NEWS.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeNews && styles.dotActive]} />
          ))}
        </View>

        {/* ── Explore grid ──────────────────────────────────────────────── */}
        <View style={styles.grid}>
          {GRID_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [styles.gridCell, pressed && styles.gridCellPressed]}
              onPress={() => onTabChange(item.tab)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View style={styles.gridIcon}>
                <GridIcon id={item.id} />
              </View>
              <Text style={styles.gridLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── Partners ──────────────────────────────────────────────────── */}
        <Text style={styles.partnersHeading}>Thank you partners</Text>

        {/* Powered by */}
        <Text style={styles.partnersCategoryLabel}>Powered by</Text>
        <View style={[styles.partnerCard, styles.partnerCardWhite]}>
          <Image
            source={require('../assets/images/shell.jpg')}
            style={styles.partnerLogoImage}
            resizeMode="contain"
          />
        </View>

        {/* Allies */}
        <Text style={styles.partnersCategoryLabel}>allies</Text>
        <View style={styles.partnersGrid2}>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/paleta.webp')}
              style={styles.partnerLogoImageLarge}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/bi.png')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Supported by */}
        <Text style={styles.partnersCategoryLabel}>supported by</Text>
        <View style={styles.partnersGrid2}>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/honda-1596081_1280.webp')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/puma.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/visa.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.partnerCard, styles.partnerCard2, styles.partnerCardWhite]}>
            <Image
              source={require('../assets/images/redbull.jpg')}
              style={styles.partnerLogoImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      <TabBar active="home" onChange={onTabChange} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const GRID_GAP = 10;
const GRID_COLS = 3;
const CARD_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 24,
    paddingBottom: LAYOUT.scrollBottomWithTabs,
  },

  // ── Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    ...TEXT.h2,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: '#fff',
  },
  sectionIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Upcoming empty
  emptyCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderStyle: 'dashed',
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  emptyText: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },

  // ── Explore button
  exploreBtn: {
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  exploreBtnText: {
    ...TEXT.ctaLabel,
    fontSize: 16,
    letterSpacing: 0.4,
    color: '#fff',
  },

  // ── Coming up
  comingUpTitle: { marginBottom: 14 },
  comingUpCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  comingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  comingRowLeft: { flex: 1 },
  comingRowTitle: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    marginBottom: 3,
  },
  comingRowSub: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
  },

  // ── Search
  searchRow: { marginTop: 32, marginBottom: 18 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  searchPlaceholder: {
    fontFamily: FONTS.interRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.45)',
  },

  // ── News
  newsTitle: { marginBottom: 14 },
  newsCarousel: {
    marginHorizontal: -LAYOUT.screenPadding,
  },
  newsCarouselContent: {},
  newsCard: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  newsImage: { width: CARD_WIDTH, height: 260 },
  newsOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  newsHeadline: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginBottom: 6,
  },
  newsDescription: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
  newsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  newsFooterText: { flex: 1 },
  newsFooterDate: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
  newsFooterLocation: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 1,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: { backgroundColor: '#fff' },

  // ── Explore grid
  gridTitle: { marginTop: 32, marginBottom: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    marginTop: 32,
  },
  gridCell: {
    backgroundColor: '#0D1B4B',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 10,
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '32%',
    aspectRatio: 1,
  },
  gridCellPressed: {
    opacity: 0.75,
  },
  gridIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  gridLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },

  // ── Partners
  partnersHeading: {
    ...TEXT.h2,
    fontSize: 20,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  partnersCategoryLabel: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 10,
    marginTop: 4,
  },
  partnerCard: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  partnerCard2: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 0,
  },
  partnerCardShell: {
    backgroundColor: '#F7C300',
  },
  partnerCardWhite: {
    backgroundColor: '#fff',
  },
  partnerCardVisa: {
    backgroundColor: '#1A1F71',
  },
  partnerCardDark: {
    backgroundColor: '#1C2630',
  },
  partnerCardPaleta: {
    backgroundColor: '#C8222A',
  },
  partnerCardBI: {
    backgroundColor: '#003087',
  },
  partnersGrid2: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  partnerLogoImage: {
    width: '100%',
    height: 90,
  },
  partnerLogoImageLarge: {
    width: '100%',
    height: 110,
  },
  partnerLogoText: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700',
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
  },
  partnerLogoTextDark: {
    color: '#111',
  },
});
