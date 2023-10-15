import { View, Image, Text, TouchableOpacity } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';
import useAuth from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';

import styles from './styles/styles';

import { Input, ButtonApp, ContainerView } from '../../components/index.js';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    setIsAuth,
    setUser,
    setEvents,
    setRequests,
    setAddress,
    setAuthToken
  } = useAuth();

  const handleLogin = async () => {
    setLoading(true);

    const data = await api
      .post('/user/login', {
        email: email.toLowerCase(),
        password
      })
      .then(res => res.data)
      .catch(() => null);

    if (data) {
      setAddress(data.user.address);
      delete data.user.address;

      setEvents(data.user.events);
      delete data.user.events;

      setRequests(data.user.requests);
      delete data.user.requests;

      setUser(data.user);
      setAuthToken(data.accessToken);
      setIsAuth(true);

      await AsyncStorage.setItem('token', data.accessToken);
      navigation.navigate('BottomTabNavigator');
    } else {
      alert('Usuário ou senha incorretos');
      setLoading(false);
    }
  };

  return (
    <ContainerView>
      <Image source={PickLogoWithText} style={styles.Image} />

      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Bem-Vindo!
        </Text>
        <Input
          value={email}
          setValue={setEmail}
          isPassword={false}
          leftIcon={EmailVector}
          placeHolder={'Email'}
        />
        <Input
          value={password}
          setValue={setPassword}
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Senha'}
        />

        <ButtonApp
          loading={loading}
          onPress={handleLogin}
          textValue={'Login'}
        />
        <View
          style={{ flexDirection: 'row', maxWidth: '70%', marginVertical: 4 }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              height: 2,
              alignSelf: 'center'
            }}
          />
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              marginRight: 10,
              fontFamily: 'Poppins'
            }}
          >
            OU
          </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              height: 2,
              alignSelf: 'center'
            }}
          />
        </View>
        <ButtonApp
          loading={loading}
          textValue={'Criar conta'}
          navigation={navigation}
          screen={'UserProfileRegisterScreen'}
        />
        <TouchableOpacity
          style={{ marginTop: 16 }}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={{ color: 'white', fontFamily: 'Poppins' }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
}
