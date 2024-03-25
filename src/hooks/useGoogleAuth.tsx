import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../components/firebase/firebaseConfig";


export const useGoogleLogIn = () => {

    const googleLogIn = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt:"select_account"
        })
    
        try {
          const signIn = await signInWithPopup(auth, provider);
      
          return signIn;
        } catch (error) {
          console.error(error);
        }
      };
      
    return googleLogIn
}