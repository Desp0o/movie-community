import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../components/firebase/firebaseConfig";
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlicer';


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
          console.log(signIn.user);
          disptach(setUser({name: signIn.user.displayName, avatar: signIn.user.photoURL}))

          return signIn;
        } catch (error) {
          console.error(error);
        }
      };
      
    return { googleLogIn }
}