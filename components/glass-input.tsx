import type { PropsWithChildren } from 'react';
import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = PropsWithChildren<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  mono?: boolean;
  placeholder?: string;
  editable?: boolean;
}>;

export default function GlassInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  mono,
  placeholder,
  editable = true,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.35)"
        secureTextEntry={secureTextEntry}
        editable={editable}
        style={[styles.input, mono && styles.mono]}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(20,20,28,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
  },
  label: {
    fontSize: 9,
    letterSpacing: 1.6,
    //fontFamily: FONTS.interBold,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
  },
  input: {
    marginTop: 2,
    //fontFamily: FONTS.interSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    padding: 0,
  },
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    letterSpacing: 4,
  },
});
