import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import BrandLockup from '../components/brand-lookup';
import GlassInput from '../components/glass-input';
import GradientButton from '../components/gradient-button';
import GradientText from '../components/gradient-text';
//import SplashShapes from '../components/SplashShapes';
import { APEX_BG, PINK_ORANGE_PAIR } from '../theme/colors';
import { FONTS } from '../theme/typography';

const DEMO_EMAIL = __DEV__ ? 'mateo.ramirez@apex.gt' : '';
const DEMO_PASSWORD = __DEV__ ? 'apexrules' : '';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);

  return (
    <View style={styles.screen}>
      <View style={styles.shapes}>
        {/* <SplashShapes width={width} height={height} /> */}
      </View>
      <LinearGradient
        colors={['rgba(8,8,11,0.6)', 'rgba(8,8,11,0.3)', 'rgba(8,8,11,0.85)']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.center}>
        <View style={styles.brandWrap}>
          <BrandLockup markSize={82} pillLabel="STEM · GUATEMALA" pillFontSize={11} titleSize={26} />
        </View>

        <View style={styles.form}>
          <GlassInput label="CORREO" value={email} onChangeText={setEmail} />
          <GlassInput
            label="CONTRASEÑA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mono
          />
          <View style={styles.ctaWrap}>
            <GradientButton label="Iniciar sesión" onPress={onLogin} height={56} radius={16} />
          </View>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerLeft}>NUEVO AQUÍ? </Text>
          <GradientText colors={PINK_ORANGE_PAIR} style={styles.footerLink}>
            CREA UNA CUENTA
          </GradientText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: APEX_BG,
    overflow: 'hidden',
  },
  shapes: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.32,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandWrap: {
    marginBottom: 44,
  },
  form: {
    width: '100%',
    gap: 14,
  },
  ctaWrap: {
    marginTop: 8,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 13,
    fontFamily: FONTS.interSemiBold,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
  },
  footerRow: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  footerLeft: {
    fontSize: 12,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.45)',
    fontFamily: FONTS.interBold,
    fontWeight: '700',
  },
  footerLink: {
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: FONTS.interBold,
    fontWeight: '700',
  },
});
