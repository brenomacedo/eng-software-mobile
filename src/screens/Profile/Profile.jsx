import {
  Text,
  Platform,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Dimensions
} from 'react-native';
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
import Biografia from '../../../assets/Biografia.png';
import { images } from '../../utils/consts';

const Profile = ({ navigation }) => {
  const { authToken, user, address, logout, setUser, setAddress } = useAuth();
  const [date, setDate] = useState(new Date(user.birth_date || 0));
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState(user.nam || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.description || '');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState(address.state);
  const [city, setCity] = useState(address.city);
  const [neighborhood, setNeighborhood] = useState(address.neighborhood);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profile_pic);

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

    Promise.all([
      api.patch(
        `/user/${user.id}`,
        {
          name,
          email,
          birth_date: dayjs(date).format('MM-DD-YYYY'),
          profile_pic: profilePic,
          description: bio
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      ),
      api.patch(
        `/address/${address.id}`,
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

  //Lógica de abrir e fechar janela para escolher foto
  const [JanelaVisivel, setJanelaVisivel] = useState(false);

  const abrirJanela = () => {
    setJanelaVisivel(true);
  };

  const fecharJanela = () => {
    setJanelaVisivel(false);
  };

  //Fotos de perfis possíveis

  const GridImages = () => {
    return (
      <FlatList
        data={images}
        numColumns={2} // 4 columns for a 2x4 grid
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          width: '100%'
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setProfilePic(item.id);
              fecharJanela();
            }}
          >
            <Image
              source={item.source}
              style={{
                width: (Dimensions.get('screen').width * 0.9 - 60) / 2,
                height: (Dimensions.get('screen').width * 0.9 - 60) / 2,
                borderRadius: 75,
                marginRight: 20,
                marginBottom: 20,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
        )}
      />
    );
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
      <ArrowBack
        onPress={() => navigation.goBack()}
        style={{ marginLeft: -10 }}
      />
      <Text
        style={{
          fontFamily: 'Poppins',
          color: 'white',
          fontSize: 18,
          marginBottom: 30,
          marginTop: 20
        }}
      >
        Perfil
      </Text>

      {/* Parte da foto do usuário*/}
      <View>
        <Image
          source={images[profilePic].source}
          style={{
            width: 210,
            height: 210,
            borderRadius: 105,
            marginBottom: 30,
            resizeMode: 'contain'
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 148,
            bottom: 20
          }}
          onPress={abrirJanela}
        >
          <Image
            source={require('../../../assets/Foto.png')}
            style={{
              height: 72,
              width: 72,
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Abre a janela para mudar a foto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={JanelaVisivel}
        onRequestClose={fecharJanela}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0)' // Semi-transparent background
          }}
        >
          <View
            style={{
              backgroundColor: 'rgb(42,42,42)',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              width: '90%',
              height: '85%'
            }}
          >
            {/* Titulo */}
            <Text
              style={{
                fontFamily: 'Poppins',
                color: 'white',
                fontSize: 18,
                marginBottom: 30,
                marginTop: 5
              }}
            >
              Foto de Perfil
            </Text>

            {/* Botão de exitJanela */}
            <TouchableOpacity
              title="Close"
              onPress={fecharJanela}
              style={{
                position: 'absolute',
                top: -20,
                left: '99%'
              }}
            >
              <Image
                source={require('../../../assets/ExitFotos.png')}
                style={{
                  height: 61,
                  width: 61,
                  resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>

            <GridImages></GridImages>
          </View>
        </View>
      </Modal>

      <Input
        value={name}
        setValue={setName}
        isPassword={false}
        leftIcon={UserNamevector}
        placeHolder={'Nome'}
      />
      <Input
        value={bio}
        setValue={bio => setBio(bio)}
        isPassword={false}
        leftIcon={Biografia}
        placeHolder={'Biografia'}
        containerHeight={218}
        lineHeight={24}
        multiline={true}
        numberOfLines={8}
        textInputStyle={{ paddingTop: 18 }}
      />

      <Text
        style={{
          fontFamily: 'Poppins',
          color: 'white',
          fontSize: 18,
          marginBottom: 10
        }}
      >
        Informações Pessoais
      </Text>

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
