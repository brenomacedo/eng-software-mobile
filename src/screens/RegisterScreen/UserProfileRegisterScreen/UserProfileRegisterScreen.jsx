import { View, Image, Text, Platform, TouchableOpacity } from 'react-native';
import PickLogoWithText from '../../../../assets/LogoWithName.png';
import EmailVector from '../../../../assets/EmailVector.png';
import PasswordVector from '../../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../../assets/ShowPassVector.png';
import UserNamevector from '../../../../assets/UserNameVector.png';

import { Input, ButtonApp, ContainerView } from '../../../components/index.js';
import DateTimeInput from '../../../components/DateTimeInput/DateTimeInput';
/* import DateTimePicker from '@react-native-community/datetimepicker';
 */
import styles from './styles/styles';
import { useState } from 'react';

export default function UserProfileRegisterScreen({ navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, value) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setDate(value);
  };

  return (
    <ContainerView>
      <Image source={PickLogoWithText} style={[styles.Image]} />

      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Cadastro!
        </Text>
        <Input
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
          isPassword={false}
          leftIcon={EmailVector}
          placeHolder={'email'}
        />
        <Input
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Senha'}
        />
        <Input
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Confime sua senha'}
        />

        <ButtonApp
          textValue={'Próximo passo'}
          navigation={navigation}
          screen={'AddressRegisterScreen'}
        />
        <TouchableOpacity
          style={styles.haveAccoountButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.haveAccoount}>Já tenho uma conta!</Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
}
