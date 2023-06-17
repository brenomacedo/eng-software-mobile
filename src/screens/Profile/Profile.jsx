import { View, Text } from 'react-native';
import ArrowBack from '../../components/ArrowBack/ArrowBack';

const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#212121',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <ArrowBack onPress={() => {}} />
      <Text
        style={{
          fontFamily: 'Poppins',
          color: 'white',
          fontSize: 18
        }}
      >
        Perfil
      </Text>
    </View>
  );
};

export default Profile;
