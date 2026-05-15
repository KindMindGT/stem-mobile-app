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

export default function HomeScreen({ onTabChange } : { onTabChange: (id: string) => void }) {
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
