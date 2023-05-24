import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import DateIcon from '../../../../../../assets/CalendarVector.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

export default function DateTimeInput({
  dateToShow,
  setDate,
  setShow,
  showPicker
}) {
  return (
    <View style={styles.TextInput}>
      <TouchableOpacity onPress={setShow} style={styles.Button}>
        <Image source={DateIcon} style={styles.Image} />
        <Text style={styles.Text}>{dateToShow.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dateToShow}
          mode={'date'}
          display={Platform.OS == 'ios' ? 'spinner' : 'default'}
          onChange={setDate}
        />
      )}
    </View>
  );
}
