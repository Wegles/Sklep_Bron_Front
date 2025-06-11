import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, setUsername } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth(prev => {
      return { 
        ...prev, 
        accessToken: response.data.accessToken,
        role: response.data.role,
        id: response.data.id,
        username: response.data.username,
       }
    })
    setUsername(response.data.username);
    return response.data.accessToken;
  }
  
  return refresh;
}

export default useRefreshToken;
