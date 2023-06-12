import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function ButtonApp({ textValue, navigation, screen }) {
  return (
    <TouchableOpacity
      style={styles.Button}
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
