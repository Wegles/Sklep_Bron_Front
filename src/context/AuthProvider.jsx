import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
  const [username, setUsername] = useLocalStorage('username', localStorage.getItem('username' || null));

  const isAuthed = () => auth?.accessToken ? true : false;
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, isAuthed, setUsername, username }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
