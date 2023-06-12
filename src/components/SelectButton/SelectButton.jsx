import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

export default function SelectButton({ itensList, setSelectItem, itemToShow }) {
  return (
    <View>
      <Picker selectedValue={'itemToShow'} onValueChange={setSelectItem}>
        {itensList.map(item => (
          <Picker.Item
            label={item.typeName}
            value={item.typeValue}
            key={item.id}
          />
        ))}
      </Picker>
    </View>
  );
}
/* { id: 1, typeName: 'tipo1', typeValue: 'tipo1' }, */
