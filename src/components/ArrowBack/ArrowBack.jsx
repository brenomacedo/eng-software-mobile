import { TouchableOpacity, Image } from 'react-native';
import BackArrow from '../../../assets/BackArrow.png';
import styles from './styles';

const ArrowBack = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.backArrowButton, ...(props.style ? props.style : {}) }}
      onPress={props.onPress}
    >
      <Image source={BackArrow} style={styles.backArrow} />
    </TouchableOpacity>
  );
};

export default ArrowBack;
