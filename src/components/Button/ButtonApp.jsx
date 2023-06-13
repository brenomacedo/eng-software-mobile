import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function ButtonApp({
  textValue,
  navigation,
  screen,
  buttonWidth,
  buttonMargin
}) {
  return (
    <TouchableOpacity
      style={styles.Button(buttonWidth, buttonMargin)}
      onPress={() => {
        if (navigation && screen) {
          navigation.navigate(screen);
        }
      }}
    >
      <Text style={{ color: 'white' }}>{textValue}</Text>
    </TouchableOpacity>
  );
}
