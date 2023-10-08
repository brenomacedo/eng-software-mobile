import { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { ArrowBack, MapInput, Input } from '../../components';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import styles from './styles';
import { images } from '../../utils/consts';

const EventDetails = ({ navigation, route }) => {
  const { authToken, logout, isAuth, user: authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {
    title,
    location,
    hour,
    eventDescription,
    eventLatitude,
    eventLongitude,
    eventId,
    userId,
    requests,
    user
  } = route.params;
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const closeParticipantsModal = () => {
    setIsParticipantsModalOpen(false);
  };

  const openParticipantsModal = () => {
    setIsParticipantsModalOpen(true);
  };

  const viewUserProfile = user => {
    setIsParticipantsModalOpen(false);
    navigation.navigate('UserProfile', { user });
  };

  const handleRequest = async () => {
    setLoading(true);

    if (isAuth != false) {
      try {
        const response = await api.post(
          '/request',
          {
            eventId,
            message
          },
          {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          }
        );

        if (response) {
          Alert.alert('Sucesso!', 'Solicitção feita!');
          navigation.goBack();
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          Alert.alert('Erro', 'Sessão expirada');
          logout().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }]
            });
          });
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          Alert.alert('Erro', 'Você já pediu para participar desse evento!');
        }
      }
    } else {
      navigation.navigate('LoginScreen');
    }

    setLoading(false);
  };

  const renderEventParticipants = () => {
    const acceptedRequests = requests.filter(
      request => request.status === 'ACCEPTED'
    );

    if (acceptedRequests.length === 0) {
      return (
        <Text style={styles.eventWithoutParticipants}>
          Este evento não possui nenhum participante.
        </Text>
      );
    }

    return acceptedRequests.map(request => (
      <View style={styles.participantContainer} key={request.id}>
        <Image
          source={images[request.user.profile_pic].source}
          style={styles.participantPfp}
        ></Image>
        <Text numberOfLines={1} style={styles.participantName}>
          {request.user.name}
        </Text>
        <TouchableOpacity
          style={styles.viewParticipantProfileButton}
          onPress={() => viewUserProfile(request.user)}
        >
          <Image
            resizeMode="contain"
            source={require('../../../assets/eye.png')}
            style={styles.viewParticipantProfile}
          />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      <ArrowBack
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.eventDetailsTitle}>{title}</Text>

      <Text style={styles.eventDetailsInfoTitle}>Criado por:</Text>
      <View style={styles.eventCreatorInfo}>
        <Image
          style={styles.eventCreatorProfilePic}
          source={images[user.profile_pic].source}
        />
        <Text style={styles.eventCreatorName} numberOfLines={1}>
          {user.name}
        </Text>
        <TouchableOpacity
          style={styles.viewParticipantProfileButton}
          onPress={() => viewUserProfile(user)}
        >
          <Image
            resizeMode="contain"
            source={require('../../../assets/eye.png')}
            style={styles.viewParticipantProfile}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.eventDetailsInfoTitle}>Local</Text>
      <Text style={styles.eventDetailsInfo}>{location}</Text>

      <Text style={styles.eventDetailsInfoTitle}>Descrição</Text>
      <Text style={styles.eventDetailsInfo}>{eventDescription}</Text>

      <Text style={styles.eventDetailsInfoTitle}>Horário</Text>
      <Text style={styles.eventDetailsInfo}>{hour}</Text>

      <View style={styles.seeParticipantsContainer}>
        <TouchableOpacity
          style={styles.seeParticipants}
          onPress={openParticipantsModal}
        >
          <Text style={styles.seeParticipantsText}>Ver participantes</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.eventDetailsInfoTitle}>Local no mapa</Text>
      <MapInput
        hideLabel
        style={styles.map}
        readOnly
        initialPosition={{
          latitude: eventLatitude,
          longitude: eventLongitude
        }}
        value={{
          latitude: eventLatitude,
          longitude: eventLongitude
        }}
      />

      {(!authUser || userId != authUser.id) && (
        <>
          <Input
            labelText={'Mensagem: '}
            placeHolder={'Digite uma mensagem'}
            containerWidth={'85%'}
            marginBottom={15}
            marginTop={15}
            value={message}
            setValue={setMessage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={loading}
              style={styles.button}
              onPress={handleRequest}
            >
              <Text style={styles.buttonText}>Pedir para participar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        visible={isParticipantsModalOpen}
        onRequestClose={closeParticipantsModal}
        animationType="slide"
        transparent
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
        >
          <View
            style={{
              backgroundColor: 'rgb(42,42,42)',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center',
              width: '90%',
              height: '85%'
            }}
          >
            <TouchableOpacity
              title="Close"
              onPress={closeParticipantsModal}
              style={{
                position: 'absolute',
                top: -20,
                left: '99%'
              }}
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
            <Text style={styles.participantsModalTitle}>Participantes</Text>
            <ScrollView
              contentContainerStyle={{
                width: Dimensions.get('window').width * 0.9 - 40,
                marginTop: 16,
                rowGap: 16
              }}
            >
              {renderEventParticipants()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventDetails;
