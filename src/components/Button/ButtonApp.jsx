import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function ButtonApp({
  textValue,
  navigation,
  screen,
  buttonWidth,
  buttonMargin,
  loading,
  onPress
}) {
  return (
    <TouchableOpacity
      disabled={loading}
      style={styles.Button(buttonWidth, buttonMargin, loading)}
      onPress={
        onPress
          ? onPress
          : () => {
              if (navigation && screen) {
                navigation.navigate(screen);
              }
            }
      }
    >
      <Text style={{ color: 'white' }}>{textValue}</Text>
    </TouchableOpacity>
  );
}
