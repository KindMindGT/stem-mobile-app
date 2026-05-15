import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TONE_RAMP } from '../theme/tones';
import { FONTS } from '../theme/typography';
import ImgPlaceholder from './image-placeholder';

type Props = {
  height?: number;
  name: string;
  price: string;
  tone?: keyof typeof TONE_RAMP;
  label?: string;
};

export default function ProductTile({ height = 220, name, price, tone = 'pink', label = 'producto' }: Props) {
  return (
    <View style={[styles.card, { height }]}>
      <View style={styles.imgBlock}>
        <ImgPlaceholder label={label} tone={tone} radius={0} />
        <View style={styles.heart}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 20 C 4 14 2 9 6 6 C 9 4 11 6 12 8 C 13 6 15 4 18 6 C 22 9 20 14 12 20 Z"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(20,20,26,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  imgBlock: {
    width: '100%',
    aspectRatio: 1 / 0.72,
    position: 'relative',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 6,
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
  price: {
    fontFamily: FONTS.archivoExtraBold,
    fontWeight: '800',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.2,
  },
});
