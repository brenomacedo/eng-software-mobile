import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { images } from '../../utils/consts';
import RateModal from '../../components/RateModal/RateModal';
import { useState } from 'react';

const UserProfile = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const [modalRateOpen, setModalRateOpen] = useState(false);

  const {
    params: { user }
  } = useRoute();

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

  return (
    <View style={styles.container}>
      <RateModal
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
    </View>
  );
};

export default UserProfile;
