import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const AnimatedView = Animated.createAnimatedComponent(View);

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  return (
    <AnimatedView style={[styles.container, { opacity }]}>

      {/* Background shapes — full screen */}
      <Image
        source={require('../assets/images/stem-racing-shapes-blue.png')}
        style={styles.bgShapes}
        resizeMode="cover"
      />

      {/* Center logo */}
      <View style={styles.center}>
        <Image
          source={require('../assets/images/stem-racing-gt-white.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1565C0',
    zIndex: 9999,
  },
  bgShapes: {
    ...StyleSheet.absoluteFillObject,
    width: W,
    height: H,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: W * 0.805,
    height: undefined,
    aspectRatio: 1,
  },
});
