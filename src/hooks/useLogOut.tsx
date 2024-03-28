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
      dispatch(setUser({name: '', avatar: ''}))
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return { handleLogout }
}