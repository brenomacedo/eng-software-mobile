import { View, Image, Text, Alert } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';

import styles from './styles';

import { Input, ButtonApp } from '../../components/index.js';
import { useState } from 'react';
import api from '../../api';

export default function RecoverPassword({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { queryParams } = route.params;

  const recoverPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      return Alert.alert(
        'Erro',
        'As senha e a confirmação de senha são diferentes!'
      );
    }

    await api
      .post('/changepassword', {
        token: queryParams.token,
        password
      })
      .then(() => {
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigation.replace('LoginScreen');
      })
      .catch(() => {
        Alert.alert('Erro', 'Token de recuperação de senha inválido!');
      });

    setLoading(false);
  };

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
          Olá, {queryParams.user}!
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
          onPress={recoverPassword}
          textValue={'Alterar senha'}
        />
      </View>
    </View>
  );
}
