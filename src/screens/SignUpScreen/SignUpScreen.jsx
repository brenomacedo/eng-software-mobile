import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';
import UserNamevector from '../../../assets/UserNameVector.png';
import CalendarVector from '../../../assets/CalendarVector.png';

import styles from './styles/styles';

import { Input, ButtonApp } from '../../components/index.js';

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Container}
    >
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
        <Input
          isPassword={false}
          leftIcon={CalendarVector}
          placeHolder={'Data de Nascimento'}
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

        <ButtonApp textValue={'Criar conta'} />
        <Text style={styles.haveAccoount}>Já tenho uma conta</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
