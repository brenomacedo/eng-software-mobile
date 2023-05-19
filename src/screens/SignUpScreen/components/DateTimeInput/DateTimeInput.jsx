import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import DateIcon from '../../../../../assets/CalendarVector.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
export default function DateTimeInput({ dateToShow, setDate, show, setShow }) {
  return (
    <View style={styles.containerView}>
      <TouchableOpacity
        onPress={() => {
          setShow();
        }}
      >
        <Image source={DateIcon} style={styles.Image} />
        <Text style={styles.TextInput}>{dateToShow.toUTCString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={dateToShow}
          mode="date"
          display={Platform.OS == 'ios' ? 'spinner' : 'default'}
          onChange={setDate}
        />
      )}
    </View>
  );
}
