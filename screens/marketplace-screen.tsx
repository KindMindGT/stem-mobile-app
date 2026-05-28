import { TONE_RAMP } from '@/theme/tones';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import GradientHeader from '../components/gradient-header';
import ProductTile from '../components/product-title';
import TabBar from '../components/tab-bar';
import { CARBON_SHADOW } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';
import { FONTS } from '../theme/typography';
import { useLanguage } from '../contexts/LanguageContext';

const GRID_GAP = 12;
const TILE_HEIGHT = 228;
export const PRODUCT_CHIPS = [
  { id: 'all', label: 'Todo' },
  { id: 'merch', label: 'Merch' },
  { id: 'kits', label: 'Kits' },
  { id: 'eventos', label: 'Eventos' },
];

export const PRODUCTS = [
  { id: 'p1', name: 'Kit de\nArduino', price: 'Q 350.00', tone: 'pink' },
  { id: 'p2', name: 'Hoodie\nApex 2026', price: 'Q 220.00', tone: 'orange' },
  { id: 'p3', name: 'Cuaderno STEM', price: 'Q 85.00', tone: 'blue' },
  { id: 'p4', name: 'Kit de\nsoldadura', price: 'Q 480.00', tone: 'purple' },
  { id: 'p5', name: 'Gorra\nbordada', price: 'Q 120.00', tone: 'pink' },
  { id: 'p6', name: 'Entrada · Hackatón', price: 'Q 150.00', tone: 'orange' },
];

type Props = {
  onTabChange: (tabId: string) => void;
  onOpenProduct?: (product: typeof PRODUCTS[0]) => void;
};

export default function MarketplaceScreen({ onTabChange, onOpenProduct }: Props) {
  const { t } = useLanguage();
  const [active, setActive] = useState('all');
  const { width } = useWindowDimensions();
  const itemWidth = Math.floor((width - LAYOUT.screenPadding * 2 - GRID_GAP) / 2);

  return (
    <View style={styles.screen}>
      <GradientHeader title={t.marketplace.title} variant="primary-gradient-2" />

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {[
          { id: 'all', label: t.marketplace.all },
          { id: 'merch', label: t.marketplace.merch },
          { id: 'kits', label: t.marketplace.kits },
          { id: 'eventos', label: t.marketplace.events },
        ].map((c) => {
            const isActive = c.id === active;
            return (
              <Pressable
                key={c.id}
                onPress={() => setActive(c.id)}
                accessibilityRole="button"
                accessibilityLabel={c.label}
                style={[
                  styles.chip,
                  isActive ? styles.chipActiveShadow : styles.chipInactive,
                ]}
              >
                {isActive && (
                  <LinearGradient
                    colors={['#ff1f7a', '#ff7a1a']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={[StyleSheet.absoluteFill, styles.chipFill]}
                  />
                )}
                <Text style={styles.chipText}>{c.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.grid}>
          {PRODUCTS.map((p) => (
            <Pressable
              key={p.id}
              style={{ width: itemWidth }}
              onPress={() => onOpenProduct && onOpenProduct(p)}
              accessibilityRole="button"
              accessibilityLabel={p.name.replace('\n', ' ')}
            >
              <ProductTile
                height={TILE_HEIGHT}
                tone={p.tone as keyof typeof TONE_RAMP}
                name={p.name}
                price={p.price}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <TabBar active="market" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: CARBON_SHADOW,
    overflow: 'hidden',
  },
  scrollWrap: {
    flex: 1,
  },
  scroll: {
    paddingBottom: LAYOUT.scrollBottomWithTabs,
  },
  chipsRow: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 10,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  chipInactive: {
    backgroundColor: 'rgba(20,20,26,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActiveShadow: {
    ...SHADOWS.pinkChip,
  },
  chipFill: {
    borderRadius: 99,
  },
  chipText: {
    fontSize: 13,
    fontFamily: FONTS.interBold,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  grid: {
    marginTop: 16,
    paddingHorizontal: LAYOUT.screenPadding,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});
