// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   StatusBar,
//   Animated,
//   SafeAreaView,
// } from 'react-native';
// import Svg, { Circle, G } from 'react-native-svg';
// import DayPicker from './CustomCalender';

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const OvulationCircle = () => {
//   const totalCircles = 33;
//   const circumference = 120; // Circumference of the circle
//   const radius = circumference / (1 * Math.PI); // Radius calculation

//   const animationProgress = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Animate the progress value from 0 to 28
//     Animated.timing(animationProgress, {
//       toValue: totalCircles, // Target value
//       duration: 3000, // Animation duration in milliseconds
//       useNativeDriver: false, // Opacity requires non-native driver
//     }).start();
//   }, [animationProgress]);

//   const colors = [
//     '#FF6B6B', '#FFE6AC', '#ADD8E6', '#FF6B6B', '#FFE6AC', '#ADD8E6',
//     '#FFE6AC', '#FFB6C1', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFE6AC',
//     '#90EE90', '#ADD8E6', '#90EE90', '#FFB6C1', '#ADD8E6', '#90EE90',
//     '#FFB6C1', '#ADD8E6', '#90EE90', '#FFB6C1', '#FFB6C1', '#ADD8E6',
//     '#90EE90', '#ADD8E6', '#90EE90', '#FFB6C1', '#d3d3d3', '#90EE90',
//   ];

//   const circleRadius = 1;

//   return (
//     <View style={{backgroundColor: 'green', height: 400, position: 'relative', flex: 1}} >
//       <StatusBar translucent={false} barStyle="light-content" />

//       {/* SVG Circle */}
//       <Svg height="600" width="600" viewBox="75 75 150 150">
//         <G rotation="-90" origin="125, 125">

//           <Circle
//             cx="125"
//             cy="125"
//             r={radius}
//             // stroke="#000000"
//             strokeWidth="10"
//             fill="none"
//             // cx="50"
//             // cy="50"
//             // r="145"
//             stroke="rgb(246, 79, 89)"
//             // strokeWidth="5"
//             fill="rgba(255,255,255,0.2)"
//             strokeDasharray="2 6"
//             strokeDashoffset="10"
//           />

//           {/* Animated Progress Circles */}
//           {[...Array(totalCircles)].map((_, index) => {
//             const gap = 1;
//             const angle = (index * 360) / totalCircles + gap * index; // Calculate angle with gap

//             const strokeDashoffset = animationProgress.interpolate({
//               inputRange: [0, totalCircles],
//               outputRange: [circumference, 0],
//             });

//             return (
//               <AnimatedCircle
//                 key={index}
//                 cx={125 + Math.cos((angle * Math.PI) / 180) * radius}
//                 cy={125 + Math.sin((angle * Math.PI) / 180) * radius}
//                 r={circleRadius}
//                 stroke={colors[index]}
//                 strokeWidth="5"
//                 fill="none"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={strokeDashoffset}
//               />
//             );
//           })}
//         </G>
//       </Svg>

//       {/* Text Content */}
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>Ovulation Cycle</Text>
//         <Text style={styles.dayCount}>
//           <Text style={styles.largeText}>2nd</Text> Day
//         </Text>
//         <Text style={styles.subTitle}>High chance of getting pregnant</Text>

//         {/* Button */}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Log Period</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.dayPickerContainer}>
//         <DayPicker />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   textContainer: {
//     position: 'absolute',
//     top: '10%',
//     left: '20%',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'black',
//     marginBottom: 10,
//   },
//   dayCount: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   largeText: {
//     fontSize: 50,
//     fontWeight: '700',
//     color: 'black'
//   },
//   subTitle: {
//     fontSize: 16,
//     color: 'black',
//     marginVertical: 15,
//     textAlign: 'center',
//     maxWidth: 250,
//   },
//   button: {
//     marginTop: 20,
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     paddingVertical: 12,
//     paddingHorizontal: 35,
//     borderRadius: 30,
//     backgroundColor: '#FF6B6B',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   dayPickerContainer: {
//     flex: 1,
//     marginTop: '100%',
//     marginBottom: 0,
//     // zIndex: 100,
//     position: 'absolute'
//   },
// });

// export default OvulationCircle;

// import React, {useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   StatusBar,
//   PanResponder,
//   Animated,
// } from 'react-native';
// import Svg, {Circle, G} from 'react-native-svg';
// import DayPicker from './CustomCalender';

// const OvulationCircle = () => {
//   const totalCircles = 30;
//   const circumference = 220; // Circumference of the circle
//   const radius = circumference / (1 * Math.PI); // Radius calculation

//   const rotationAnim = useRef(new Animated.Value(0)).current; // Track rotation
//   const [rotation, setRotation] = useState(0); // Current rotation in degrees
//   const [selectedDay, setSelectedDay] = useState(0); // Currently selected day

//   const updateDayFromRotation = normalizedAngle => {
//     const dayIndex = Math.floor((normalizedAngle / 360) * totalCircles);
//     setSelectedDay(dayIndex === 0 ? totalCircles : dayIndex); // Avoid 0 index
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (evt, gestureState) => {
//         const {moveX, moveY} = gestureState;
//         const centerX = 150;
//         const centerY = 150;

//         const dx = moveX - centerX;
//         const dy = moveY - centerY;

//         // Calculate angle using atan2
//         const calculatedAngle = Math.atan2(dy, dx) * (180 / Math.PI);
//         const normalizedAngle = (calculatedAngle + 360) % 360; // Normalize angle to 0-360
//         setRotation(normalizedAngle);

//         // Update animated rotation value
//         rotationAnim.setValue(normalizedAngle);

//         const dayIndex = Math.floor((normalizedAngle / 360) * totalCircles);
//         setSelectedDay(dayIndex);
//       },
//     }),
//   ).current;

//   const animatedRotation = rotationAnim.interpolate({
//     inputRange: [0, 360],
//     outputRange: ['0deg', '360deg'],
//   });

//   const colors = [
//     '#FF6B6B',
//     '#FFE6AC',
//     '#ADD8E6',
//     '#FF6B6B',
//     '#FFE6AC',
//     '#ADD8E6',
//     '#FFE6AC',
//     '#FFB6C1',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFB6C1',
//     '#FFE6AC',
//     '#90EE90',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFB6C1',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFB6C1',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFB6C1',
//     '#FFB6C1',
//     '#ADD8E6',
//     '#90EE90',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFB6C1',
//     '#d3d3d3',
//     '#90EE90',
//   ];
//   // Calculate position of each day in the circle
//   const getDayPosition = index => {
//     const angle = (index / totalCircles) * 360; // Calculate angle for each day
//     const x = radius * Math.cos((angle * Math.PI) / 180);
//     const y = radius * Math.sin((angle * Math.PI) / 180);
//     return {x: 150 + x, y: 150 + y}; // Position relative to the center of the circle
//   };

//   // const animatedRotation = rotationAnim.interpolate({
//   //   inputRange: [0, 360],
//   //   outputRange: ['0deg', '360deg'],
//   // });

//   // Handle day selection from the DayPicker
//   const handleDaySelection = day => {
//     const angle = (day / totalCircles) * 360;
//     setRotation(angle);
//     rotationAnim.setValue(angle);
//     setSelectedDay(day);
//   };
//   const circleRadius = 4.5; // Adjusted circle radius for better visibility

//   return (
//     <View style={styles.container}>
//       <StatusBar translucent={false} barStyle="light-content" />

//       {/* SVG Circle */}
//       <View {...panResponder.panHandlers}>
//         <Svg height="420" width="500" viewBox="0 0 300 300">
//           {/* Rotating Group */}
//           <Animated.View
//             style={{
//               transform: [{rotate: animatedRotation}], // Apply rotation
//               position: 'absolute',
//               left: 75,
//               top: 25,
//             }}>
//             <Svg height="340" width="340" viewBox="0 0 150 150">
//               <G origin="75, 75">
//                 {/* Static Background Circle */}
//                 <Circle
//                   cx="75"
//                   cy="75"
//                   r={radius}
//                   stroke="rgba(0, 0, 0, 0.2)"
//                   strokeWidth="1"
//                   fill="none"
//                 />

//                 {/* Progress Circles */}
//                 {[...Array(totalCircles)].map((_, index) => {
//                   const gap = 0;
//                   const angle = (index * 360) / totalCircles + gap * index; // Calculate angle with gap
//                   // const { x, y } = getDayPosition(index);
//                   return (
//                     <Circle
//                       key={index}
//                       cx={75 + Math.cos((angle * Math.PI) / 180) * radius}
//                       cy={75 + Math.sin((angle * Math.PI) / 180) * radius}
//                       // cx={75 + Math.cos((angle * Math.PI) / 180) * radius}
//                       // cy={75 + Math.sin((angle * Math.PI) / 180) * radius}
//                       r={circleRadius}
//                       stroke={colors[index % colors.length]}
//                       strokeWidth="1"
//                       fill="none"
//                     />
//                   );
//                 })}
//               </G>
//             </Svg>
//           </Animated.View>
//         </Svg>
//       </View>

//       {/* Text Content */}
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>Ovulation Cycle</Text>
//         <Text style={styles.dayCount}>
//           <Text style={styles.largeText}>2nd</Text> Day
//         </Text>
//         <Text style={styles.subTitle}>High chance of getting pregnant</Text>

//         {/* Button */}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Log Period</Text>
//         </TouchableOpacity>
//       </View>
//       {/* PanResponder for dragging the circle */}
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={[
//           styles.circleContainer,
//           {transform: [{rotate: animatedRotation}]},
//         ]}>
//         <View style={styles.circle}>
//           {/* <Text>dddd</Text> */}
//         </View>
//       </Animated.View>


//       {/* Day Picker */}
//       <View style={styles.dayPickerContainer}>
//         <DayPicker selectedDay={selectedDay} onDaySelect={handleDaySelection} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'green',
//     alignItems: 'center',
//   },
//   textContainer: {
//     position: 'absolute',
//     top: '10%',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//     marginBottom: 10,
//   },
//   dayCount: {
//     fontSize: 14,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   largeText: {
//     fontSize: 50,
//     fontWeight: '700',
//     color: 'white',
//   },
//   subTitle: {
//     fontSize: 16,
//     color: 'white',
//     marginVertical: 15,
//     textAlign: 'center',
//     maxWidth: 250,
//   },
//   button: {
//     marginTop: 20,
//     borderWidth: 2,
//     borderColor: 'white',
//     paddingVertical: 12,
//     paddingHorizontal: 35,
//     borderRadius: 30,
//     backgroundColor: '#FF6B6B',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   dayPickerContainer: {
//     flex: 1,
//     width: '100%',
//     marginTop: 'auto',
//   },
// });

// export default OvulationCircle;

import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  PanResponder,
  Animated,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import DayPicker from './CustomCalender';

const OvulationCircle = () => {
  const totalCircles = 30;
  const circumference = 220; // Circumference of the circle
  const radius = circumference / (1 * Math.PI); // Radius calculation

  const rotationAnim = useRef(new Animated.Value(0)).current; // Track rotation
  const [rotation, setRotation] = useState(0); // Current rotation in degrees
  const [selectedDay, setSelectedDay] = useState(0); // Currently selected day

  const updateDayFromRotation = (normalizedAngle) => {
    const dayIndex = Math.floor((normalizedAngle / 360) * totalCircles);
    setSelectedDay(dayIndex === 0 ? totalCircles : dayIndex); // Avoid 0 index
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const centerX = 150;
        const centerY = 150;

        const dx = moveX - centerX;
        const dy = moveY - centerY;

        // Calculate angle using atan2
        const calculatedAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const normalizedAngle = (calculatedAngle + 360) % 360; // Normalize angle to 0-360
        setRotation(normalizedAngle);

        // Update animated rotation value
        rotationAnim.setValue(normalizedAngle);

        const dayIndex = Math.floor((normalizedAngle / 360) * totalCircles);
        setSelectedDay(dayIndex);
      },
    })
  ).current;

  const animatedRotation = rotationAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const colors = [
    '#FF6B6B',
    '#FFE6AC',
    '#ADD8E6',
    '#FF6B6B',
    '#FFE6AC',
    '#ADD8E6',
    '#FFE6AC',
    '#FFB6C1',
    '#ADD8E6',
    '#90EE90',
    '#FFB6C1',
    '#FFE6AC',
    '#90EE90',
    '#ADD8E6',
    '#90EE90',
    '#FFB6C1',
    '#ADD8E6',
    '#90EE90',
    '#FFB6C1',
    '#ADD8E6',
    '#90EE90',
    '#FFB6C1',
    '#FFB6C1',
    '#ADD8E6',
    '#90EE90',
    '#ADD8E6',
    '#90EE90',
    '#FFB6C1',
    '#d3d3d3',
    '#90EE90',
  ];

  // Calculate position of each day in the circle
  const getDayPosition = (index) => {
    const angle = (index / totalCircles) * 360; // Calculate angle for each day
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return { x: 150 + x, y: 150 + y }; // Position relative to the center of the circle
  };

  // Handle day selection from the DayPicker
  const handleDaySelection = (day) => {
    const angle = (day / totalCircles) * 360;
    setRotation(angle);
    rotationAnim.setValue(angle);
    setSelectedDay(day);
  };

  const circleRadius = 4.5; // Adjusted circle radius for better visibility

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} barStyle="light-content" />

      {/* SVG Circle */}
      <View {...panResponder.panHandlers}>
        <Svg height="420" width="500" viewBox="0 0 300 300">
          {/* Rotating Group */}
          <Animated.View
            style={{
              transform: [{ rotate: animatedRotation }], // Apply rotation
              position: 'absolute',
              left: 75,
              top: 25,
            }}
          >
            <Svg height="340" width="340" viewBox="0 0 150 150">
              <G origin="75, 75">
                {/* Static Background Circle */}
                <Circle
                  cx="75"
                  cy="75"
                  r={radius}
                  stroke="rgba(0, 0, 0, 0.2)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* Progress Circles */}
                {[...Array(totalCircles)].map((_, index) => {
                  const gap = 0;
                  const angle = (index * 360) / totalCircles + gap * index; // Calculate angle with gap
                  return (
                    <Circle
                      key={index}
                      cx={75 + Math.cos((angle * Math.PI) / 180) * radius}
                      cy={75 + Math.sin((angle * Math.PI) / 180) * radius}
                      r={circleRadius}
                      stroke={colors[index % colors.length]}
                      strokeWidth="1"
                      fill="none"
                    />
                  );
                })}
              </G>
            </Svg>
          </Animated.View>
        </Svg>
      </View>

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

      {/* Day Picker */}
      <View style={styles.dayPickerContainer}>
        <DayPicker selectedDay={selectedDay} onDaySelect={handleDaySelection} rotation={rotation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  dayCount: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    marginVertical: 15,
    textAlign: 'center',
    maxWidth: 250,
  },
  button: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dayPickerContainer: {
    flex: 1,
    width: '100%',
    marginTop: 'auto',
  },
});

export default OvulationCircle;
