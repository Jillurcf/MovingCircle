import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CircularProgress } from 'react-native-svg-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import OvulationCircle from './src/screen/OvulationCircle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DayPicker from './src/screen/CustomCalender';

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{flex: 1}}>
      <OvulationCircle />
      {/* <DayPicker /> */}
    </View>
    </GestureHandlerRootView>
    
     
    // <View style={styles.container}>
    //   {/* Header Section */}
    //   <View style={styles.header}>
    //     <Text style={styles.title}>The Eve Cycle</Text>
    //     <Icon name="notifications-outline" size={24} color="#fff" />
    //   </View>

    //   {/* Circular Progress Indicator */}
    //   <View style={styles.circularProgressContainer}>
    //     <CircularProgress
    //       size={200}
    //       width={10}
    //       backgroundWidth={5}
    //       fill={60} // Example: 60% of the cycle completed
    //       tintColor="#F15BB5"
    //       backgroundColor="#D1D1D1"
    //       lineCap="round"
    //     >
    //       {() => (
    //         <View style={styles.ovulationInfo}>
    //           <Text style={styles.dayText}>2nd</Text>
    //           <Text style={styles.infoText}>High chance of getting pregnant</Text>
    //         </View>
    //       )}
    //     </CircularProgress>
    //   </View>

    //   {/* Action Button */}
    //   <TouchableOpacity style={styles.logButton}>
    //     <Text style={styles.logButtonText}>Log Period</Text>
    //   </TouchableOpacity>

    //   {/* Calendar Section */}
    //   <View style={styles.calendarContainer}>
    //     <Calendar
    //       markedDates={{
    //         '2024-12-07': { marked: true, dotColor: '#F15BB5' },
    //         '2024-12-08': { marked: true, dotColor: '#F15BB5' },
    //         '2024-12-09': { marked: true, dotColor: '#F15BB5' },
    //         '2024-12-10': { marked: true, dotColor: '#FFD166' },
    //       }}
    //       theme={{
    //         todayTextColor: '#F15BB5',
    //         selectedDayBackgroundColor: '#FFD166',
    //       }}
    //     />
    //   </View>
    // </View>
  );
};

export default App;

