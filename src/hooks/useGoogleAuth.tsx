import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../components/firebase/firebaseConfig";
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlicer';
import { setModalVisible } from '../Redux/loginModalSlicer';
import axios from 'axios';
import { setRefetch } from '../Redux/RefetchSlicer';
import { useRefetchHook } from './useRefetchHook';


export const useGoogleLogIn = () => {
    const {requestRefetch} = useRefetchHook()
    const dispatch = useDispatch()

    const googleLogIn = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt:"select_account"
        })
    
        try {
          const signIn = await signInWithPopup(auth, provider);
          dispatch(setModalVisible(false))
          signIn.user.displayName && localStorage.setItem('userName', signIn.user.displayName)
          
          const avatarFromGoogle = signIn.user.photoURL
          const formatedAvatar = avatarFromGoogle?.substring(0, avatarFromGoogle.length - 4)

          const formData = {
            name: signIn.user.displayName,
            avatar: formatedAvatar + "250",
            google_id: signIn.user.uid,
            email: signIn.user.email,
          }
            
           const res = await axios.post(import.meta.env.VITE_REGISTER, formData, {
            headers:{
              'Content-Type': 'application/json'
            }
          })
          console.log(res);
          
          localStorage.setItem('token',res.data?.token)
          localStorage.setItem('userID', res.data?.user_id)
          localStorage.setItem("score", res.data?.user?.point);
          localStorage.setItem("bells", res.data?.user?.bells);

          dispatch(setUser({
            name: signIn.user.displayName, 
            avatar: signIn.user.photoURL, 
            userID: res.data.user_id, 
            points: res.data.point,
            bells: res.data.bells
          }))
          dispatch(setRefetch(!requestRefetch))
          return signIn;
        } catch (error) {
          console.error(error);
        }
      };
      
    return { googleLogIn }
}