import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async() => {
    setAuth({});
    try {
      await axios('/logout', {
        withCredentials: true
      });
      localStorage.setItem('username', null);
    } catch (err) {
      console.error(err);
    }
  }
  
  return logout;
}

export default useLogout;
