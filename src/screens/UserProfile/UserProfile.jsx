import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { images } from '../../utils/consts';
import RateModal from '../../components/RateModal/RateModal';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../api';

const UserProfile = ({ navigation }) => {
  const {
    params: { user: initialUser }
  } = useRoute();
  const [modalRateOpen, setModalRateOpen] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingRating, setLoadingRating] = useState(false);
  const { authToken, user: loggedUser, isAuth } = useAuth();

  const userEventsRate = useMemo(() => {
    let totalEventRating = 0;
    let totalEventVotes = 0;

    if (user && user.events) {
      for (const i in user.events) {
        totalEventVotes += user.events[i].ratings.length;
        for (const j in user.events[i].ratings) {
          totalEventRating += user.events[i].ratings[j].rating;
        }
      }
    }

    return {
      rating: totalEventRating / (totalEventVotes || 1),
      totalVotes: totalEventVotes
    };
  }, [user]);

  const userRate = useMemo(() => {
    let totalUserRating = 0;
    let totalUserVotes = user.ratings.length;

    if (user && user.ratings) {
      for (const i in user.ratings) {
        totalUserRating += user.ratings[i].rating;
      }
    }

    return {
      rating: totalUserRating / (totalUserVotes || 1),
      totalVotes: totalUserVotes
    };
  }, [user]);

  const userWasRated = useMemo(() => {
    return (
      loggedUser &&
      user &&
      user.ratings &&
      user.ratings.find(rating => rating.user_id === loggedUser.id)
    );
  }, [user]);

  const goBack = () => navigation.goBack();

  const onRateChosen = async rate => {
    setLoadingRating(true);

    const rating = await api
      .post(
        '/user/rate',
        { user_rated: user.id, rating: rate },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      )
      .then(res => res.data)
      .catch(() => null);

    if (rating) {
      if (userWasRated) {
        const newUser = { ...user };
        newUser.ratings = newUser.ratings.map(rating => {
          if (rating.user_id === loggedUser.id) {
            return { ...rating, rating: rate };
          } else {
            return rating;
          }
        });
        console.log(newUser);
        setUser(newUser);
      } else {
        const newUser = { ...user };
        newUser.ratings.push(rating);
        setUser(newUser);
      }

      Alert.alert('Usuário avaliado!');
    } else {
      Alert.alert('Erro ao avaliar o usuário!');
    }

    setLoadingRating(false);
    setModalRateOpen(false);
  };

  const renderRating = ratings => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.userRatingStars}>
          <View
            style={[
              styles.userRatingYellowStars,
              { width: 132 * (ratings.rating / 5) }
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
        <Text style={{ color: 'white', marginLeft: 8 }}>
          ({ratings.totalVotes})
        </Text>
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
            closeModal={() => {
              setModalRateOpen(false);
            }}
            initialRate={userWasRated ? userWasRated.rating : 0}
            isOpen={modalRateOpen}
            onRateChosen={onRateChosen}
            loading={loadingRating}
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
            {renderRating(userRate)}
            {isAuth && (
              <TouchableOpacity
                style={styles.rateUser}
                onPress={() => setModalRateOpen(true)}
              >
                {userWasRated ? (
                  <>
                    <View style={styles.rateUserRatedText}>
                      <Text style={styles.rateUserTitle}>
                        Sua avaliação: {userWasRated.rating}{' '}
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
                  <Text style={styles.rateUserTitle}>Avalie este usuário</Text>
                )}
              </TouchableOpacity>
            )}
            <Text style={styles.ratingSubTitle}>Avaliações de eventos</Text>
            {renderRating(userEventsRate)}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserProfile;
