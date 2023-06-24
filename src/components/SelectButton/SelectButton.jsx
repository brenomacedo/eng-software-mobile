import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import styles from './styles';

export default function SelectButton({
  itensList,
  setSelectItem,
  itemToShow,
  labelText
}) {
  return (
    <View style={styles.view}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}

      <View style={styles.pickerView}>
        <Picker
          selectedValue={itemToShow}
          onValueChange={setSelectItem}
          style={styles.picker}
        >
          {itensList.map(item => (
            <Picker.Item label={item.label} value={item.id} key={item.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
/* { id: 1, typeName: 'tipo1', typeValue: 'tipo1' }, */
