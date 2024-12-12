// import React, {useState} from 'react';
// import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
// import moment from 'moment';

// const DayPicker = () => {
//   const [selectedDays, setSelectedDays] = useState([]); // Array of selected dates
//   const daysInMonth = getDaysInMonth(moment().month(), moment().year()); // Generate days for the current month

//   // Helper function to generate all days in a given month
//   function getDaysInMonth(month, year) {
//     const startOfMonth = moment({year, month}).startOf('month');
//     const endOfMonth = moment({year, month}).endOf('month');
//     const days = [];

//     let day = startOfMonth;
//     while (day <= endOfMonth) {
//       days.push(day.format('YYYY-MM-DD'));
//       day = day.clone().add(1, 'day');
//     }
//     return days;
//   }

//   // Function to toggle a date in the selectedDays array
//   const toggleDate = date => {
//     if (selectedDays.includes(date)) {
//       // Remove date if already selected
//       setSelectedDays(selectedDays.filter(d => d !== date));
//     } else {
//       // Add date if not already selected
//       setSelectedDays([...selectedDays, date]);
//     }
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: '#fff'}}>
//       <View style={styles.container}>
//         {/* Month and Year Header */}
//         <Text style={styles.headerText}>{moment().format('MMM, YYYY')}</Text>

//         {/* Horizontal Day Picker */}
//         <FlatList
//           horizontal
//           data={daysInMonth}
//           keyExtractor={item => item}
//           renderItem={({item}) => {
//             const isSelected = selectedDays.includes(item);
//             return (
//               <TouchableOpacity
//                 style={[
//                   styles.dayContainer,
//                   isSelected && styles.selectedDayContainer,
//                 ]}
//                 onPress={() => toggleDate(item)}>
//                 <Text
//                   style={[
//                     styles.dayText,
//                     isSelected && styles.selectedDayText,
//                   ]}>
//                   {moment(item).format('D')}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.weekdayText,
//                     isSelected && styles.selectedWeekdayText,
//                   ]}>
//                   {moment(item).format('ddd')}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.flatListContent}
//         />

//         {/* Selected Dates Display */}
//         <View style={styles.selectedDatesContainer}>
//           <Text style={styles.selectedDatesTitle}>Selected Dates:</Text>
//           {selectedDays.length > 0 ? (
//             <Text style={styles.selectedDatesText}>
//               {selectedDays.join(', ')}
//             </Text>
//           ) : (
//             <Text style={styles.selectedDatesText}>None</Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     padding: 20,
    
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     // textAlign: 'center',
//     // marginBottom: 10,
//     color: '#000',
//   },
//   flatListContent: {
//     alignItems: 'center',
//   },
//   dayContainer: {
//     width: 60,
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   selectedDayContainer: {
//     backgroundColor: '#A3D4A9',
//   },
//   dayText: {
//     fontSize: 18,
//     color: '#333',
//     fontWeight: '500',
//   },
//   selectedDayText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   weekdayText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   selectedWeekdayText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   selectedDatesContainer: {
//     marginTop: 20,
//   },
//   selectedDatesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   selectedDatesText: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default DayPicker;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

const DayPicker = ({ selectedDay, onDaySelect, rotation }) => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    const days = getDaysInMonth(moment().month(), moment().year());
    setDaysInMonth(days);
  }, []);

  useEffect(() => {
    if (flatListRef.current && selectedDay) {
      const index = selectedDay - 1; // Convert to 0-based index
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  }, [selectedDay]);

  // Helper function to generate all days in a given month
  function getDaysInMonth(month, year) {
    const startOfMonth = moment({ year, month }).startOf('month');
    const endOfMonth = moment({ year, month }).endOf('month');
    const days = [];

    let day = startOfMonth;
    while (day <= endOfMonth) {
      days.push(day.format('YYYY-MM-DD'));
      day = day.clone().add(1, 'day');
    }
    return days;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Month and Year Header */}
        <Text style={styles.headerText}>{moment().format('MMM, YYYY')}</Text>

        {/* Horizontal Day Picker */}
        <FlatList
          ref={flatListRef}
          horizontal
          data={daysInMonth}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            const isSelected = selectedDay === index + 1; // 1-based index
            return (
              <TouchableOpacity
                style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}
                onPress={() => onDaySelect(index + 1)}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                  {moment(item).format('D')}
                </Text>
                <Text style={[styles.weekdayText, isSelected && styles.selectedWeekdayText]}>
                  {moment(item).format('ddd')}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  flatListContent: {
    alignItems: 'center',
  },
  dayContainer: {
    width: 60,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedDayContainer: {
    backgroundColor: '#A3D4A9',
  },
  dayText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weekdayText: {
    fontSize: 12,
    color: '#666',
  },
  selectedWeekdayText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default DayPicker;
