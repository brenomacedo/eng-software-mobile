import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import styles from './styles';
import ArrowBack from '../../components/ArrowBack/ArrowBack';
import { images } from '../../utils/consts';
import RateModal from '../../components/RateModal/RateModal';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import { Input } from '../../components';

const UserProfile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { authToken, user: loggedUser, isAuth } = useAuth();
  const { params } = useRoute();
  const [modalRateOpen, setModalRateOpen] = useState(false);
  const [user, setUser] = useState(
    params && params.fromEye
      ? params.user
      : { ...loggedUser, ratings: [], events: [] }
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingRating, setLoadingRating] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(0);
  const [loadedAllComments, setLoadedAllComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [userComment, setUserComment] = useState(null);
  const [updatingComment, setUpdatingComment] = useState(false);

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

  const filteredComments = useMemo(() => {
    return comments.filter(comment => comment.author_id !== loggedUser.id);
  }, [loggedUser, comments]);

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

  const loadCommentsNextPage = userId => {
    setLoadingComments(true);
    api
      .get(`/comment/${userId}`, {
        params: {
          page: commentPage + 1,
          authorId: loggedUser.id
        }
      })
      .then(res => {
        if (res.data.length < 5) {
          setLoadedAllComments(true);
        }
        setCommentPage(commentPage + 1);

        const newComments = [...comments, ...res.data];
        setComments(newComments);
      })
      .catch(() => setLoadedAllComments(true))
      .finally(() => setLoadingComments(false));
  };

  const createOrUpdateComment = userId => {
    setUpdatingComment(true);
    api
      .post(
        `/comment/${userId}`,
        { content: comment },
        {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        }
      )
      .then(res => {
        setUserComment(res.data);
        if (editingComment) {
          Alert.alert('Comentário atualizado!');
        } else {
          Alert.alert('Comentário postado!');
        }
      })
      .catch(() => Alert.alert('Erro ao atualizar comentário'))
      .finally(() => {
        setUpdatingComment(false);
        setEditingComment(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
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
      };
      const getUserComments = async userId => {
        const userComments = await api
          .get(`/comment/${userId}`, {
            params: {
              page: 0,
              authorId: loggedUser.id
            }
          })
          .then(res => res.data)
          .catch(() => null);

        if (userComments) {
          setComments(userComments);
          if (userComments.length < 5) {
            setLoadedAllComments(true);
          }
        } else {
          setError(true);
        }
      };

      Promise.all([getUserInfo(user.id), getUserComments(user.id)]).finally(
        () => setLoading(false)
      );
    }
  }, [isFocused]);

  useEffect(() => {
    setUserComment(
      comments.find(comment => comment.author_id === loggedUser.id)
    );
  }, [loggedUser, comments]);

  const renderProfileComments = () => {
    if (filteredComments.length === 0 && !userComment) {
      return (
        <Text style={styles.notLoadedText}>Nenhum comentário encontrado.</Text>
      );
    }

    return (
      <View style={styles.comments}>
        {userComment && !editingComment && (
          <View style={styles.comment}>
            <View style={styles.commentAuthor}>
              <Image
                source={images[userComment.author.profile_pic].source}
                style={styles.commentAuthorPic}
              ></Image>
              <View style={styles.commentAuthorInfo}>
                <Text style={styles.commentAuthorName} numberOfLines={1}>
                  {userComment.author.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setComment(userComment.content);
                  setEditingComment(true);
                }}
              >
                <Image
                  style={styles.eye}
                  resizeMode="contain"
                  source={require('../../../assets/Pencil.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.commentContent}>{userComment.content}</Text>
          </View>
        )}
        {filteredComments.map(comment => {
          const userRating = user.ratings.find(
            rating => rating.user_id === comment.author.id
          );

          return (
            <View style={styles.comment} key={comment.id}>
              <View style={styles.commentAuthor}>
                <Image
                  source={images[comment.author.profile_pic].source}
                  style={styles.commentAuthorPic}
                ></Image>
                <View style={styles.commentAuthorInfo}>
                  <Text style={styles.commentAuthorName} numberOfLines={1}>
                    {comment.author.name}
                  </Text>
                  {userRating &&
                    renderRating(
                      { rating: userRating.rating, totalVotes: 1 },
                      10,
                      false,
                      0
                    )}
                </View>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          );
        })}
        {!loadedAllComments && !loadingComments && (
          <View style={styles.loadMoreCommentsSection}>
            <TouchableOpacity onPress={() => loadCommentsNextPage(user.id)}>
              <Image
                style={styles.plusIcon}
                source={require('../../../assets/plus.png')}
              ></Image>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderRating = (
    ratings,
    starSize = 20,
    showVotes = true,
    spaceBottom = 12
  ) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: spaceBottom }}>
        <View style={styles.userRatingStars}>
          <View
            style={[
              styles.userRatingYellowStars(starSize),
              {
                width:
                  (starSize * 5 + starSize * 0.4 * 4) * (ratings.rating / 5)
              }
            ]}
          >
            {new Array(5).fill(0).map((_, index) => (
              <Image
                style={styles.userRatingStar(starSize)}
                key={index}
                source={require('../../../assets/yellowstar.png')}
              />
            ))}
          </View>
          <View style={styles.userRatingGrayStars(starSize)}>
            {new Array(5).fill(0).map((_, index) => (
              <Image
                style={styles.userRatingStar(starSize)}
                key={index}
                source={require('../../../assets/graystar.png')}
              />
            ))}
          </View>
        </View>
        {showVotes && (
          <Text style={{ color: 'white', marginLeft: 8 }}>
            ({ratings.totalVotes})
          </Text>
        )}
      </View>
    );
  };

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
            {!(params && params.fromEye) && (
              <TouchableOpacity
                onPress={() => navigation.navigate('PSProfile')}
                style={styles.editProfileButton}
              >
                <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            )}
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
            <Text style={styles.commentsTitle}>Comentários</Text>
            {(!userComment || editingComment) && (
              <>
                <Input
                  value={comment}
                  setValue={comment => setComment(comment)}
                  isPassword={false}
                  placeHolder={'Escreva um comentário sobre esse usuário'}
                  containerHeight={150}
                  lineHeight={24}
                  multiline={true}
                  numberOfLines={8}
                  textInputStyle={{ paddingTop: 18 }}
                  completeHeight={true}
                />
                <TouchableOpacity
                  disabled={updatingComment}
                  style={styles.rateUser}
                  onPress={() => createOrUpdateComment(user.id)}
                >
                  <Text style={styles.rateUserTitle}>
                    {editingComment
                      ? 'Atualizar comentário'
                      : 'Adicionar comentário'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {renderProfileComments()}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserProfile;
