import React, { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import GradientHeader from '../components/gradient-header';
import IconButton from '../components/icon-button';
import TabBar from '../components/tab-bar';
import { getProductById } from '../constants/products';
import { LAYOUT } from '../theme/layout';
import { FONTS } from '../theme/typography';

type Props = {
  productId?: string;
  onBack: () => void;
  onAddToCart: () => void;
  onTabChange?: (tabId: string) => void;
};

export default function ProductDetailScreen({ productId, onBack, onAddToCart, onTabChange }: Props) {
  const product = (productId ? getProductById(productId) : undefined) ?? getProductById('p1')!;

  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0] ?? '');

  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;
  const hasSizes  = Array.isArray(product.sizes)  && product.sizes.length  > 0;

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <GradientHeader title="Shop" variant="stem-header-gradient" />
        <IconButton
          icon="back"
          onPress={onBack}
          variant="translucent"
          size={36}
          accessibilityLabel="Volver al shop"
          style={styles.backBtn}
        />
      </View>

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <View style={styles.heroWrap}>
          <View style={styles.heroImg}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.heroImageFill}
              resizeMode="contain"
              accessibilityLabel={product.name}
            />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>

          {/* Title + price */}
          <View style={styles.titleRow}>
            <Text style={styles.titleBold}>{product.name} </Text>
            <Text style={styles.titlePrice}>{product.price}</Text>
          </View>

          {/* Color — only if product has colors */}
          {hasColors && (
            <>
              <Text style={styles.sectionLabel}>Color</Text>
              <View style={styles.colorRow}>
                {product.colors!.map((c, i) => (
                  <Pressable
                    key={c}
                    onPress={() => setColorIdx(i)}
                    accessibilityRole="button"
                    accessibilityLabel={`color ${i + 1}`}
                    style={[
                      styles.colorChip,
                      { backgroundColor: c },
                      i === colorIdx && styles.colorChipActive,
                    ]}
                  />
                ))}
              </View>
            </>
          )}

          {/* Talla — only if product has sizes */}
          {hasSizes && (
            <>
              <Text style={styles.sectionLabel}>Talla</Text>
              <View style={styles.sizeRow}>
                {product.sizes!.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setSize(s)}
                    accessibilityRole="button"
                    accessibilityLabel={`talla ${s}`}
                    style={[styles.sizeChip, s === size && styles.sizeChipActive]}
                  >
                    <Text style={styles.sizeText}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {/* Description */}
          <Text style={styles.descLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Go Buy button */}
          <Pressable
            onPress={() => Linking.openURL(product.buyUrl)}
            accessibilityRole="button"
            accessibilityLabel="Go Buy"
            style={({ pressed }) => [styles.goBuyBtn, pressed && styles.goBuyBtnPressed]}
          >
            <Text style={styles.goBuyText}>Go Buy</Text>
          </Pressable>
        </View>
      </ScrollView>

      <TabBar active="market" onChange={onTabChange ?? (() => {})} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1565C0',
    overflow: 'hidden',
  },
  headerWrap: {
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: LAYOUT.screenPadding,
    bottom: 14,
  },
  scrollWrap: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 24,
  },

  /* Hero */
  heroWrap: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: LAYOUT.screenPadding,
  },
  heroImg: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  heroImageFill: {
    width: '100%',
    height: '100%',
  },

  /* Body */
  body: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 12,
  },

  /* Title row */
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  titleBold: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700',
    //fontStyle: 'italic',
    fontSize: 26,
    color: '#fff',
    letterSpacing: -0.4,
  },
  titlePrice: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    //fontStyle: 'italic',
    //fontWeight: '800',
    fontSize: 26,
    color: '#fff',
    letterSpacing: -0.4,
  },

  /* Section labels */
  sectionLabel: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },

  /* Colors */
  colorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  colorChip: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorChipActive: {
    borderColor: 'rgba(255,255,255,0.9)',
  },

  /* Sizes */
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  sizeChip: {
    flex: 1,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    backgroundColor: '#1a2a5e',
  },
  sizeText: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    letterSpacing: 0.5,
  },

  /* Description */
  descLabel: {
    fontFamily: FONTS.interBold,
    //fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  description: {
    fontFamily: FONTS.interRegular,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 24,
  },

  /* Go Buy button */
  goBuyBtn: {
    backgroundColor: '#00bcd4',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  goBuyBtnPressed: {
    opacity: 0.8,
  },
  goBuyText: {
    fontFamily: FONTS.archivoBold,
    //fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    letterSpacing: 0.3,
  },
});
