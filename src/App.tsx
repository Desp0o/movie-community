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
import { useQuery } from "react-query"
import { ToastContainer } from "react-toastify"
import Login from "./components/login/Login"
import PageLayout from "./components/pageLayout/PageLayout"
import AddPostPopUp from "./components/createPostFeed/AddPostPopUp"
import AddQuiz from "./components/createPostFeed/AddQuiz"
import AddPoll from "./components/createPostFeed/AddPoll"
import Spinner from "./components/spinner/Spinner"
import { useSpinnerHook } from "./hooks/useSpinnerHook"
import { useLogOut } from "./hooks/useLogOut"
import CreateQuiz from "./pages/CreateQuiz"




function App() {
  const token = localStorage.getItem('token')
  const { handleLogout } = useLogOut()
  const {isSpinner} = useSpinnerHook()
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


  
    const {} = useQuery('checkUser', async ()=>{
   
      if(token){
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
            localStorage.setItem("score", response.data?.point);
            localStorage.setItem("bells", response.data?.bells);
            
            dispatch(
              setUser({
                name: response.data.name, 
                userID: response.data.id, 
                avatar: response.data.avatar,
                score: response.data.point,
                bells: response.data.bells
              })
            )
            
        } catch (error) {
          console.error(error);
          localStorage.removeItem('userName')
          localStorage.removeItem('token')
          localStorage.removeItem('userID')
          localStorage.removeItem('bells')
          localStorage.removeItem('score')
        }
      }
    
  })

  useEffect(()=>{
    if(token){
      googleUserCeck()
    }

    if(!token){
      handleLogout()
    }

  },[dispatch])

  useEffect(()=>{
    isDark ?
            document.documentElement.style.backgroundColor = '#0B1416'
           :
            document.documentElement.style.backgroundColor = '#fff'
  },[isDark])

  return (
      <div className={isDark ? "app darkMode" : "app"}>
        {isSpinner && <Spinner />}
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
              <Route path="/pages/CreateQuiz" element={<CreateQuiz />} />
            </Routes>
            </PageLayout>
      </div>
  )
}

export default App
