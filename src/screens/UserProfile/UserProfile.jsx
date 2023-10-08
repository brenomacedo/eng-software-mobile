import { Image, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { images } from '../../utils/consts';

const UserProfile = ({ navigation }) => {
  const goBack = () => navigation.goBack();

  const {
    params: { user }
  } = useRoute();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ArrowBack onPress={goBack} style={styles.arrowBack} />
        <Image
          source={images[user.profile_pic].source}
          style={styles.userProfilePic}
        ></Image>
        <Text style={styles.userName} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.userDescription}>{user.description}</Text>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
