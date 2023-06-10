import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function ButtonApp({ textValue }) {
  return (
    <TouchableOpacity style={styles.Button}>
      <Text style={{ color: 'white' }}>{textValue}</Text>
    </TouchableOpacity>
  );
}
