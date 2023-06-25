import { View, ScrollView, Text, Platform, Alert } from 'react-native';
import {
  Input,
  ButtonApp,
  DateTimeInput,
  SelectButton,
  MapInput,
  ArrowBack
} from '../../components';
import RedClockIcon from '../../../assets/redClockIcon.png';
import greenClockIcon from '../../../assets/greenClockIcon.png';
import styles from './styles';
import { useState } from 'react';

import data from './mockData';
import useGeoLocation from '../../hooks/useGeoLocation';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import dayjs from 'dayjs';

export default function CreateEventScreen({ navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);

  const [date2, setDate2] = useState(new Date(Date.now()));
  const [showPicker2, setShowPicker2] = useState(false);

  const [selectedItem, setSelectedItem] = useState(data[0].id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [local, setLocal] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const { location: initialLocation } = useGeoLocation();
  const { authToken, events, setEvents, logout } = useAuth();

  const onChangeDate = (event, value) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setDate(value);
  };

  const onChangeDate2 = (event, value) => {
    if (Platform.OS === 'android') {
      setShowPicker2(false);
    }
    setDate2(value);
  };

  const onItemSelected = (itemValue, _itemIndex) => {
    setSelectedItem(itemValue);
  };

  const handleCreateEvent = async () => {
    setLoading(true);

    if (!title) {
      setLoading(false);
      return Alert.alert('O título é obrigatório!');
    }

    if (!description) {
      setLoading(false);
      return Alert.alert('A descrição é obrigatória!');
    }

    if (!local) {
      setLoading(false);
      return Alert.alert('O local é obrigatório!');
    }

    if (!location) {
      setLoading(false);
      return Alert.alert('A localização no mapa é obrigatória!');
    }

    const newEvent = await api
      .post(
        '/event',
        {
          title,
          description,
          location: local,
          latitude: location.latitude,
          longitude: location.longitude,
          start_time: dayjs(date).format('HH:mm:ss'),
          end_time: dayjs(date2).format('HH:mm:ss'),
          type: selectedItem
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      )
      .then(res => res.data)
      .catch(err => {
        if (err.response && err.response.status === 401) {
          Alert.alert('Erro', 'Sessão expirada');
          logout().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }]
            });
          });
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          Alert.alert('Erro', err.response.data.error);
        }
      });

    if (newEvent) {
      Alert.alert('Sucesso!', 'Evento criado!');
      setEvents([...events, newEvent]);
      navigation.goBack();
    }

    setLoading(false);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    >
      <ArrowBack
        style={{ marginTop: 0, marginBottom: 12 }}
        onPress={() => navigation.goBack()}
      />

      <Input
        value={title}
        setValue={setTitle}
        isPassword={false}
        placeHolder={'Adicione um título'}
        labelText={'Título'}
        containerWidth={'90%'}
        marginBottom={15}
      />
      <Input
        value={description}
        setValue={setDescription}
        isPassword={false}
        placeHolder={'Adicone uma descrição de como funcionará seu evento'}
        labelText={'Descrição'}
        containerWidth={'90%'}
        containerHeight={200}
      />
      <Input
        value={local}
        setValue={setLocal}
        isPassword={false}
        placeHolder={'Rua, cidade e estado do evento'}
        labelText={'Local'}
        containerWidth={'90%'}
      />
      <View style={styles.hourDiv}>
        <Text style={styles.hourText}>Horário de inicio e fim</Text>
        <DateTimeInput
          containerHeight={'45%'}
          dateToShow={date}
          setDate={onChangeDate}
          showPicker={showPicker}
          setShow={setShowPicker}
          inputMode={'time'}
          rightSideIcon={greenClockIcon}
          marginTop={15}
        />

        <DateTimeInput
          containerHeight={'45%'}
          dateToShow={date2}
          setDate={onChangeDate2}
          showPicker={showPicker2}
          setShow={setShowPicker2}
          inputMode={'time'}
          rightSideIcon={RedClockIcon}
          marginTop={15}
        />
      </View>

      <SelectButton
        labelText={'Tipo'}
        itensList={data}
        itemToShow={selectedItem}
        setSelectItem={onItemSelected}
      />

      <MapInput
        value={location}
        onChange={setLocation}
        initialPosition={initialLocation}
      />

      <ButtonApp
        loading={loading}
        onPress={handleCreateEvent}
        buttonWidth={'90%'}
        buttonMargin={10}
        textValue={'Criar evento'}
      />
    </ScrollView>
  );
}
