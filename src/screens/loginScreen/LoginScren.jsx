import { View, Image, Text } from 'react-native';
import PickLogoWithText from '../../../assets/LogoWithName.png';
import EmailVector from '../../../assets/EmailVector.png';
import PasswordVector from '../../../assets/PasswordVector.png';
import DontShowPassVector from '../../../assets/DontShowPassVector.png';
import ShowPassVector from '../../../assets/ShowPassVector.png';

import styles from './styles/styles';

import { Input, ButtonApp, ContainerView } from '../../components/index.js';

export default function LoginScreen({ navigation }) {
  return (
    <ContainerView>
      <Image source={PickLogoWithText} style={styles.Image} />

      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Bem-Vindo!
        </Text>
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

        <ButtonApp textValue={'Login'} />
        <View style={{ flexDirection: 'row', maxWidth: '70%' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              height: 2,
              alignSelf: 'center'
            }}
          />
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              marginRight: 10,
              fontFamily: 'Poppins'
            }}
          >
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
        <ButtonApp
          textValue={'Criar conta'}
          navigation={navigation}
          screen={'UserProfileRegister'}
        />
      </View>
    </ContainerView>
  );
}
