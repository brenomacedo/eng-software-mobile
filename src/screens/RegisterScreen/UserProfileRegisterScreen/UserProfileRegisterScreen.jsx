import {
  View,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import PickLogoWithText from '../../../../assets/LogoWithName.png';
import EmailVector from '../../../../assets/EmailVector.png';
import PasswordVector from '../../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../../assets/ShowPassVector.png';
import UserNamevector from '../../../../assets/UserNameVector.png';
import dayjs from 'dayjs';

import { Input, ButtonApp, ContainerView } from '../../../components/index.js';
import DateTimeInput from '../../../components/DateTimeInput/DateTimeInput';
/* import DateTimePicker from '@react-native-community/datetimepicker';
 */
import styles from './styles/styles';
import { useState } from 'react';

export default function UserProfileRegisterScreen({ navigation }) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChangeDate = (event, value) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setDate(value);
  };

  const handleNextScreen = async () => {
    const age = dayjs().diff(date, 'year');

    if (age < 16) {
      return Alert.alert(
        'Erro',
        'O usuário deve ter, no mínimo, 16 anos de idade!'
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert('Erro', 'A senha é diferente da confirmação!');
    }

    if (!name) {
      return Alert.alert('Erro', 'O nome é um campo obrigatório!');
    }

    if (!email) {
      return Alert.alert('Erro', 'O email é um campo obrigatório!');
    }

    if (!password) {
      return Alert.alert('Erro', 'A senha é um campo obrigatório!');
    }

    navigation.navigate('AddressRegisterScreen', {
      name,
      email,
      password,
      birth_date: date.toISOString()
    });
  };

  return (
    <ContainerView>
      <Image source={PickLogoWithText} style={[styles.Image]} />

      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Cadastro!
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
          value={password}
          setValue={setPassword}
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Senha'}
        />
        <Input
          value={confirmPassword}
          setValue={setConfirmPassword}
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Confime sua senha'}
        />

        <ButtonApp textValue={'Próximo passo'} onPress={handleNextScreen} />
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
