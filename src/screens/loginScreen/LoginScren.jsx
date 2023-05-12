import { View, TouchableOpacity, TextInput, Image, Text } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';
import styles from './styles/styles';
import { useState } from 'react';

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={styles.Container}>
      <Image source={PickLogoWithText} style={styles.Image} />

      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20 }}>Bem-Vindo!</Text>
        <View style={styles.InputContainer}>
          <Image
            source={EmailVector}
            style={{
              position: 'absolute',
              left: 15,
              top: 25,
              width: 25,
              height: 20,
              zIndex: 2,
              resizeMode: 'center'
            }}
          />
          <TextInput
            textContentType="emailAddress"
            style={styles.Input}
            placeholder="Email"
          />
        </View>

        <View style={styles.InputContainer}>
          <Image
            source={PasswordVector}
            style={{
              position: 'absolute',
              left: 15,
              top: 25,
              width: 25,
              height: 20,
              zIndex: 2,
              resizeMode: 'center'
            }}
          />
          <TextInput
            textContentType="password"
            secureTextEntry={hidePassword}
            style={styles.Input}
            placeholder="Senha"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 25,
              width: 25,
              height: 20,
              zIndex: 2,
              resizeMode: 'center'
            }}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <Image
              source={hidePassword ? DontShowPassVector : ShowPassVector}
              style={{
                width: 25,
                height: 20,
                resizeMode: 'center'
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.Button}>
          <Text style={{ color: 'white' }}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', maxWidth: '70%' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              height: 2,
              alignSelf: 'center'
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, marginRight: 10 }}>
            OU
          </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              height: 2,
              alignSelf: 'center'
            }}
          />
        </View>
        <TouchableOpacity style={styles.Button}>
          <Text style={{ color: 'white' }}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
