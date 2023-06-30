import { Alert, Image, Text, View } from 'react-native';
import { ContainerView, Input, ButtonApp } from '../../../components';
import PickUpPal from '../../../../assets/LogoWithName.png';
import HomeVector from '../../../../assets/HomeVector.png';
import BuildingVector from '../../../../assets/BuildingVector.png';
import FactVector from '../../../../assets/FactVector.png';
import styles from './styles/styles';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
import { useState } from 'react';
import axios from 'axios';
import api from '../../../api';
import useAuth from '../../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddressRegisterScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const { setIsAuth, setUser, setAddress, setAuthToken } = useAuth();

  const { name, email, password, birth_date } = route.params;

  const handleCepFieldBlur = async () => {
    if (postalCode.match(/[0-9]{8}/)) {
      const addressInfo = await axios
        .get(`http://viacep.com.br/ws/${postalCode}/json/`)
        .then(res => res.data)
        .catch(null);

      if (addressInfo && !addressInfo.erro) {
        setState(addressInfo.uf);
        setCity(addressInfo.localidade);
        setNeighborhood(addressInfo.bairro);
      }
    }
  };

  const handleRegister = async () => {
    
    setLoading(true);

    const data = await api
      .post('/user/signup', {
        name,
        email: email.toLowerCase(),
        password,
        birth_date
      })
      .then(res => res.data)
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          Alert.alert('Erro', err.response.data.error);
        }

        return null;
      });

      console.log(data)

    if (!data) {
      
      return setLoading(false);
    }



    const user = data.user;
    const authToken = data.accessToken;
    setUser(user);

    const address = await api
      .post('/address', {
        user_id: user.id,
        neighborhood,
        state,
        city
      })
      .then(res => res.data)
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          Alert.alert('Erro', err.response.data.error);
        }

        return null;
      });

    if (!address) {
      return setLoading(false);
    }

    setAddress(address);
    setAuthToken(authToken);
    setIsAuth(true);
    await AsyncStorage.setItem('token', authToken);

    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabNavigator' }]
    });
  };

  return (
    <ContainerView>
      <ArrowBack style={{ marginTop: 0 }} onPress={() => navigation.goBack()} />
      <Image source={PickUpPal} style={styles.Image} />
      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Cadastro do endereço
        </Text>
        <Input
          value={postalCode}
          setValue={setPostalCode}
          onBlur={handleCepFieldBlur}
          isPassword={false}
          leftIcon={HomeVector}
          placeHolder={'CEP'}
        />
        <Input
          value={state}
          setValue={setState}
          isPassword={false}
          leftIcon={BuildingVector}
          placeHolder={'Estado'}
        />
        <Input
          value={city}
          setValue={setCity}
          isPassword={false}
          leftIcon={FactVector}
          placeHolder={'Cidade'}
        />
        <Input
          value={neighborhood}
          setValue={setNeighborhood}
          isPassword={false}
          leftIcon={HomeVector}
          placeHolder={'Bairro'}
        />
        <ButtonApp
          onPress={handleRegister}
          loading={loading}
          textValue={'Criar conta'}
        />
      </View>
    </ContainerView>
  );
}
