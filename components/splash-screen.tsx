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

      {/* Top shapes — only bottom half visible (image shifted up by 50%) */}
      <View style={styles.topWrapper}>
        <Image
          source={require('../assets/images/stem-racing-shapes-blue.png')}
          style={styles.shapesImage}
          resizeMode="contain"
        />
      </View>

      {/* Center logo */}
      <View style={styles.center}>
        <Image
          source={require('../assets/images/stem-racing-gt-white.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom shapes — rotated 180°, only top half visible (image shifted down by 50%) */}
      <View style={styles.bottomWrapper}>
        <Image
          source={require('../assets/images/stem-racing-shapes-blue.png')}
          style={[styles.shapesImage, styles.rotated]}
          resizeMode="contain"
        />
      </View>

    </AnimatedView>
  );
}

// Height allocated to each shapes block (half the image will be off-screen)
const SHAPES_AREA = H * 0.35;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 9999,
    flexDirection: 'column',
  },
  // Clip the overflow so only half the image shows
  topWrapper: {
    width: W,
    height: SHAPES_AREA,
    overflow: 'hidden',
    justifyContent: 'flex-end', // anchor image to bottom → top half is cut off
  },
  bottomWrapper: {
    width: W,
    height: SHAPES_AREA,
    overflow: 'hidden',
    justifyContent: 'flex-start', // anchor image to top → bottom half is cut off
  },
  shapesImage: {
    width: W,
    height: SHAPES_AREA * 2, // full image is 2× the visible area
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: W * 0.805,
    height: undefined,
    aspectRatio: 1, // will be overridden naturally by resizeMode contain
  },
});
