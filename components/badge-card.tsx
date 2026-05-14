import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TONE_RAMP } from '../theme/tones';
import { FONTS } from '../theme/typography';

type Props = {
  label: string;
  tone?: 'pink' | 'orange' | 'blue';
};

export default function BadgeCard({ label, tone = 'pink' }: Props) {
  const ramp = TONE_RAMP[tone] || TONE_RAMP.pink;
  const [a, b, accent] = ramp;
  return (
    <View style={styles.badge}>
      <LinearGradient
        colors={[a, b]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.iconWrap}>
        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 3 L14.2 8.5 L20 9.3 L15.8 13.4 L17 19.2 L12 16.5 L7 19.2 L8.2 13.4 L4 9.3 L9.8 8.5 Z"
            fill={accent}
            opacity="0.95"
          />
        </Svg>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 100,
    height: 116,
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 99,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700',
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 13,
  },
});
