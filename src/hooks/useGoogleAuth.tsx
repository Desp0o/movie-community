import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../components/firebase/firebaseConfig";
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlicer';
import { setModalVisible } from '../Redux/loginModalSlicer';
import axios from 'axios';


export const useGoogleLogIn = () => {

    const disptach = useDispatch()

    const googleLogIn = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt:"select_account"
        })
    
        try {
          const signIn = await signInWithPopup(auth, provider);
          disptach(setUser({name: signIn.user.displayName, avatar: signIn.user.photoURL, userID: signIn.user.uid}))
          disptach(setModalVisible(false))
          localStorage.setItem('userName', JSON.stringify(signIn.user.displayName))
          
          const avatarFromGoogle = signIn.user.photoURL
          const formatedAvatar = avatarFromGoogle?.substring(0, avatarFromGoogle.length - 4)
          
          const formData = {
            name: signIn.user.displayName,
            avatar: formatedAvatar + "250",
            google_id: signIn.user.uid,
            email: signIn.user.email,
          }
            
           const res = await axios.post('https://api.pinky.ge/api/register', formData, {
            headers:{
              'Content-Type': 'application/json'
            }
          })
          console.log(res.data);
          
          return signIn;
        } catch (error) {
          console.error(error);
        }
      };
      
    return { googleLogIn }
}