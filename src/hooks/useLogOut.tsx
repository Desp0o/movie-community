import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { app } from '../components/firebase/firebaseConfig';
import { setUser } from '../Redux/userSlicer';
import { setRefetch } from '../Redux/RefetchSlicer';
import { useRefetchHook } from './useRefetchHook';


export const useLogOut = () => {
    const dispatch = useDispatch()
    const {requestRefetch} = useRefetchHook()

    const handleLogout = async () => {
      const auth = getAuth(app);
      signOut(auth);
      dispatch(setRefetch(!requestRefetch))
    try {
      dispatch(setUser({name: '', avatar: '', userID: ''}))
      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
      localStorage.removeItem('userName')
      localStorage.removeItem('token_death')
      localStorage.removeItem('userID')
      localStorage.removeItem('score')
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return { handleLogout }
}