import { View, Image, Text } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';
import UserNamevector from '../../../assets/UserNameVector.png';
import CalendarVector from '../../../assets/CalendarVector.png';
import { Input, ButtonApp, ContainerView } from '../../components/index.js';
import DateTimeInput from './components/DateTimeInput/DateTimeInput';

import styles from './styles/styles';
import { useState } from 'react';

export default function SignUpScreen() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showDateTime, setShowDateTime] = useState(false);

  const onDateChange = (event, value) => {
    setDate(value);
    setShowDateTime(false);
  };

  return (
    <ContainerView>
      <Image source={PickLogoWithText} style={styles.Image} />

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
          setDate={onDateChange}
          show={showDateTime}
          setShow={() => {
            setShowDateTime(!showDateTime);
          }}
        />

        {/* <Input
          isPassword={false}
          leftIcon={CalendarVector}
          placeHolder={'Data de Nascimento'}
        /> */}
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

        <ButtonApp textValue={'Criar conta'} />
        <Text style={styles.haveAccoount}>Já tenho uma conta</Text>
      </View>
    </ContainerView>
  );
}
