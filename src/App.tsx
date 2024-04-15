import { Outlet, Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./components/firebase/firebaseConfig"
import { setUser } from "./Redux/userSlicer"
import { useDispatch } from "react-redux"
import BottomNavigation from "./components/bottomNav/BottomNavigation"
import { useUserHook } from "./hooks/useUserHook"
import LeftNavigation from "./components/leftNavigation/LeftNavigation"
import Privacy from "./pages/privacy"
import Profile from "./pages/Profile"
import RequireAuth from "./components/RequireAuth/RequireAuth"
import SplashScreen from "./components/splashScreen/SplashScreen"
import Post from "./pages/Post"
import Create from "./pages/Create"
import axios from "axios"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  const {isDark} = useDarkModeHook()
  const {user} = useUserHook()
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    Boolean(localStorage.getItem('darkMode'))    
  },[])

  useEffect(() => {
    setLoading(true)
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({name: user.displayName, avatar: user.photoURL, userID: user.uid}))
        localStorage.setItem('userName', JSON.stringify(user.displayName))
        setLoading(false)
      }else {
        setLoading(false)
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    setLoading(true)

    const checkMe = async () => {
      
      try {
        const response = await axios.get(import.meta.env.VITE_CHECK_USER, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          localStorage.setItem('userName', response.data.name)
          dispatch(
            setUser({
              name: response.data.name, 
              userID: response.data.id, 
              avatar: response.data.avatar
            })
          )
          // console.log(response.data);
          
      } catch (error) {
        console.log(error);
        localStorage.removeItem('userName')
        localStorage.removeItem('token')
      }
      finally{
        setLoading(false)
      }
    }

    if(token){
      checkMe()
    }

  },[])

  useEffect(()=>{
    isDark ?
            document.documentElement.style.backgroundColor = '#0B1416'
           :
            document.documentElement.style.backgroundColor = '#fff'
  },[isDark])

  if(isLoading){
    return <SplashScreen />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDark ? "app darkMode" : "app"}>
        <Navbar />
        <LeftNavigation />
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route index element={<Feed />} />
          <Route path="/pages/privacy" element={<Privacy />} />
          <Route path="/pages/Post/:id" element={<Post />} />

          <Route element={<RequireAuth />}>
            <Route path="/pages/Profile" element={<Profile />} />
            <Route path="/pages/Create" element={<Create />} />
          </Route>

        </Routes>
        {window.innerWidth < 601 && user.name ? <BottomNavigation /> : <></>}
      </div>
    </QueryClientProvider>
  )
}

export default App
