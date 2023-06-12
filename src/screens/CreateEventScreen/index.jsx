import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ContainerView, Input, ButtonApp } from '../../components';
import BackArrow from '../../../assets/BackArrow.png';
import styles from './styles';

export default function CreateEventScreen() {
  return (
    <ContainerView>
      <TouchableOpacity style={styles.arrowButton}>
        <Image style={styles.arrowImage} source={BackArrow} />
      </TouchableOpacity>

      <ScrollView>
        <Input
          isPassword={false}
          placeHolder={'Adicione um título'}
          labelText={'Título'}
          containerWidth={'90%'}
        />
        <Input
          isPassword={false}
          placeHolder={'Adicone uma descrição de como funcionará seu evento'}
          labelText={'Descrição'}
          containerWidth={'90%'}
          containerHeight={200}
        />
        <Input
          isPassword={false}
          placeHolder={'Rua, cidade e estado do evento'}
          labelText={'Local'}
          containerWidth={'90%'}
        />
        <View style={styles.hourDiv}>
          <Input
            isPassword={false}
            placeHolder={'Hora de início'}
            containerWidth={'45%'}
            labelText={'Horário'}
          />
          <Input
            isPassword={false}
            placeHolder={'Hora de fim'}
            containerWidth={'45%'}
          />
        </View>
        <Input
          isPassword={false}
          placeHolder={'Selecione o tipo do seu evento'}
          labelText={'Tipo'}
          containerWidth={'90%'}
        />
        {/* <ButtonApp textValue={'Criar evento'} /> */}
      </ScrollView>
    </ContainerView>
  );
}
