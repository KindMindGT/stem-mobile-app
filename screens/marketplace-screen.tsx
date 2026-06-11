import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';
import GradientHeader from '../components/gradient-header';
import TabBar from '../components/tab-bar';
import { PRODUCTS, type Product } from '../constants/products';
import { useFavorites } from '../hooks/use-favorites';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

export { PRODUCTS } from '../constants/products';

const GRID_GAP = 14;

export const PRODUCT_CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
];

type Props = {
  onTabChange: (tabId: string) => void;
  onOpenProduct?: (product: Product) => void;
};

function SearchBar({ value, onChangeText }: { value: string; onChangeText: (t: string) => void }) {
  return (
    <View style={styles.searchWrap}>
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={styles.searchIcon}>
        <Circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
        <Path d="M16.5 16.5 L21 21" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinecap="round" />
      </Svg>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor="rgba(255,255,255,0.55)"
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? '#FFD700' : 'none'}
        stroke={filled ? '#FFD700' : 'rgba(255,255,255,0.85)'}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShopProductTile({
  imageUrl,
  name,
  width,
  isFav,
  onToggleFav,
  onPress,
}: {
  imageUrl: string;
  name: string;
  width: number;
  isFav: boolean;
  onToggleFav: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={name}
      style={[styles.tile, { width, height: width }]}
    >
      {/* Product image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.tileImage}
        resizeMode="cover"
        accessibilityLabel={name}
      />

      {/* Bottom gradient + title overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.72)']}
        style={styles.tileGradient}
        pointerEvents="none"
      />
      <View style={styles.tileMeta} pointerEvents="none">
        <Text style={styles.tileName} numberOfLines={2}>{name}</Text>
      </View>

      {/* Star button — top-right corner */}
      <Pressable
        onPress={(e) => { e.stopPropagation(); onToggleFav(); }}
        accessibilityRole="button"
        accessibilityLabel={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        hitSlop={8}
        style={styles.starBtn}
      >
        <StarIcon filled={isFav} />
      </Pressable>
    </Pressable>
  );
}

export default function MarketplaceScreen({ onTabChange, onOpenProduct }: Props) {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const { width } = useWindowDimensions();
  const itemWidth = Math.floor((width - LAYOUT.screenPadding * 2 - GRID_GAP) / 2);
  const { isFavorite, toggle } = useFavorites();

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = search.trim() === '' || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = active === 'all' || (active === 'favorites' && isFavorite(p.id));
    return matchesSearch && matchesTab;
  });

  return (
    <View style={styles.screen}>
      <GradientHeader title="Shop" variant="stem-header-gradient" />

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <View style={styles.searchSection}>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        {/* Category chips */}
        <View style={styles.chipsRow}>
          {PRODUCT_CHIPS.map((c) => {
            const isFavChip = c.id === 'favorites';
            const isActive = c.id === active;
            return (
              <Pressable
                key={c.id}
                onPress={() => setActive(c.id)}
                accessibilityRole="button"
                accessibilityLabel={c.label}
                style={[styles.chip, { width: itemWidth }]}
              >
                {isFavChip ? (
                  <LinearGradient
                    colors={isActive ? ['#C2185B', '#E91E8C'] : ['rgba(194,24,91,0.5)', 'rgba(233,30,140,0.5)']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={[StyleSheet.absoluteFill, styles.chipFill]}
                  />
                ) : (
                  <View style={[StyleSheet.absoluteFill, styles.chipFill, isActive ? styles.chipActiveBg : styles.chipInactiveBg]} />
                )}
                <Text style={styles.chipText}>{c.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Product grid */}
        <View style={styles.grid}>
          {filtered.length === 0 && active === 'favorites' ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>Aún no tienes favoritos.</Text>
              <Text style={styles.emptySubText}>Toca la estrella ★ en cualquier producto para guardarlo aquí.</Text>
            </View>
          ) : (
            filtered.map((p) => (
              <ShopProductTile
                key={p.id}
                imageUrl={p.imageUrl}
                name={p.name}
                width={itemWidth}
                isFav={isFavorite(p.id)}
                onToggleFav={() => toggle(p.id)}
                onPress={() => onOpenProduct && onOpenProduct(p)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <TabBar active="market" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1565C0',
    overflow: 'hidden',
  },
  scrollWrap: { flex: 1 },
  scroll: { paddingBottom: LAYOUT.scrollBottomWithTabs },

  /* Search */
  searchSection: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 20,
    paddingBottom: 4,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchIcon: { opacity: 0.85 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: FONTS.interRegular,
    padding: 0,
  },

  /* Chips */
  chipsRow: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 18,
    paddingBottom: 6,
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  chip: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  chipFill: { borderRadius: 12 },
  chipActiveBg: { backgroundColor: '#312783' },
  chipInactiveBg: { backgroundColor: 'rgba(49,39,131,0.45)' },
  chipText: {
    fontSize: 16,
    fontFamily: FONTS.interBold,
    //fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },

  /* Grid */
  grid: {
    marginTop: 10,
    paddingHorizontal: LAYOUT.screenPadding,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },

  /* Tile */
  tile: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0D1B3E',
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  tileGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  tileMeta: {
    position: 'absolute',
    left: 10,
    right: 36,  // leave space for star
    bottom: 10,
  },
  tileName: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700',
    fontSize: 11,
    color: '#fff',
    lineHeight: 14,
    letterSpacing: 0.1,
  },

  /* Star */
  starBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Empty favorites */
  emptyWrap: {
    width: '100%',
    paddingTop: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  emptySubText: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});
