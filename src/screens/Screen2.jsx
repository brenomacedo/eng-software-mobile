import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Screen2 = ({ navigation }) => {
    const subtitleText = "Deixe o feedback em um\nevento de acordo com a\nsua experiência.";
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); // Hide the header
      }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/estrela.png')} style={styles.image} />
      <Text style={styles.title}>Avalie os eventos</Text>
      <Text style={styles.subtitle} numberOfLines={3} >
        {subtitleText}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen3')}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#212121',
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 30
    },
    title: {
      fontSize: 28,
      marginVertical: 40,
      marginLeft: -60,
      color: '#FFFFFF',
      marginBottom: 10,
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 18,
      marginVertical: 10,
      marginLeft: -70,
      color: '#FFFFFF',
      textAlign: 'left',
    },
    button: {
      backgroundColor: '#F90000',
      paddingVertical: 20,
      paddingHorizontal: 110,
      borderRadius: 10,
      marginTop: 70,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      textAlign: 'center',
    },
});

export default Screen2;
