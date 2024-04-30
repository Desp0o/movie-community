import { Outlet, Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./components/firebase/firebaseConfig"
import { setUser } from "./Redux/userSlicer"
import { useDispatch } from "react-redux"
// import { useUserHook } from "./hooks/useUserHook"
import Privacy from "./pages/privacy"
import Profile from "./pages/Profile"
import RequireAuth from "./components/RequireAuth/RequireAuth"
import Post from "./pages/Post"
import axios from "axios"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import Login from "./components/login/Login"
import PageLayout from "./components/pageLayout/PageLayout"
import AddPostPopUp from "./components/createPostFeed/AddPostPopUp"
import AddQuiz from "./components/createPostFeed/AddQuiz"
import AddPoll from "./components/createPostFeed/AddPoll"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      refetchIntervalInBackground: true,
    }
  }
})


function App() {
  const token = localStorage.getItem('token')
  const {isDark} = useDarkModeHook()
  // const {user} = useUserHook()
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
              avatar: response.data.avatar,
              score: response.data.point
            })
          )
          
      } catch (error) {
        console.error(error);
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

  },[dispatch, token])

  useEffect(()=>{
    isDark ?
            document.documentElement.style.backgroundColor = '#0B1416'
           :
            document.documentElement.style.backgroundColor = '#fff'
  },[isDark])

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDark ? "app darkMode" : "app"}>
        <Login />
        <ToastContainer closeOnClick={true}/>
        <AddPostPopUp />
        <AddQuiz />
        <AddPoll />
        <PageLayout>
            <Routes>
              <Route path="/" element={<Outlet />} />
              <Route index element={<Feed />} />
              <Route path="/pages/privacy" element={<Privacy />} />
              <Route path="/pages/Post/:id" element={<Post />} />
              <Route element={<RequireAuth />}>
                <Route path="/pages/Profile" element={<Profile />} />
              </Route>
            </Routes>
            </PageLayout>
      </div>
    </QueryClientProvider>
  )
}

export default App
