import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { BURNOUT_ORANGE, PITLANE_PINK } from '../theme/colors';
import { FONTS } from '../theme/typography';

const GRADIENT_ID = 'bullet-item-stroke';

const ICON_PATHS = {
  notebook: (
    <>
      <Rect x="5" y="4" width="14" height="16" rx="1.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth={1.6} fill="none" />
      <Path
        d="M5 4 V20 M8 8 H16 M8 12 H16 M8 16 H13"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  bottle: (
    <>
      <Path
        d="M10 3 H14 V6 L15 7 V20 A 1 1 0 0 1 14 21 H10 A 1 1 0 0 1 9 20 V7 L10 6 Z"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M9 12 H15" stroke={`url(#${GRADIENT_ID})`} strokeWidth={1.6} />
    </>
  ),
  ruler: (
    <>
      <Rect x="3" y="9" width="18" height="6" rx="1" stroke={`url(#${GRADIENT_ID})`} strokeWidth={1.6} fill="none" />
      <Path d="M7 9 V12 M11 9 V13 M15 9 V12 M19 9 V13" stroke={`url(#${GRADIENT_ID})`} strokeWidth={1.4} />
    </>
  ),
};

function Icon({ name } : { name: keyof typeof ICON_PATHS }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id={GRADIENT_ID} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={PITLANE_PINK} />
          <Stop offset="1" stopColor={BURNOUT_ORANGE} />
        </LinearGradient>
      </Defs>
      {path}
    </Svg>
  );
}

export default function BulletItem({ icon, label } : { icon: keyof typeof ICON_PATHS, label: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Icon name={icon} />
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,40,120,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONTS.interMedium,
    fontWeight: '500',
  },
});
