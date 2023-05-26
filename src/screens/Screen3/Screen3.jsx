import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const Screen3 = ({ navigation }) => {
    const subtitleText = "Crie seus eventos e reúna\npessoas para jogar com você."; 
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); // Hide the header
      }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/xadrez.png')} style={styles.image} />
      <Text style={styles.title}>Marque encontros</Text>
      <Text style={styles.subtitle} numberOfLines={3} >
        {subtitleText}
      </Text>

      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle2, styles.spacing]}/>
        <View style={[styles.rectangle2, styles.spacing]}/>
        <View style={[styles.rectangle, styles.spacing]}/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen1')}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen3;
