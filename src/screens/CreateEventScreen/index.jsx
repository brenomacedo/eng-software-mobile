import { TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
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

export default function CreateEventScreen() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);

  const [date2, setDate2] = useState(new Date(Date.now()));
  const [showPicker2, setShowPicker2] = useState(false);

  const [selectedItem, setSelectedItem] = useState(data[0].typeValue);

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
    <ContainerView>
      <TouchableOpacity style={styles.arrowButton}>
        <Image style={styles.arrowImage} source={BackArrow} />
      </TouchableOpacity>

      <ScrollView
        contentInsetAdjustmentBehavior=".never"
        contentContainerStyle={styles.scroll}
      >
        <Input
          isPassword={false}
          placeHolder={'Adicione um título'}
          labelText={'Título'}
          containerWidth={'90%'}
        />
        <Input
          isPassword={false}
          placeHolder={'Adicone uma descrição de como funcionará seu evento'}
          labelText={'Descrição'}
          containerWidth={'90%'}
          containerHeight={200}
        />
        <Input
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

        {/* <ButtonApp textValue={'Criar evento'} /> */}
      </ScrollView>
    </ContainerView>
  );
}
