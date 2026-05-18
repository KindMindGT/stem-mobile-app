import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import { STEM_BG } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

// ─── Data ─────────────────────────────────────────────────────────────────────

const HUBS = [
  {
    id: 'h1',
    name: 'HQ zona 14',
    address: '10 avenida 11-83',
    hours: 'horario 8am - 5pm',
  },
  {
    id: 'h2',
    name: 'Colegio Equity',
    address: '2da calle 11-83 zona 13',
    hours: 'horario 8am - 5pm',
  },
  {
    id: 'h3',
    name: 'Colegio Internacional CAES',
    address: 'Fraijanes finca 2',
    hours: 'horario 8am - 5pm',
  },
  {
    id: 'h4',
    name: 'Colegio Interamericano',
    address: 'Colonia Lourdes zona 16',
    hours: 'horario 8am - 5pm',
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

export default function HubScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <GradientHeader title="Hub" variant="blue-gradient" />

      {/* Back button */}
      <Pressable style={styles.backBtn} onPress={onBack} hitSlop={12}>
        <BackIcon />
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {HUBS.map((hub) => (
          <Pressable
            key={hub.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <Text style={styles.cardName}>{hub.name}</Text>
            <Text style={styles.cardAddress}>{hub.address}</Text>
            <Text style={styles.cardHours}>{hub.hours}</Text>
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
    paddingTop: 32,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: 'rgba(130,180,255,0.35)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardName: {
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  cardAddress: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  cardHours: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
});
