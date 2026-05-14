import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TEXT } from '../theme/typography';

type Props = {
  children: React.ReactNode;
  style?: any;
  top?: number;
  bottom?: number;
};

export default function SmallCapsHeader({ children, style, top = 22, bottom = 10 }: Props) {
  return (
    <Text style={[styles.label, { marginTop: top, marginBottom: bottom }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    ...TEXT.smallCaps,
  },
});
