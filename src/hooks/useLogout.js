import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth, auth } = useAuth();

  const logout = async() => {
    setAuth({});
    try {
      await axios.get('/auth/logout', {
        withCredentials: true
      });
      localStorage.setItem('username', null);
      setAuth({});
    } catch (err) {
      console.error(err);
    }
  }
  
  return logout;
}

export default useLogout;
