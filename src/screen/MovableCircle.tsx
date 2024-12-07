import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, withSpring, useSharedValue, useAnimatedStyle, withPanGestureHandler, useAnimatedGestureHandler } from 'react-native-reanimated';

const AppContent = () => {
  // Shared values for X and Y position of the circle
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = offsetX.value;
      context.startY = offsetY.value;
    },
    onActive: (event, context) => {
      offsetX.value = context.startX + event.translationX;
      offsetY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // You can add additional logic on end (e.g., snapping to a grid, etc.)
    }
  });

  // Animated style to update the circle's position
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offsetX.value, { damping: 5 }) },
        { translateY: withSpring(offsetY.value, { damping: 5 }) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.circle, animatedStyle]} />
      </PanGestureHandler>
      <Text style={styles.instructions}>Drag the circle around!</Text>
      <StatusBar translucent={false}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'tomato',
    position: 'absolute',
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default AppContent;
