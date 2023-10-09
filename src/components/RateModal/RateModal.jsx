import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';

const RateModal = ({
  isOpen,
  closeModal,
  initialRate,
  onRateChosen,
  title
}) => {
  const [rate, setRate] = useState(initialRate);

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)' // Semi-transparent background
        }}
      >
        <View
          style={{
            backgroundColor: 'rgb(42,42,42)',
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            alignItems: 'center',
            width: '90%'
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 18,
              marginBottom: 10,
              marginTop: 5
            }}
          >
            {title}
          </Text>

          <View style={styles.rateStars}>
            {new Array(5).fill(0).map((_, index) => (
              <TouchableOpacity onPress={() => setRate(index + 1)} key={index}>
                <Image
                  style={styles.rateStarImage}
                  source={
                    rate >= index + 1
                      ? require('../../../assets/yellowstar.png')
                      : require('../../../assets/graystar.png')
                  }
                ></Image>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.chooseRateButton}
            onPress={() => onRateChosen(rate)}
          >
            <Text style={styles.chooseRateButtonText}>Atualizar avaliação</Text>
          </TouchableOpacity>

          {/* Botão de exitJanela */}
          <TouchableOpacity
            title="Close"
            style={{
              position: 'absolute',
              top: -20,
              left: '99%'
            }}
            onPress={closeModal}
          >
            <Image
              source={require('../../../assets/ExitFotos.png')}
              style={{
                height: 61,
                width: 61,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RateModal;
