import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import DateIcon from '../../../../../assets/CalendarVector.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
export default function DateTimeInput({ dateToShow, setDate, show, setShow }) {
  function parseDate(string) {
    let stringV = string.split(' ');
    let newString = `${stringV[0]} ${stringV[1]} ${stringV[2]} ${stringV[3]}`;
    return newString;
  }

  return (
    <View style={styles.TextInput}>
      <TouchableOpacity
        onPress={() => {
          setShow();
        }}
        style={styles.Button}
      >
        <Image source={DateIcon} style={styles.Image} />
        <Text style={styles.Text}>{parseDate(dateToShow.toUTCString())}</Text>
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
