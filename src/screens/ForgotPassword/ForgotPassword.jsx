import { View, Image, Text, Alert } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';

import styles from './styles';

import { Input, ButtonApp, ArrowBack } from '../../components/index.js';
import { useState } from 'react';
import api from '../../api';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    setLoading(true);
    await api.post('/recoverpassword', {
      email
    });

    Alert.alert(
      'Email enviado',
      'Caso seu usuário exista, um email foi enviado com os próximos passos da redefinição de senha.'
    );
    navigation.goBack();
    setLoading(false);
  };

  return (
    <View
      style={{
        backgroundColor: '#313131',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flex: 1,
        fontFamily: 'Poppins'
      }}
    >
      <ArrowBack onPress={navigation.goBack} />
      <View
        style={{
          backgroundColor: '#313131',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          flex: 1,
          fontFamily: 'Poppins'
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
            Redefinir senha
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
            Informe o email da sua conta para redefinir sua senha
          </Text>
          <Input
            value={email}
            setValue={setEmail}
            isPassword={false}
            leftIcon={EmailVector}
            placeHolder={'Email'}
          />

          <ButtonApp
            loading={loading}
            onPress={sendMail}
            textValue={'Enviar email de redefinição'}
          />
        </View>
      </View>
    </View>
  );
}
