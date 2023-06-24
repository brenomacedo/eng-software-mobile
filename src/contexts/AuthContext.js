import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);

  const logout = async () => {
    setIsAuth(false);
    setUser(null);
    setAddress(null);
    setAuthToken(null);
    setEvents([]);
    setRequests([]);

    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        address,
        setAddress,
        events,
        setEvents,
        requests,
        setRequests,
        authToken,
        setAuthToken,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
