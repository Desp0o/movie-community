import { Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"
import { useEffect, useLayoutEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./components/firebase/firebaseConfig"
import { setUser } from "./Redux/userSlicer"
import { useDispatch } from "react-redux"
import BottomNavigation from "./components/bottomNav/BottomNavigation"
import { useUserHook } from "./hooks/useUserHook"
import LeftNavigation from "./components/leftNavigation/LeftNavigation"
import Privacy from "./pages/privacy"


function App() {
  const {isDark} = useDarkModeHook()
  const {user} = useUserHook()
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    Boolean(localStorage.getItem('darkMode'))    
  },[])

  useLayoutEffect(() => {
    setLoading(true)
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({name: user.displayName, avatar: user.photoURL}))
        setLoading(false)
      }else {
        setLoading(false)
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if(isLoading){
    return <div className="">LOADINNNG</div>
  }

  return (
    <div className={isDark ? "app darkMode" : "app"}>
      <Navbar />
      <LeftNavigation />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/pages/privacy" element={<Privacy />} />
      </Routes>
      {window.innerWidth < 601 && user.name ? <BottomNavigation /> : <></>}
    </div>
  )
}

export default App
