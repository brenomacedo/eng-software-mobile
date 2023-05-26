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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#212121',
    },
    image: {
      width: "71%",
      height: "40%",
      marginTop: 30
    },
    title: {
      fontSize: 28,
      marginVertical: 0,
      marginLeft: -60,
      color: '#FFFFFF',
      marginBottom: 10,
      textAlign: 'left',
      fontFamily: 'Roboto',
      fontStyle: "normal",
      fontWeight: 700,
    },
    subtitle: {
      fontSize: 18,
      marginVertical: 10,
      marginLeft: -70,
      color: '#FFFFFF',
      textAlign: 'left',
      // fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 500,
      marginBottom: "16%",
    },
    button: {
      backgroundColor: '#F90000',
      fontStyle: "normal",
      fontWeight: 500,
      paddingVertical: 20,
      paddingHorizontal: 110,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 0
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      textAlign: 'center',
    },

    rectangle: {
      width:12,
      height:6,
      backgroundColor: "#FFFFFF",
      borderRadius:2
    },

    rectangle2: {
      backgroundColor:"#616161",
      width:6,
      height:6,
      borderRadius: 3
    },

    rectangleContainer: {
      flexDirection:"row",
      alignItems:"center"
    },

    spacing:{
      marginHorizontal:1
    }
});

export default Screen2;
