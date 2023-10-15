import { View, Image, Text } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';

import styles from './styles';

import { Input, ButtonApp } from '../../components/index.js';
import { useState } from 'react';

export default function RecoverPassword({ _navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        backgroundColor: '#212121',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flex: 1,
        fontFamily: 'Poppins',
        justifyContent: 'center'
      }}
    >
      <Image source={PickLogoWithText} style={styles.Image} />

      <View style={styles.InputsButtonsContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'PoppinsRegular'
          }}
        >
          Olá, Usuário!
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontFamily: 'Poppins',
            textAlign: 'center',
            width: 280,
            marginBottom: 18
          }}
        >
          Redefina sua senha preenchendo os campos abaixo
        </Text>
        <Input
          value={password}
          setValue={setPassword}
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Nova senha'}
        />
        <Input
          value={confirmPassword}
          setValue={setConfirmPassword}
          isPassword={true}
          leftIcon={PasswordVector}
          OptionOneRightIcon={ShowPassVector}
          OptionTwoRightIcon={DontShowPassVector}
          placeHolder={'Confirme sua nova senha'}
        />

        <ButtonApp
          loading={loading}
          onPress={() => {}}
          textValue={'Alterar senha'}
        />
      </View>
    </View>
  );
}
