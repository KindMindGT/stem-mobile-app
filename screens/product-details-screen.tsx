import { TONE_RAMP } from '@/theme/tones';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import GradientButton from '../components/gradient-button';
import GradientText from '../components/gradient-text';
import IconButton from '../components/icon-button';
import ImgPlaceholder from '../components/image-placeholder';
import SmallCapsHeader from '../components/small-caps-header';
import Stepper from '../components/stepper';
import { formatGTQ } from '../constants/functions';
import { APEX_GLACIER, CARBON_SHADOW, GRADIENTS } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { FONTS, TEXT } from '../theme/typography';

const MAX_QTY = 20;
const FEATURED_PRODUCT = {
  id: 'pf-hoodie-2026',
  eyebrow: 'APEX MERCH · ED. 2026',
  title: 'Hoodie Apex 2026',
  price: 450,
  description:
    'Sudadera de algodón orgánico con capucha forrada y logotipo bordado. Diseñada para los talleres en el Hub Zona 10 — cómoda, abrigada y resistente al taller.',
  heroLabel: 'hoodie · apex 2026',
  heroTone: 'orange',
  colors: ['#0a0a0e', '#ff1f7a', '#ff7a1a', '#2a8eff'],
  sizes: ['S', 'M', 'L', 'XL'],
};

type Props = {
  onBack: () => void;
  onAddToCart: () => void;
};

export default function ProductDetailScreen({ onBack, onAddToCart } : Props) {
  const product = FEATURED_PRODUCT;
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <ImgPlaceholder label={product.heroLabel} tone={product.heroTone as keyof typeof TONE_RAMP} radius={0} />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.35)',
              'rgba(0,0,0,0)',
              'rgba(8,8,11,0)',
              'rgba(8,8,11,1)',
            ]}
            locations={[0, 0.25, 0.7, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <IconButton
            icon="back"
            onPress={onBack}
            style={[styles.headerBtn, styles.headerBtnLeft]}
            accessibilityLabel="atrás"
          />
          <IconButton
            icon="heart"
            style={[styles.headerBtn, styles.headerBtnRight]}
            accessibilityLabel="favoritos"
            onPress={() => {}}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.eyebrow}>{product.eyebrow}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <GradientText colors={GRADIENTS['primary-gradient-2'].colors} style={styles.price}>
            {formatGTQ(product.price)}
          </GradientText>

          <View style={styles.field}>
            <Text style={styles.sectionLabel}>COLOR</Text>
            <View style={styles.colorRow}>
              {product.colors.map((c, i) => (
                <Pressable
                  key={c}
                  onPress={() => setColorIdx(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`color ${i + 1}`}
                  style={[
                    styles.colorChip,
                    {
                      backgroundColor: c,
                      borderColor: i === colorIdx ? '#fff' : 'rgba(255,255,255,0.18)',
                    },
                    i === colorIdx && styles.colorChipActive,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.sectionLabel}>TALLA</Text>
            <View style={styles.sizeRow}>
              {product.sizes.map((s) => {
                const isActive = s === size;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setSize(s)}
                    accessibilityRole="button"
                    accessibilityLabel={`talla ${s}`}
                    style={[styles.sizeChip, isActive && styles.sizeChipActive]}
                  >
                    <Text style={[styles.sizeText, isActive && styles.sizeTextActive]}>{s}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <SmallCapsHeader>DESCRIPCIÓN</SmallCapsHeader>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.qtyRow}>
            <Text style={styles.sectionLabel}>CANTIDAD</Text>
            <Stepper value={qty} onChange={setQty} min={1} max={MAX_QTY} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaWrap}>
        <GradientButton
          label="Añadir al carrito"
          onPress={onAddToCart}
          height={60}
          radius={18}
        />
      </View>
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
    paddingBottom: 110,
  },
  hero: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBtn: {
    position: 'absolute',
    top: LAYOUT.safeTop,
  },
  headerBtnLeft: {
    left: 18,
  },
  headerBtnRight: {
    right: 18,
  },
  body: {
    paddingHorizontal: LAYOUT.screenPadding,
    paddingTop: 6,
  },
  eyebrow: {
    ...TEXT.eyebrow,
  },
  title: {
    ...TEXT.h1,
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: -0.6,
    marginTop: 4,
  },
  price: {
    marginTop: 8,
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: 0.5,
  },
  field: {
    marginTop: 18,
  },
  sectionLabel: {
    ...TEXT.eyebrow,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  colorChip: {
    width: 30,
    height: 30,
    borderRadius: 99,
    borderWidth: 2,
  },
  colorChipActive: {
    shadowColor: '#fff',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  sizeChip: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(20,20,26,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 0,
  },
  sizeText: {
    fontFamily: FONTS.archivoExtraBold,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
    color: '#fff',
  },
  sizeTextActive: {
    color: APEX_GLACIER,
  },
  description: {
    ...TEXT.body,
    color: 'rgba(255,255,255,0.75)',
  },
  qtyRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaWrap: {
    position: 'absolute',
    left: LAYOUT.edgePadding,
    right: LAYOUT.edgePadding,
    bottom: LAYOUT.tabBarBottom,
  },
});
