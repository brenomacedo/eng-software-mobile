import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const Screen2 = ({ navigation }) => {
    const subtitleText = "Deixe o feedback em um\nevento de acordo com a\nsua experiência.";
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); // Hide the header
      }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/estrela.png')} style={styles.image} />
      <Text style={styles.title}>Avalie os eventos</Text>
      <Text style={styles.subtitle} numberOfLines={3} >
        {subtitleText}
      </Text>
      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle2, styles.spacing]}/>
        <View style={[styles.rectangle, styles.spacing]}/>
        <View style={[styles.rectangle2, styles.spacing]}/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen3')}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen2;
