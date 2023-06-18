import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import DateIcon from '../../../assets/CalendarVector.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

export default function DateTimeInput({
  dateToShow,
  setDate,
  setShow,
  showPicker,
  inputMode,
  containerHeight,
  rightSideIcon,
  marginTop
}) {
  return (
    <View style={styles.TextInput(containerHeight, marginTop)}>
      <TouchableOpacity onPress={setShow} style={styles.Button}>
        <Image
          source={rightSideIcon ? rightSideIcon : DateIcon}
          style={styles.Image}
        />
        <Text style={styles.Text}>
          {inputMode == 'time'
            ? dateToShow.toLocaleTimeString('pt-BR').slice(0, 5)
            : dateToShow.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dateToShow}
          mode={inputMode ? inputMode : 'date'}
          display={Platform.OS == 'ios' ? 'spinner' : 'default'}
          onChange={setDate}
        />
      )}
    </View>
  );
}
