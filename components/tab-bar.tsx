import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { STEM_NAV } from '../theme/colors';

const INACTIVE_STROKE = 'rgba(255,255,255,0.5)';
const ACTIVE_COLOR = '#ffffff';
const DEFAULT_TABS = ['home', 'cal', 'market', 'user', 'menu'];

// Tab bar content height (Apple HIG standard: 49pt)
export const TAB_BAR_CONTENT_HEIGHT = 49;

const TAB_ICONS = {
  home: ({ fill, inactive }: { fill: string; inactive: string }) => (
    <Path
      d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"
      fill={fill}
      stroke={fill === 'none' ? inactive : 'none'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cal: ({ fill, inactive, on }: { fill: string; inactive: string; on: boolean }) => (
    <>
      <Rect
        x="3.5" y="5" width="17" height="15" rx="2.5"
        fill={fill}
        stroke={fill === 'none' ? inactive : 'none'}
        strokeWidth={2}
      />
      <Path d="M3.5 9.5 H20.5" stroke={on ? ACTIVE_COLOR : inactive} strokeWidth={1.6} />
      <Path
        d="M8 3 V6 M16 3 V6"
        stroke={on ? ACTIVE_COLOR : inactive}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </>
  ),
  user: ({ stroke }: { stroke: string }) => (
    <>
      <Circle cx="12" cy="9" r="3.5" fill="none" stroke={stroke} strokeWidth={2} />
      <Path
        d="M5 20 C 5 16 8 14 12 14 C 16 14 19 16 19 20"
        fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round"
      />
    </>
  ),
  menu: ({ stroke }: { stroke: string }) => (
    <Path
      d="M4 7 H20 M4 12 H20 M4 17 H20"
      fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round"
    />
  ),
  market: ({ fill, inactive, on }: { fill: string; inactive: string; on: boolean }) => (
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
        stroke={on ? ACTIVE_COLOR : inactive}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
};

function TabIcon({ name, on }: { name: string; on: boolean }) {
  const renderer = TAB_ICONS[name as keyof typeof TAB_ICONS];
  if (!renderer) return null;
  const stroke = on ? ACTIVE_COLOR : INACTIVE_STROKE;
  const fill = on ? ACTIVE_COLOR : 'none';
  return (
    <Svg width="26" height="26" viewBox="0 0 24 24">
      {renderer({ stroke, fill, inactive: INACTIVE_STROKE, on } as any)}
    </Svg>
  );
}

type Props = {
  active?: string;
  onChange?: (id: string) => void;
  items?: string[];
};

export default function TabBar({ active = 'home', onChange, items = DEFAULT_TABS }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.separator} />
      <View style={styles.bar}>
        {items.map((id) => (
          <Pressable
            key={id}
            style={styles.btn}
            onPress={() => onChange?.(id)}
            hitSlop={4}
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
  container: {
    backgroundColor: STEM_NAV,
    // No absolute positioning — sits in the normal layout flow
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  bar: {
    height: TAB_BAR_CONTENT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
