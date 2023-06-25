import { Text, Platform, ScrollView, Alert } from 'react-native';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { ButtonApp, DateTimeInput, Input } from '../../components';
import { useState } from 'react';

import EmailVector from '../../../assets/EmailVector.png';
import UserNamevector from '../../../assets/UserNameVector.png';
import HomeVector from '../../../assets/HomeVector.png';
import BuildingVector from '../../../assets/BuildingVector.png';
import FactVector from '../../../assets/FactVector.png';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import dayjs from 'dayjs';

const Profile = ({ navigation }) => {
  const { authToken, user, address, logout, setUser, setAddress } = useAuth();
  const [date, setDate] = useState(new Date(user.birth_date));
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState(address.state);
  const [city, setCity] = useState(address.city);
  const [neighborhood, setNeighborhood] = useState(address.neighborhood);
  const [loading, setLoading] = useState(false);

  const onChangeDate = (event, value) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setDate(value);
  };

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

  const handleUpdate = async () => {
    setLoading(true);

    if (!name) {
      setLoading(false);
      return Alert.alert('Erro', 'O nome é obrigatório!');
    }

    if (!email) {
      setLoading(false);
      return Alert.alert('Erro', 'O email é obrigatório!');
    }

    const age = dayjs().diff(date, 'year');

    if (age < 16) {
      setLoading(false);
      return Alert.alert(
        'Erro',
        'O usuário deve ter, no mínimo, 16 anos de idade!'
      );
    }

    if (!city) {
      setLoading(false);
      return Alert.alert('Erro', 'A cidade é obrigatória!');
    }

    if (!state) {
      setLoading(false);
      return Alert.alert('Erro', 'O estado é obrigatório!');
    }

    if (!neighborhood) {
      setLoading(false);
      return Alert.alert('Erro', 'O bairro é obrigatório!');
    }

    console.log(user);

    Promise.all([
      api.patch(
        `/user/${user.id}`,
        {
          name,
          email,
          birth_date: dayjs(date).format('MM-DD-YYYY')
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      ),
      api.patch(
        `/address/${user.id}`,
        {
          neighborhood,
          city,
          state
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      )
    ])
      .then(() => {
        setUser({ ...user, name, email, birth_date: date.toISOString() });
        setAddress({ ...address, city, neighborhood, state });
        Alert.alert('Sucesso!', 'Dados atualizados com sucesso!');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          Alert.alert('Erro', 'Sessão expirada');
          logout()
            .then(() => navigation.navigate('LoginScreen'))
            .catch(() => {});
        } else {
          console.log(err.response.data);
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        backgroundColor: '#212121',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 30
      }}
    >
      <ArrowBack onPress={() => {}} style={{ marginLeft: -10 }} />
      <Text
        style={{
          fontFamily: 'Poppins',
          color: 'white',
          fontSize: 18,
          marginBottom: 10
        }}
      >
        Perfil
      </Text>
      <Input
        value={name}
        setValue={setName}
        isPassword={false}
        leftIcon={UserNamevector}
        placeHolder={'Nome'}
      />

      <DateTimeInput
        dateToShow={date}
        setDate={onChangeDate}
        showPicker={showPicker}
        setShow={setShowPicker}
        inputMode={'date'}
      />

      <Input
        value={email}
        setValue={setEmail}
        isPassword={false}
        leftIcon={EmailVector}
        placeHolder={'email'}
      />
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
        loading={loading}
        textValue={'Atualizar'}
        onPress={handleUpdate}
      />
    </ScrollView>
  );
};

export default Profile;
