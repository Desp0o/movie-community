import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { app } from '../components/firebase/firebaseConfig';
import { setUser } from '../Redux/userSlicer';


export const useLogOut = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
      const auth = getAuth(app);
      signOut(auth);
    try {
      dispatch(setUser({
        name: '', 
        avatar: '', 
        userID: null, 
        score: 0, 
        bells: 0, 
        isAuthenticated: false
      }))
      localStorage?.removeItem('token')
      localStorage?.removeItem('avatar')
      localStorage?.removeItem('userName')
      localStorage?.removeItem('token_death')
      localStorage?.removeItem('userID')
      localStorage?.removeItem('score')
      localStorage?.removeItem('bells')
      localStorage?.removeItem('isAuthenticated')

    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return { handleLogout }
}