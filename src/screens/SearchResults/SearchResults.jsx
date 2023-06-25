import {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import useAuth from '../../hooks/useAuth';
import styles from './styles';
import api from '../../api';



const Button = function(press, data, index, user_Id){
  
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
                    {data.hour}
                </Text>
      </View>
      {(data.userId === user_Id ) &&
        (<View style={styles.buttonIcons}>
                      <View>
              
                        <Image
                          source={require('../../../assets/iconBell.png')}
                          style={styles.bell}
                          />
                        <Text style={styles.circle}>
                          {data.bellCount} 
                        </Text>
                      </View>
                      <Image
                        source={require('../../../assets/Pencil.png')}
                        style={styles.pen}
                      />
                    </View>)
      }
    </TouchableOpacity>
  )
}

const SearchResults = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([])
  const {event} = route.params;
  const {user} = useAuth();
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
          hour: data.hour,
          bellCount:0,
          userId: data.user_id,
          eventDescription: data.eventDescription,
          eventLatitude: data.eventLatitude,
          eventLongitude: data.eventLongitude,
        });
  }
  

  useEffect(() => {
    const searchEvents = async (event) => {
      let newEventArray = [];
      const response = await api.get(`/event/${event}/${user.id}`).then(res => res.data);  
      console.log(response)
      response.map((event) => {
        let newEventObject = {
          title: event.title,
          location: event.location,
          hour:`${event.start_time.slice(0,5)}-${event.end_time.slice(0,5)}`,
          bellCount:0,
          userId: event.user_id,
          eventDescription: event.description,
          eventLatitude: event.latitude,
          eventLongitude: event.longitude,

        }
        
        newEventArray.push(newEventObject);
      })
      setResults(newEventArray);
      setLoading(false);
    }
    searchEvents(event);  
  }, [])
 

  return (
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.eventDetailsContainer}
      >
        <ArrowBack onPress={() => {navigation.goBack()}} />

        <Text style={styles.eventDetailsInfoTitle}>Exibindo resultados para {`"${event}"`}</Text>

        {
          loading ? (
            <Text>Carregando...</Text>
          ) : ( 
            (results.length > 0) ?
            (results.map((data, index) => Button(seeDetails,data,index, user.id))) :
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