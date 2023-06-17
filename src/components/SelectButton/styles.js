import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  view: {
    width: '90%'
  },
  pickerView: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#D2D2D2',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 70 : 'auto'
  },
  picker: {
    backgroundColor: '#D2D2D2'
  },
  label: {
    color: 'white'
  }
});

export default styles;
