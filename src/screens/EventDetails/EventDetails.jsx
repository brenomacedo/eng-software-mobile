import { useEffect, useMemo, useState } from 'react';
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
import RateModal from '../../components/RateModal/RateModal';
import { useIsFocused } from '@react-navigation/native';

const EventDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { authToken, logout, isAuth, user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [modalRateOpen, setModalRateOpen] = useState(false);
  const {
    title,
    location,
    eventDescription,
    eventLatitude,
    eventLongitude,
    eventId,
    userId,
    user,
    fromRequests
  } = route.params;
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const [event, setEvent] = useState({
    id: eventId,
    title,
    description: eventDescription,
    location,
    latitude: eventLatitude,
    longitude: eventLongitude,
    user_id: userId,
    start_time: '',
    end_time: '',
    type: 0,
    user,
    ratings: []
  });
  const [loadingRating, setLoadingRating] = useState(false);
  const [error, setError] = useState(false);

  const eventRating = useMemo(() => {
    let totalVotes = event.ratings.length;
    let totalRating = 0;

    for (const i in event.ratings) {
      totalRating += event.ratings[i].rating;
    }

    return {
      rating: totalRating / (totalVotes || 1),
      totalVotes
    };
  }, [event]);

  const eventWasRated = useMemo(() => {
    return (
      authUser &&
      event &&
      event.ratings &&
      event.ratings.find(rating => rating.user_id === authUser.id)
    );
  }, [event]);

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

  const renderUserRating = ratings => {
    const totalVotes = ratings.length;
    let totalRating = 0;

    for (let i = 0; i < totalVotes; i++) {
      totalRating += ratings[i].rating;
    }

    const finalRating = totalRating / (totalVotes || 1);

    return (
      <View style={styles.participantRatingContainer}>
        <View style={styles.participantRating}>
          <View style={styles.participantGrayStars}>
            {new Array(5).fill(0).map((_, index) => (
              <Image
                key={index}
                style={{ width: 14, height: 14 }}
                source={require('../../../assets/graystar.png')}
              />
            ))}
          </View>
          <View
            style={[
              styles.participantYellowStars,
              { width: (finalRating / 5) * 78 }
            ]}
          >
            {new Array(5).fill(0).map((_, index) => (
              <Image
                key={index}
                style={{ width: 14, height: 14 }}
                source={require('../../../assets/yellowstar.png')}
              />
            ))}
          </View>
        </View>
        <Text style={styles.participantRatingCount}>({totalVotes})</Text>
      </View>
    );
  };

  const renderRating = () => {
    return (
      <View
        style={{
          alignSelf: 'flex-start',
          marginLeft: 32,
          flexShrink: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={styles.userRatingStars}>
          <View
            style={[
              styles.userRatingYellowStars,
              { width: 132 * (eventRating.rating / 5) }
            ]}
          >
            {new Array(5).fill(0).map((_, index) => (
              <Image
                style={styles.userRatingStar}
                key={index}
                source={require('../../../assets/yellowstar.png')}
              />
            ))}
          </View>
          <View style={styles.userRatingGrayStars}>
            {new Array(5).fill(0).map((_, index) => (
              <Image
                style={styles.userRatingStar}
                key={index}
                source={require('../../../assets/graystar.png')}
              />
            ))}
          </View>
        </View>
        <Text style={{ color: 'white', marginLeft: 8, marginBottom: 12 }}>
          ({eventRating.totalVotes})
        </Text>
      </View>
    );
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
    const acceptedRequests = event.requests.filter(
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
        <View style={styles.userInfo}>
          <Text numberOfLines={1} style={styles.participantName}>
            {request.user.name}
          </Text>
          {renderUserRating(request.user.ratings)}
        </View>
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

  const onRateChosen = async rate => {
    setLoadingRating(true);

    const rating = await api
      .post(
        '/event/rate',
        { event_rated: event.id, rating: rate },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      )
      .then(res => res.data)
      .catch(() => null);

    if (rating) {
      if (eventWasRated) {
        const newEvent = { ...event };
        newEvent.ratings = newEvent.ratings.map(rating => {
          if (rating.user_id === authUser.id) {
            return { ...rating, rating: rate };
          } else {
            return rating;
          }
        });
        setEvent(newEvent);
      } else {
        const newEvent = { ...event };
        newEvent.ratings.push(rating);
        setEvent(newEvent);
      }

      Alert.alert('Event avaliado!');
    } else {
      Alert.alert('Erro ao avaliar o evento!');
    }

    setLoadingRating(false);
    setModalRateOpen(false);
  };

  useEffect(() => {
    const getEvent = async eventId => {
      setLoading(true);
      const event = await api
        .get(`/event/${eventId}`)
        .then(res => res.data)
        .catch(() => null);

      if (event) {
        setEvent(event);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    if (isFocused) {
      getEvent(event.id);
    }
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.eventDetailsContainer}
    >
      {loading ? (
        <Text style={styles.notLoadedText}>Carregando...</Text>
      ) : error ? (
        <Text style={styles.notLoadedText}>
          Não foi possível carregar o evento.
        </Text>
      ) : (
        <>
          <RateModal
            title="Avaliar evento"
            closeModal={() => setModalRateOpen(false)}
            initialRate={eventWasRated ? eventWasRated.rating : 1}
            isOpen={modalRateOpen}
            onRateChosen={onRateChosen}
            loading={loadingRating}
          />
          <ArrowBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.eventDetailsTitle}>{event.title}</Text>

          <Text style={styles.eventDetailsInfoTitle}>Criado por:</Text>
          <View style={styles.eventCreatorInfo}>
            <Image
              style={styles.eventCreatorProfilePic}
              source={images[event.user.profile_pic].source}
            />
            <View style={styles.creatorInfo}>
              <Text style={styles.eventCreatorName} numberOfLines={1}>
                {event.user.name}
              </Text>
              {renderUserRating(event.user.ratings)}
            </View>
            <TouchableOpacity
              style={styles.viewParticipantProfileButton}
              onPress={() => viewUserProfile(event.user)}
            >
              <Image
                resizeMode="contain"
                source={require('../../../assets/eye.png')}
                style={styles.viewParticipantProfile}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.eventDetailsInfoTitle}>Local</Text>
          <Text style={styles.eventDetailsInfo}>{event.location}</Text>

          <Text style={styles.eventDetailsInfoTitle}>Descrição</Text>
          <Text style={styles.eventDetailsInfo}>{event.description}</Text>

          <Text style={styles.eventDetailsInfoTitle}>Horário</Text>
          <Text style={styles.eventDetailsInfo}>
            {event.start_time.slice(0, 5)}-{event.end_time.slice(0, 5)}
          </Text>

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
              latitude: event.latitude,
              longitude: event.longitude
            }}
            value={{
              latitude: event.latitude,
              longitude: event.longitude
            }}
          />

          {(!authUser || event.user_id != authUser.id) && !fromRequests && (
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
          {
            // /* TODO: MUDAR AQUI DEPOIS */ !dayjs().isAfter(dayjs(endTime)) &&
            fromRequests && (
              <>
                <Text style={styles.ratingTitle}>Avaliação do evento</Text>
                {renderRating()}
                {isAuth && (
                  <View style={{ paddingHorizontal: 32, width: '100%' }}>
                    <TouchableOpacity
                      style={styles.rateUser}
                      onPress={() => setModalRateOpen(true)}
                    >
                      {eventWasRated ? (
                        <>
                          <View style={styles.rateUserRatedText}>
                            <Text style={styles.rateUserTitle}>
                              Sua avaliação: {eventWasRated.rating}{' '}
                            </Text>
                            <Image
                              style={styles.rateUserYellowStar}
                              source={require('../../../assets/yellowstar.png')}
                            />
                          </View>
                          <Text style={styles.rateUserSubTitle}>
                            (Toque para editar)
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.rateUserTitle}>
                          Avalie este evento
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )
          }
        </>
      )}
    </ScrollView>
  );
};

export default EventDetails;
