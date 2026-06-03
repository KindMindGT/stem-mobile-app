import { TONE_RAMP } from '@/theme/tones';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatGTQ } from '../constants/functions';
import { FONTS } from '../theme/typography';
import IconButton from './icon-button';
import ImgPlaceholder from './image-placeholder';
import Stepper from './stepper';

type Props = {
  item: {
    id: string;
    name: string;
    meta: string;
    tone: string;
    unitPrice: number;
    qty: number;
  };
  onQty: (value: number) => void;
  onRemove: () => void;
};

export default function CartLineItem({ item, onQty, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.thumb}>
        <ImgPlaceholder label="" tone={item.tone as keyof typeof TONE_RAMP} radius={12} />
      </View>
      <View style={styles.middle}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.meta}</Text>
        <View style={styles.stepper}>
          <Stepper value={item.qty} onChange={onQty} compact min={1} />
        </View>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.price}>{formatGTQ(item.unitPrice * item.qty)}</Text>
        <IconButton
          icon="trash"
          variant="bare"
          size={22}
          onPress={onRemove}
          accessibilityLabel={`eliminar ${item.name.replace('\n', ' ')}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(20,20,26,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 10,
  },
  thumb: {
    width: 72,
    height: 72,
  },
  middle: {
    flex: 1,
    minWidth: 0,
  },
  stepper: {
    marginTop: 8,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 8,
  },
  name: {
    fontFamily: FONTS.archivoExtraBoldItalic,
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 17,
    color: '#fff',
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  meta: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 3,
    fontFamily: FONTS.interRegular,
  },
  price: {
    fontFamily: FONTS.archivoExtraBold,
    fontWeight: '800',
    fontSize: 15,
    color: '#fff',
  },
});
