import {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import useAuth from '../../hooks/useAuth';
import styles from './styles';
import api from '../../api';



const Button = function(press, data, index, user_Id, navigation){
  
  return(
    <TouchableOpacity
      key={index}
      style={styles.button} 
      onPress={() => {press(data)}}
    >
      <View style={styles.buttonText}>
                <Text style={styles.buttonTextTitle}>
                    {data.title}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {data.location}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {`${data.start_time.slice(0,5)}-${data.end_time.slice(0,5)}`}
                </Text>
      </View>
      {(data.user_id === user_Id ) &&
        (<View style={styles.buttonIcons}>
                      <TouchableOpacity onPress={() => {navigation.navigate('ListEvents', {event_id: data.id})}}>
              
                        <Image
                          source={require('../../../assets/iconBell.png')}
                          style={styles.bell}
                          />
                        <Text style={styles.circle}>
                          {data.bellCount} 
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {navigation.navigate('EditEvent', {
                          title: data.title,
                          Edescription: data.description,
                          location: data.location,
                          start_time: data.start_time,
                          end_time: data.end_time,
                          type: data.type,
                          latitude: data.latitude,
                          longitude: data.longitude,
                          event_id: data.id
                        })}}

                      >
                        <Image
                          source={require('../../../assets/Pencil.png')}
                          style={styles.pen}
                        />
                      </TouchableOpacity>
                      
                    </View>)
      }
    </TouchableOpacity>
  )
}

const SearchResults = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([])
  const parameters = route.params;
  const {user, authToken} = useAuth();
  let requestUrl = '';
  console.log(user)

  /*
    {"description": "Um racha de basquete valendo um sorvete", 
    "end_time": "13:23:27", 
    "id": 2, 
    "latitude": -3.814874, 
    "location": "Avenida contorno norte, 981, conjunto esperança ", 
    "longitude": -38.587177, 
    "start_time": "06:30:27", 
    "title": "Racha de basquete", 
    "type": 3, 
    "user_id": 6}

  */

  const seeDetails = (data) => {
    navigation.navigate('EventDetails', {
          title: data.title,
          location: data.location,
          hour: `${data.start_time.slice(0,5)}-${data.end_time.slice(0,5)}`,
          userId: data.user_id,
          eventDescription: data.description,
          eventLatitude: data.latitude,
          eventLongitude: data.longitude,
          eventId: data.eventId,
          userReq: user.id
        });
  }

  console.log(parameters);

  if (parameters) {
    requestUrl = `/event/${parameters.event}/${user.id}`
  } else {
    requestUrl = '/event/me'
  }
  


  useEffect(() => {
    const searchEvents = async (parameters) => {
      let newEventArray = [];
      let response;
      
      if (parameters) {
        response = await api.get(`/event/${parameters.event}/${user.id}`).then(res => res.data);
      } else { 
        response = await api.get('/event/me', {
              headers: {
              authorization: `Bearer ${authToken}`
            }}).then(res => res.data);
      }
      
      console.log(response)
      response.map((event) => {
        let newEventObject = event;
        newEventObject.bellCount = 0;
        newEventArray.push(newEventObject);
      })
      setResults(newEventArray);
      setLoading(false);
    }
    searchEvents(parameters);  
  }, [])

  
 

  return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.eventDetailsContainer}
      >
        <ArrowBack onPress={() => {navigation.goBack()}} />

        { parameters ? 
          (<Text style={styles.eventDetailsInfoTitle}>Exibindo resultados para {`"${parameters.event}"`}</Text>)
          :
          (<Text style={styles.eventDetailsInfoTitle}>Meus Eventos</Text>)
        }

        {
          loading ? (
            <Text>Carregando...</Text>
          ) : ( 
            (results.length > 0) ?
            (results.map((data, index) => Button(seeDetails,data,index, user.id, navigation))) :
            (<Text style={styles.noResults}> Nenhum resultado encontrado</Text>) 
          )
        }
        
      </ScrollView>
  );
};

export default SearchResults;

//{buttons.map((data, index) => Button(data,index))}
/* 


*/