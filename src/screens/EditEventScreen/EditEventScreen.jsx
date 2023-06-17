import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  Platform
} from 'react-native';
import {
  ContainerView,
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

export default function EditEventScreen() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);

  const [date2, setDate2] = useState(new Date(Date.now()));
  const [showPicker2, setShowPicker2] = useState(false);

  const [selectedItem, setSelectedItem] = useState(data[0].typeValue);

  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');

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

  const onItemSelected = (itemValue, itemIndex) => {
    setSelectedItem(itemValue);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.eventTitle}>Calourada da computaria</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <Image style={styles.arrowImage} source={BackArrow} />
      </TouchableOpacity>

      <Input
        isPassword={false}
        placeHolder={'Adicione um título'}
        labelText={'Título'}
        containerWidth={'90%'}
        value={tittle}
        setValue={setTittle}
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
        />

        <DateTimeInput
          containerHeight={'45%'}
          dateToShow={date2}
          setDate={onChangeDate2}
          showPicker={showPicker2}
          setShow={setShowPicker2}
          inputMode={'time'}
          rightSideIcon={RedClockIcon}
        />
      </View>

      <SelectButton
        labelText={'Tipo'}
        itensList={data}
        itemToShow={selectedItem}
        setSelectItem={onItemSelected}
      />

      <MapInput />

      <ButtonApp
        buttonWidth={'90%'}
        buttonMargin={10}
        textValue={'Atualizar'}
      />
    </ScrollView>
  );
}
