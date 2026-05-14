import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  colors: string[];
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: any;
};

export default function GradientText({
  children,
  colors,
  locations,
  start = { x: 0, y: 0.5 },
  end = { x: 1, y: 0.5 },
  style,
}: Props) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const text = (
    <Text
      style={style}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width !== size.w || height !== size.h) {
          setSize({ w: width, h: height });
        }
      }}
    >
      {children}
    </Text>
  );

  return (
    <View>
      <MaskedView
        maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{children}</Text>}
      >
        {size.w > 0 ? (
          <LinearGradient
            colors={colors as [string, string, ...string[]]}
            locations={locations as [number, number, ...number[]] | undefined}
            start={start}
            end={end}
            style={{ width: size.w, height: size.h }}
          />
        ) : (
          <View style={{ opacity: 0 }}>{text}</View>
        )}
      </MaskedView>
      <View style={{ position: 'absolute', opacity: 0 }} pointerEvents="none">
        {text}
      </View>
    </View>
  );
}
