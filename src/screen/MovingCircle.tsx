import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MovingCircle = () => {
  const totalCircles = 1; // Only 1 moving circle
  const circumference = 120; // Circumference of the circle
  const radius = circumference / (1 * Math.PI); // Radius calculation

  // Animation Value
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Looping animation
    Animated.loop(
      Animated.timing(animationProgress, {
        toValue: 360, // Move through 360 degrees
        duration: 5000, // 5 seconds for a full circle
        useNativeDriver: false, // Native driver not supported for `cx` and `cy`
      })
    ).start();
  }, [animationProgress]);

  // Interpolate the angle
  const angle = animationProgress.interpolate({
    inputRange: [0, 360], // Input degrees
    outputRange: [0, 360], // Output degrees
  });

  // Calculate moving `cx` and `cy` using interpolation
  const movingCx = angle.interpolate({
    inputRange: [0, 360],
    outputRange: [
      125 + Math.cos((0 * Math.PI) / 180) * radius, // Starting x position
      125 + Math.cos((360 * Math.PI) / 180) * radius, // Ending x position
    ],
  });

  const movingCy = angle.interpolate({
    inputRange: [0, 360],
    outputRange: [
      125 + Math.sin((0 * Math.PI) / 180) * radius, // Starting y position
      125 + Math.sin((360 * Math.PI) / 180) * radius, // Ending y position
    ],
  });

  return (
    <View style={styles.container}>
      <Svg height="300" width="300" viewBox="0 0 300 300">
        <G rotation="-90" origin="150, 150">
          {/* Static Circle */}
          <Circle
            cx="150"
            cy="150"
            r={radius}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="5"
            fill="none"
          />

          {/* Moving Circle */}
          <AnimatedCircle
            cx={movingCx}
            cy={movingCy}
            r="8" // Radius of the moving circle
            fill="#FF6B6B"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default MovingCircle;
