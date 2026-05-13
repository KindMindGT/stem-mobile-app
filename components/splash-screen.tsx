import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

// Animated wrapper for SVG
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
    }, 20000);

    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  return (
    <AnimatedView style={[styles.container, { opacity }]}>
      {/* Background */}
      <View style={StyleSheet.absoluteFill} />

      {/* Top-left blob */}
      <View style={styles.topLeft} pointerEvents="none">
        <Image
          source={require('../assets/images/stem-racing-shapes-blue.png')}
          style={{ resizeMode: 'center' }}
        />
      </View>

      {/* Bottom-right blob */}
      <View style={styles.bottomRight} pointerEvents="none">
        <Image
          source={require('../assets/images/stem-racing-shapes-blue.png')}
          style={{ resizeMode: 'center' }}
        />
      </View>

      {/* Center content */}
      <View style={styles.center}>
        <Image
          source={require('../assets/images/stem-racing-gt-white.png')}
          style={{ resizeMode: 'center' }}
        />
      </View>

      {/* Center content */}
      <View style={styles.center}>
        {/* SR Logo mark */}
        <View style={styles.logoRow}>
          <View style={styles.srMark}>
            <Image
              source={require('../assets/images/stem-racing-gt-white.png')}
              style={{ resizeMode: 'center' }}
            />
          </View>

        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 9999,
  },
  topLeft: {
    position: 'absolute',
    top: -H * 0.06,
    left: -W * 0.08,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -H * 0.08,
    right: -W * 0.08,
    transform: [{ rotate: '180deg' }],
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  srMark: {
    width: 54,
    height: 54,
  },
  textStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  aramcoBox: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  aramcoText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  stemText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 34,
  },
  racingText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 34,
  },
  divider: {
    width: W * 0.5,
    height: 1,
    backgroundColor: '#444444',
    marginVertical: 18,
  },
  worldFinalsText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  locationText: {
    color: '#E91E8C',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
