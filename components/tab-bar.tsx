import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { BURNOUT_ORANGE, CHICANE_VIOLET, PITLANE_PINK } from '../theme/colors';
import { LAYOUT } from '../theme/layout';
import { SHADOWS } from '../theme/shadows';

const GRADIENT_ID = 'tab-bar-stroke';
const INACTIVE_STROKE = 'rgba(255,255,255,0.55)';
const DEFAULT_TABS = ['home', 'cal', 'user', 'menu'];

const TAB_ICONS = {
  home: ({ stroke, fill, inactive } : { stroke: string; fill: string; inactive: string }) => (
    <Path
      d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"
      fill={fill}
      stroke={fill === 'none' ? inactive : 'none'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cal: ({ stroke, fill, inactive, on } : { stroke: string; fill: string; inactive: string; on: boolean }) => (
    <>
      <Rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2.5"
        fill={fill}
        stroke={fill === 'none' ? inactive : 'none'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3.5 9.5 H20.5" stroke={on ? PITLANE_PINK : inactive} strokeWidth={1.6} />
      <Path
        d="M8 3 V6 M16 3 V6"
        stroke={on ? PITLANE_PINK : inactive}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </>
  ),
  user: ({ stroke } : { stroke: string }) => (
    <>
      <Circle
        cx="12"
        cy="9"
        r="3.5"
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 20 C 5 16 8 14 12 14 C 16 14 19 16 19 20"
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  menu: ({ stroke } : { stroke: string }) => (
    <Path
      d="M4 7 H20 M4 12 H20 M4 17 H20"
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  market: ({ fill, inactive, on } : { fill: string; inactive: string; on: boolean }) => (
    <>
      <Path
        d="M5 8 H19 L18 20 H6 Z"
        fill={fill}
        stroke={fill === 'none' ? inactive : 'none'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 8 V6 A 3 3 0 0 1 15 6 V8"
        stroke={on ? PITLANE_PINK : inactive}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
};

function TabIcon({ name, on } : { name: string; on: boolean }) {
  const renderer = TAB_ICONS[name as keyof typeof TAB_ICONS];
  if (!renderer) return null;
  const stroke = on ? `url(#${GRADIENT_ID})` : INACTIVE_STROKE;
  const fill = on ? `url(#${GRADIENT_ID})` : 'none';
  return (
    <Svg width="26" height="26" viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id={GRADIENT_ID} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={CHICANE_VIOLET} />
          <Stop offset="1" stopColor={BURNOUT_ORANGE} />
        </LinearGradient>
      </Defs>
      {renderer({ stroke, fill, inactive: INACTIVE_STROKE, on })}
    </Svg>
  );
}

type Props = {
  active?: string;
  onChange?: (id: string) => void;
  items?: string[];
};

export default function TabBar({ active = 'home', onChange, items = DEFAULT_TABS } : Props) {
  const insets = useSafeAreaInsets();
  // Sit above the system navigation bar/home indicator with a fixed gap
  const bottomOffset = insets.bottom + LAYOUT.tabBarBottom;

  return (
    <View style={[styles.wrap, { bottom: bottomOffset }]} pointerEvents="box-none">
      <View style={styles.bar}>
        <BlurView intensity={40} tint="dark" style={[StyleSheet.absoluteFill, styles.clip]} />
        <View style={[StyleSheet.absoluteFill, styles.tint]} />
        {items.map((id) => (
          <Pressable
            key={id}
            style={styles.btn}
            onPress={() => onChange && onChange(id)}
            hitSlop={8}
            accessibilityRole="tab"
            accessibilityLabel={id}
            accessibilityState={{ selected: active === id }}
          >
            <TabIcon name={id} on={active === id} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: LAYOUT.edgePadding,
    right: LAYOUT.edgePadding,
    height: LAYOUT.tabBarHeight,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    ...SHADOWS.tabBar,
  },
  clip: {
    borderRadius: 22,
  },
  tint: {
    backgroundColor: 'rgba(20,20,26,0.7)',
    borderRadius: 22,
  },
  btn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
