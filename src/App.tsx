import { Outlet, Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import "./index.css"
import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "./components/firebase/firebaseConfig"
import { setUser } from "./Redux/userSlicer"
import { useDispatch } from "react-redux"
import Privacy from "./pages/privacy"
import Profile from "./pages/Profile"
import RequireAuth from "./components/RequireAuth/RequireAuth"
import Post from "./pages/Post"
import axios from "axios"
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
import Quizzes from "./pages/Quizzes"
import Quiz from "./pages/Quiz"
import RatingsFeed from "./components/RatingsFeed/RatingsFeed"
import Slider from "./components/slider/Slider"

function App() {
  const token = localStorage.getItem('token')
  const { handleLogout } = useLogOut()
  const {isSpinner} = useSpinnerHook()
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

  const checkMe = async () => {
    const token = localStorage.getItem('token')
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
            name: response?.data?.name, 
            userID: response?.data?.id, 
            avatar: response?.data?.avatar,
            score: response?.data?.point,
            bells: response?.data?.bells
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
          
  useEffect(()=>{
    if(token){
      checkMe()
      googleUserCeck()
    }
    if(!token){
      handleLogout()
    }
  },[])


  return (
      <div className="app">
        <div className='eclipse-bg-top'/>
        <div className='eclipse-bg-right'/>
        <div className='eclipse-bg-left'/>
        <div className='eclipse-bg-bottom'/>

        {isSpinner && <Spinner />}
        <Login />
        <ToastContainer closeOnClick={true}/>
        <AddPostPopUp />
        <AddQuiz />
        <AddPoll />
          <PageLayout>
            <RatingsFeed />
            <Slider />
            <Routes>
              <Route path="/" element={<Outlet />} />
              <Route index element={<Feed />} />
              <Route path="/pages/privacy" element={<Privacy />} />
              <Route path="/pages/Post/:id" element={<Post />} />
              <Route element={<RequireAuth />}>
                <Route path="/pages/Profile" element={<Profile />} />
                <Route path="/pages/CreateQuiz" element={<CreateQuiz />} />
              </Route>
              <Route path="/pages/Quizzes" element={<Quizzes />} />
              <Route path="/pages/Quiz/:id" element={<Quiz />} />
            </Routes>
          </PageLayout>
      </div>
  )
}

export default App
