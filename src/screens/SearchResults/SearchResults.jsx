import {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ArrowBack, MapInput } from '../../components';
import useAuth from '../../hooks/useAuth';
import styles from './styles';
import api from '../../api';

const Button = function(data, index, user_Id){

  return(
    <TouchableOpacity key={index} style={styles.button}>
      <View style={styles.buttonText}>
                <Text style={styles.buttonTextTitle}>
                    {data.Titulo}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {data.Local}
                </Text>
                <Text style={styles.buttonTextSubtitle}>
                    {data.Horario}
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

  

  useEffect(() => {
    const searchEvents = async (event) => {
      let newEventArray = [];
      const response = await api.get(`/event/${event}/${user.id}`).then(res => res.data);  
      console.log(response)
      response.map((event) => {
        let newEventObject = {Titulo: event.title, Local: event.location, Horario:`${event.start_time.slice(0,5)}-${event.end_time.slice(0,5)}`,bellCount:5, userId: event.user_id}
        newEventArray.push(newEventObject);
      })
      setResults(newEventArray);
      setLoading(false);
    }
    searchEvents(event);  
  }, [])

  
  
 

  //Recebe do backend as informações, 
  let buttons = [{Titulo: 'Título do evento', Local: 'Local', Horario:'16:30-17:30',bellCount:5}, 
                 {Titulo: 'Olimpiada', Local: 'Estônia', Horario:'29:30-47:30',bellCount:71},
                 {Titulo: 'Show de fogos', Local: 'Coreia do Norte', Horario:'19:87-35:83',bellCount:71}
                ];

  //Teste para multiplos botões
  buttons = buttons.concat(buttons).concat(buttons);
  buttons = buttons.concat(buttons).concat(buttons)
  // buttons = buttons.concat(buttons).concat(buttons)
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
            (results.map((data, index) => Button(data,index, user.id))) :
            (<Text style={styles.noResults}> Nenhum resultado encontrado</Text>) 
          )
        }
        
      </ScrollView>
  );
};

export default SearchResults;

//{buttons.map((data, index) => Button(data,index))}