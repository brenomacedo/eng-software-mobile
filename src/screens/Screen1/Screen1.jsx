import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const Screen1 = ({ navigation }) => {
    const subtitleText = "Confira no mapa os eventos\nque estão mais próximos\nde você."; // Add newline characters 
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); // Hide the header
      }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/basquete.png')} style={styles.image} />
      <Text style={styles.title}>Veja eventos próximos</Text>
      <Text style={styles.subtitle} numberOfLines={3} >
        {subtitleText}
      </Text>
      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle, styles.spacing]}/>
        <View style={[styles.rectangle2, styles.spacing]}/>
        <View style={[styles.rectangle2, styles.spacing]}/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen2')}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen1;
