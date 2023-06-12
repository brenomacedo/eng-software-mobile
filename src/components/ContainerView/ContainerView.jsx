import { View } from 'react-native';
import styles from './Styles';

export default function ContainerView(props) {
  return <View style={styles.Container}>{props.children}</View>;
}
