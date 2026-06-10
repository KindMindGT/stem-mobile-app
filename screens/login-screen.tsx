import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/typography';

// ─── Assets ───────────────────────────────────────────────────────────────────

const SHAPES      = require('../assets/images/stem-racing-shapes-blue-green.png');
const LOGO        = require('../assets/images/stem-logo-login.png');

// ─── Dimensions ───────────────────────────────────────────────────────────────

const { width: W, height: H } = Dimensions.get('window');

// Height allocated to each shapes strip; the image is 2× this so half is visible
const SHAPES_AREA = H * 0.32;

// ─── Input ────────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChangeText,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="rgba(255,255,255,0.4)"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const DEMO_EMAIL    = __DEV__ ? 'mateo.ramirez@apex.gt' : '';
const DEMO_PASSWORD = __DEV__ ? 'apexrules' : '';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email,    setEmail]    = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* ── Full-screen blue-green gradient background ── */}
      <LinearGradient
        colors={['#00b4a0', '#0077cc', '#004fa3']}
        locations={[0, 0.55, 1]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Top shapes (normal orientation) ── */}
      <View style={styles.topWrapper}>
        <Image
          source={SHAPES}
          style={styles.shapesImage}
          resizeMode="contain"
        />
      </View>

      {/* ── Bottom shapes (rotated 180°) ── */}
      <View style={styles.bottomWrapper}>
        <Image
          source={SHAPES}
          style={[styles.shapesImage, styles.rotated]}
          resizeMode="contain"
        />
      </View>

      {/* ── Content ── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content, { paddingTop: insets.top + 8 }]}>
          {/* Logo */}
          <Image
            source={LOGO}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Form */}
          <View style={styles.form}>
            <Field
              label="MAIL"
              value={email}
              onChangeText={setEmail}
            />
            <Field
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Sign in button */}
            <Pressable
              style={({ pressed }) => [styles.signInBtn, pressed && { opacity: 0.85 }]}
              onPress={onLogin}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
            >
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>

            {/* Forgot password */}
            <Pressable hitSlop={12}>
              <Text style={styles.forgot}>Forgot your password?</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
  },
  flex: { flex: 1 },

  // Shapes strips — each clip half the image height so only half shows
  topWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SHAPES_AREA,
    overflow: 'hidden',
    justifyContent: 'flex-end',   // anchor image bottom → top half is cut
    alignItems: 'center',      // center image horizontally
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHAPES_AREA,
    overflow: 'hidden',
    justifyContent: 'flex-start', // anchor image top → bottom half is cut
    alignItems: 'center',      // center image horizontally
  },
  shapesImage: {
    width: W * 1.3,              // make image wider than screen to add some horizontal padding
    height: SHAPES_AREA * 2,      // image is 2× container so half spills out
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },

  // Content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 32,
  },
  logo: {
    width: W * 0.3,
    height: W * 0.3,
  },

  // Form
  form: {
    width: '100%',
    gap: 12,
  },
  field: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  fieldLabel: {
    fontFamily: FONTS.interBold,
    fontWeight: '700' as const,
    fontSize: 10,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 4,
  },
  fieldInput: {
    fontFamily: FONTS.interRegular,
    fontSize: 15,
    color: '#fff',
    padding: 0,
  },

  // Sign-in button
  signInBtn: {
    height: 54,
    borderRadius: 10,
    backgroundColor: 'rgba(100,180,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  signInText: {
    fontFamily: FONTS.archivoBold,
    fontWeight: '700' as const,
    fontSize: 18,
    color: '#fff',
    letterSpacing: 0.2,
  },

  // Forgot
  forgot: {
    textAlign: 'center',
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: 12,
  },
  footerLeft: {
    fontFamily: FONTS.interRegular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  footerLink: {
    fontFamily: FONTS.interBold,
    fontWeight: '700' as const,
    fontSize: 13,
    color: '#fff',
    letterSpacing: 1,
  },
});
