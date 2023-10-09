import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { images } from '../../utils/consts';
import RateModal from '../../components/RateModal/RateModal';
import { useEffect, useState } from 'react';
import api from '../../api';

const UserProfile = ({ navigation }) => {
  const {
    params: { user: initialUser }
  } = useRoute();
  const [modalRateOpen, setModalRateOpen] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const goBack = () => navigation.goBack();
  const onRateChosen = _rate => {
    setModalRateOpen(false);
  };

  const renderRating = _ratings => {
    return (
      <View>
        <View style={styles.userRatingStars}>
          <View style={styles.userRatingYellowStars}>
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
      </View>
    );
  };

  useEffect(() => {
    const getUserInfo = async userId => {
      const user = await api
        .get(`/user/${userId}`)
        .then(res => res.data)
        .catch(() => null);
      if (user) {
        setUser(user);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    getUserInfo(user.id);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.notLoadedText}>Carregando...</Text>
      ) : error ? (
        <Text style={styles.notLoadedText}>
          Não foi possíve carregar o perfil deste usuário
        </Text>
      ) : (
        <>
          <RateModal
            title="Avaliar usuário"
            closeModal={() => setModalRateOpen(false)}
            initialRate={0}
            isOpen={modalRateOpen}
            onRateChosen={onRateChosen}
          />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ArrowBack onPress={goBack} style={styles.arrowBack} />
            <Image
              source={images[user.profile_pic].source}
              style={styles.userProfilePic}
            ></Image>
            <Text style={styles.userName} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={styles.userDescription}>{user.description}</Text>

            <Text style={styles.ratingTitle}>Avaliações</Text>
            <Text style={styles.ratingSubTitle}>Avaliações de usuário</Text>
            {renderRating()}
            <TouchableOpacity
              style={styles.rateUser}
              onPress={() => setModalRateOpen(true)}
            >
              <View style={styles.rateUserRatedText}>
                <Text style={styles.rateUserTitle}>Sua avaliação: 5 </Text>
                <Image
                  style={styles.rateUserYellowStar}
                  source={require('../../../assets/yellowstar.png')}
                />
              </View>
              <Text style={styles.rateUserSubTitle}>(Toque para editar)</Text>
              {/* <Text style={styles.rateUserTitle}>Avalie este usuário</Text> */}
            </TouchableOpacity>
            <Text style={styles.ratingSubTitle}>Avaliações de eventos</Text>
            {renderRating()}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserProfile;
