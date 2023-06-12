import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ContainerView, Input, ButtonApp } from '../../../components';
import PickUpPal from '../../../../assets/LogoWithName.png';
import HomeVector from '../../../../assets/HomeVector.png';
import BuildingVector from '../../../../assets/BuildingVector.png';
import FactVector from '../../../../assets/FactVector.png';
import BackArrow from '../../../../assets/BackArrow.png';
import styles from './styles/styles';
export default function AddressRegisterScreen({ navigation }) {
  return (
    <ContainerView>
      <TouchableOpacity
        style={styles.backArrowButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={BackArrow} style={styles.backArrow} />
      </TouchableOpacity>
      <Image source={PickUpPal} style={styles.Image} />
      <View style={styles.InputsButtonsContainer}>
        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins' }}>
          Cadastro do endereço
        </Text>
        <Input isPassword={false} leftIcon={HomeVector} placeHolder={'CEP'} />
        <Input
          isPassword={false}
          leftIcon={BuildingVector}
          placeHolder={'Estado'}
        />
        <Input
          isPassword={false}
          leftIcon={FactVector}
          placeHolder={'Cidade'}
        />
        <Input
          isPassword={false}
          leftIcon={HomeVector}
          placeHolder={'Bairro'}
        />
        <ButtonApp textValue={'Criar conta'} />
      </View>
    </ContainerView>
  );
}
