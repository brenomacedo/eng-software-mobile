import { KeyboardAvoidingView, Platform } from 'react-native';
import styles from './Styles';

export default function ContainerView(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
      style={styles.Container}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
}