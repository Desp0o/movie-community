import { Outlet, Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"
import { useEffect } from "react"
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
// import SplashScreen from "./components/splashScreen/SplashScreen"
import Post from "./pages/Post"
import Create from "./pages/Create"
import axios from "axios"
import { QueryClient, QueryClientProvider } from "react-query"
import EditPost from "./pages/EditPost"
import AddPost from "./components/CreatePageComps/AddPost"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient()

function App() {
  const token = localStorage.getItem('token')
  const {isDark} = useDarkModeHook()
  const {user} = useUserHook()
  const dispatch = useDispatch()

  useEffect(()=>{
    Boolean(localStorage.getItem('darkMode'))    
  },[])


  const googleUserCeck = () => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, ()=>{})


    return () => unsubscribe();
  }


  useEffect(()=>{

    const checkMe = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_CHECK_USER, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          localStorage.setItem('userName', response.data.name)
          localStorage.setItem('userID', response.data.id)
          localStorage.setItem('avatar', response.data.avatar)


          dispatch(
            setUser({
              name: response.data.name, 
              userID: response.data.id, 
              avatar: response.data.avatar
            })
          )
          console.log(response.data);
          
      } catch (error) {
        console.log(error);
        localStorage.removeItem('userName')
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
      }
      finally{
      }
    }

    if(token){
      googleUserCeck()
      checkMe()
    }

    if(!token){
    }

  },[dispatch])

  useEffect(()=>{
    isDark ?
            document.documentElement.style.backgroundColor = '#0B1416'
           :
            document.documentElement.style.backgroundColor = '#fff'
  },[isDark])

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDark ? "app darkMode" : "app"}>
        <Navbar />
        <LeftNavigation />
        <AddPost />
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route index element={<Feed />} />
          <Route path="/pages/privacy" element={<Privacy />} />
          <Route path="/pages/Post/:id" element={<Post />} />

          <Route element={<RequireAuth />}>
            <Route path="/pages/Profile" element={<Profile />} />
            <Route path="/pages/Create" element={<Create />} />
            <Route path="/pages/EditPost/:id" element={<EditPost />} />
          </Route>

        </Routes>
        {window.innerWidth < 601 && user.name ? <BottomNavigation /> : <></>}
      </div>
    </QueryClientProvider>
  )
}

export default App
