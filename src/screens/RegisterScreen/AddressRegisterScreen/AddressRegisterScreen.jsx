import { Image, Text, View } from 'react-native';
import { ContainerView, Input, ButtonApp } from '../../../components';
import PickUpPal from '../../../../assets/LogoWithName.png';
import HomeVector from '../../../../assets/EmailVector';
import BuildingVector from '../../../../assets/FactVector';
import FactVector from '../../../../assets/FactVector.png';
import styles from './styles/styles';
export default function AddressRegisterScreen() {
  return (
    <ContainerView>
      <Image source={PickUpPal} style={styles.Image} />
      <View style={styles.InputsButtonsContainer}>
        <Text>Cadastro do endereço</Text>
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
