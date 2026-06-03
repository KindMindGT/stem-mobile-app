import { formatGTQ } from '@/constants/functions';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CartLineItem from '../components/cart-line-item';
import CartSummaryLine from '../components/cart-summary-line';
import GradientButton from '../components/gradient-button';
import GradientHeader from '../components/gradient-header';
import { CARBON_SHADOW } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';
import { FONTS } from '../theme/typography';

const SHIPPING_GTQ = 25;
const INITIAL_CART_ITEMS = [
  {
    id: '1',
    name: 'Hoodie\nApex 2026',
    meta: 'Talla M · Negro',
    tone: 'orange',
    qty: 1,
    unitPrice: 450,
  },
  {
    id: '2',
    name: 'Kit de Arduino',
    meta: 'Starter Pack',
    tone: 'pink',
    qty: 1,
    unitPrice: 350,
  },
  {
    id: '3',
    name: 'Cuaderno STEM',
    meta: 'A5 · 120 hojas',
    tone: 'blue',
    qty: 2,
    unitPrice: 85,
  },
];

export default function CartScreen({ onPay }: { onPay: () => void }) {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);

  const setQty = (id : string, qty : number) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty } : it)));
  const removeItem = (id : string) => setItems((arr) => arr.filter((it) => it.id !== id));

  const { subtotal, total } = useMemo(() => {
    const sub = items.reduce((acc, it) => acc + it.unitPrice * it.qty, 0);
    return { subtotal: sub, total: sub + SHIPPING_GTQ };
  }, [items]);

  return (
    <View style={styles.screen}>
      <GradientHeader title="Carrito" variant="primary-gradient-2" />

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {items.map((it) => (
          <CartLineItem
            key={it.id}
            item={it}
            onQty={(q) => setQty(it.id, q)}
            onRemove={() => removeItem(it.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <CartSummaryLine label="Subtotal" value={formatGTQ(subtotal)} />
        <CartSummaryLine label="Envío" value={formatGTQ(SHIPPING_GTQ)} />
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{formatGTQ(total)}</Text>
        </View>
        <View style={styles.ctaWrap}>
          <GradientButton
            label={`Pagar ${formatGTQ(total)}`}
            onPress={onPay}
            height={56}
            radius={16}
          />
        </View>
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
    padding: LAYOUT.screenPadding,
    paddingBottom: LAYOUT.scrollBottomWithCart,
    gap: 12,
  },
  footer: {
    position: 'absolute',
    left: LAYOUT.edgePadding,
    right: LAYOUT.edgePadding,
    bottom: LAYOUT.tabBarBottom,
    backgroundColor: 'rgba(20,20,26,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 22,
    padding: 16,
    ...SHADOWS.cardDeep,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
  },
  totalValue: {
    fontFamily: FONTS.archivoBlackItalic,
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 26,
    color: '#fff',
    letterSpacing: -0.3,
  },
  ctaWrap: {
    marginTop: 12,
  },
});
