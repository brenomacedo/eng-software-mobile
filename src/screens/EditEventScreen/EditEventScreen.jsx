import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  Platform,
  Alert
} from 'react-native';
import {
  Input,
  ButtonApp,
  DateTimeInput,
  SelectButton,
  MapInput
} from '../../components';
import BackArrow from '../../../assets/BackArrow.png';
import RedClockIcon from '../../../assets/redClockIcon.png';
import greenClockIcon from '../../../assets/greenClockIcon.png';
import styles from './styles';
import { useState } from 'react';
import data from './mockData';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import dayjs from 'dayjs';

export default function EditEventScreen({ navigation, route }) {
  const {
    title,
    Edescription,
    location,
    start_time,
    end_time,
    type,
    longitude,
    latitude,
    event_id
  } = route.params;

  const { authToken, logout } = useAuth();

  const [date, setDate] = useState(
    new Date(
      new Date().setHours(start_time.slice(0, 2), start_time.slice(3, 5))
    )
  );
  const [showPicker, setShowPicker] = useState(false);

  const [date2, setDate2] = useState(
    new Date(new Date().setHours(end_time.slice(0, 2), end_time.slice(3, 5)))
  );
  const [showPicker2, setShowPicker2] = useState(false);

  const [selectedItem, setSelectedItem] = useState(type);

  const [tittle, setTittle] = useState(title);
  const [description, setDescription] = useState(Edescription);
  const [place, setPlace] = useState(location);

  const [mapLocation, setMapLocation] = useState({ latitude, longitude });

  const [loading, setLoading] = useState(false);

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

  const handleEditRequest = async () => {
    setLoading(true);
    try {
      const response = await api
        .patch(
          `/event/${event_id}`,
          {
            title: tittle,
            description,
            location: place,
            latitude: mapLocation.latitude,
            longitude: mapLocation.longitude,
            start_time: dayjs(date).format('HH:mm:ss'),
            end_time: dayjs(date2).format('HH:mm:ss')
          },
          {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          }
        )
        .then(res => res.data);
      if (response) {
        Alert.alert('Sucesso!', 'Evento atualizado!');
        navigation.goBack();
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        Alert.alert('Erro', 'Sessão expirada');
        logout().then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }]
          });
        });
      } else if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      }
    }
  };

  const handleDeleteRequest = () => {
    setLoading(true);
    api
      .delete(`/event/${event_id}`, {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      })
      .then(() => {
        Alert.alert('Evento deletado');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro ao deletar evento'))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.eventTitle}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrowButton}
      >
        <Image style={styles.arrowImage} source={BackArrow} />
      </TouchableOpacity>

      <Input
        isPassword={false}
        placeHolder={'Adicione um título'}
        labelText={'Título'}
        containerWidth={'90%'}
        value={tittle}
        setValue={setTittle}
        marginBottom={15}
      />
      <Input
        isPassword={false}
        placeHolder={'Adicone uma descrição de como funcionará seu evento'}
        labelText={'Descrição'}
        containerWidth={'90%'}
        containerHeight={200}
        value={description}
        setValue={setDescription}
      />
      <Input
        isPassword={false}
        placeHolder={'Rua, cidade e estado do evento'}
        labelText={'Local'}
        containerWidth={'90%'}
        value={place}
        setValue={setPlace}
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
        value={mapLocation}
        onChange={setMapLocation}
        initialPosition={mapLocation}
      />

      <ButtonApp
        loading={loading}
        buttonWidth={'90%'}
        buttonMargin={10}
        textValue={'Atualizar'}
        onPress={handleEditRequest}
      />
      <View style={styles.lineSeparator}></View>
      <ButtonApp
        loading={loading}
        buttonWidth={'90%'}
        buttonMargin={10}
        textValue={'Deletar'}
        onPress={handleDeleteRequest}
      />
    </ScrollView>
  );
}
