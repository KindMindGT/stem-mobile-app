import { PITLANE_PINK } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
  done?: boolean;
};

export default function CheckBadge({ done } : Props) {
  if (done) {
    return (
      <View style={[styles.base, styles.done]}>
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12 L10 17 L19 7"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    );
  }
  return (
    <View style={[styles.base, styles.outline]}>
      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12 L10 17 L19 7"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 36,
    height: 36,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  done: {
    backgroundColor: PITLANE_PINK,
    shadowColor: PITLANE_PINK,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  outline: {
    borderWidth: 1.6,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
