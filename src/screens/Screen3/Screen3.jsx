import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen3 = ({ navigation }) => {
  const subtitleText =
    'Crie seus eventos e reúna\npessoas para jogar com você.';

  const navigateToInitialScreen = () => {
    AsyncStorage.setItem('firstTimeOnApp', JSON.stringify(false))
      .catch(_ => {})
      .finally(() => navigation.navigate('BottomTabNavigator'));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/xadrez.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Marque encontros</Text>
      <Text style={styles.subtitle} numberOfLines={3}>
        {subtitleText}
      </Text>

      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle2, styles.spacing]} />
        <View style={[styles.rectangle2, styles.spacing]} />
        <View style={[styles.rectangle, styles.spacing]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToInitialScreen}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen3;
