import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import { STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

// ─── Data ─────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: 'e1',
    title: "Audi's Year Bootcamp",
    date: 'May 30th',
    location: 'Pitch Learning',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    color: '#7ED4A0', // placeholder image bg
  },
  {
    id: 'e2',
    title: 'Zakura Nationals and Padock Experience',
    date: 'Jan 30th - Feb 2nd',
    location: 'Entrance: Door 15',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    color: '#4A90D9',
  },
  {
    id: 'e3',
    title: 'National Finals 2026',
    date: 'Oct 3rd - Oct 8th',
    location: 'Agencia Mercedez',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    color: '#2C5F8A',
  },
];

// ─── Back icon ────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18 L9 12 L15 6"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

type Props = {
  onBack: () => void;
};

export default function EventsScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <GradientHeader title="Events" variant="blue-gradient" />

      {/* Back button */}
      <Pressable style={styles.backBtn} onPress={onBack} hitSlop={12}>
        <BackIcon />
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {EVENTS.map((event) => (
          <Pressable
            key={event.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            {/* Left: image placeholder */}
            <View style={[styles.cardImage, { backgroundColor: event.color }]} />

            {/* Right: info on gradient */}
            <LinearGradient
              colors={['#95C11F', '#009FE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardContent}
            >
              <Text style={styles.cardTitle}>{event.title}</Text>
              <Text style={styles.cardDate}>{event.date}</Text>
              <Text style={styles.cardLocation}>{event.location}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{event.description}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: STEM_BG,
  },
  backBtn: {
    position: 'absolute',
    top: LAYOUT.safeTop,
    left: LAYOUT.screenPadding,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 28,
    paddingBottom: 40,
    gap: 18,
  },

  // Card
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  cardPressed: {
    opacity: 0.88,
  },
  cardImage: {
    width: 130,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    gap: 3,
  },
  cardTitle: {
    fontFamily: FONTS.archivoBoldItalic,
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    marginBottom: 4,
  },
  cardDate: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  cardLocation: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  cardDesc: {
    fontFamily: FONTS.interRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
});
