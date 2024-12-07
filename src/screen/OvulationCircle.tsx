import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const OvulationCircle = () => {
  const totalCircles = 33;
  const circumference = 120; // Circumference of the circle
  const radius = circumference / (1 * Math.PI); // Radius calculation

  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the progress value from 0 to 28
    Animated.timing(animationProgress, {
      toValue: totalCircles, // Target value
      duration: 3000, // Animation duration in milliseconds
      useNativeDriver: false, // Opacity requires non-native driver
    }).start();
  }, [animationProgress]);

  const colors = [
    '#FF6B6B', '#FFE6AC', '#ADD8E6', '#FF6B6B', '#FFE6AC', '#ADD8E6', 
    '#FFE6AC', '#FFB6C1', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFE6AC', 
    '#90EE90', '#ADD8E6', '#90EE90', '#FFB6C1', '#ADD8E6', '#90EE90',
    '#FFB6C1', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFB6C1', '#ADD8E6',
    '#90EE90', '#ADD8E6', '#90EE90', '#FFB6C1', '#d3d3d3', '#90EE90',
  ];

  const circleRadius = 1; 

  return (
    <View style={{ backgroundColor: 'dark-green' }}>
      <StatusBar translucent={true} barStyle="light-content" />

      {/* SVG Circle */}
      <Svg height="600" width="600" viewBox="75 60 150 150"> 
        <G rotation="-90" origin="125, 125">
        
          <Circle
            cx="125"
            cy="125"
            r={radius}
            // stroke="#000000"
            strokeWidth="10"
            fill="none"
            // cx="50"
            // cy="50"
            // r="145"
            stroke="rgb(246, 79, 89)"
            // strokeWidth="5"
            fill="rgba(255,255,255,0.2)"
            strokeDasharray="2 6"
            strokeDashoffset="10"
          />

          {/* Animated Progress Circles */}
          {[...Array(totalCircles)].map((_, index) => {
            const gap = 1;
            const angle = (index * 360) / totalCircles + gap * index; // Calculate angle with gap

            const strokeDashoffset = animationProgress.interpolate({
              inputRange: [0, totalCircles],
              outputRange: [circumference, 0],
            });

            return (
              <AnimatedCircle
                key={index}
                cx={125 + Math.cos((angle * Math.PI) / 180) * radius}
                cy={125 + Math.sin((angle * Math.PI) / 180) * radius}
                r={circleRadius}  
                stroke={colors[index]} 
                strokeWidth="5"  
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </G>
      </Svg>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ovulation Cycle</Text>
        <Text style={styles.dayCount}>
          <Text style={styles.largeText}>2nd</Text> Day
        </Text>
        <Text style={styles.subTitle}>High chance of getting pregnant</Text>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log Period</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: '25%',
    left: '20%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  dayCount: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 50,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 15,
    textAlign: 'center',
    maxWidth: 250,
  },
  button: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OvulationCircle;
