import { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);

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
        setAuthToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
