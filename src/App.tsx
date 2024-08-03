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
import AddPostPopUp from "./components/createPostFeed/AddPostPopUp"
import AddQuiz from "./components/createPostFeed/AddQuiz"
import AddPoll from "./components/createPostFeed/AddPoll"
import Spinner from "./components/spinner/Spinner"
import { useSpinnerHook } from "./hooks/useSpinnerHook"
import { useLogOut } from "./hooks/useLogOut"
import CreateQuiz from "./pages/CreateQuiz"
import Quizzes from "./pages/Quizzes"
import Quiz from "./pages/Quiz"
import Navbar from "./components/navbar/navbar"
import Quiz_ from "./pages/Quiz_"
import PageNotFound from "./pages/404"

function App() {
  const token = localStorage.getItem('token')
  const { handleLogout } = useLogOut()
  const {isSpinner} = useSpinnerHook()
  const dispatch = useDispatch()


  const googleUserCeck = () => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, ()=>{})    

    return () => unsubscribe();
  }
     
  useEffect(()=>{
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
          localStorage.setItem("isAuthenticated", "true");
          
          dispatch(
            setUser({
              name: response?.data?.name, 
              userID: response?.data?.id, 
              avatar: response?.data?.avatar,
              score: response?.data?.point,
              bells: response?.data?.bells,
              isAuthenticated: true
            })
          )
          
      } catch (error) {
        console.error(error);
        localStorage.removeItem('userName')
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('bells')
        localStorage.removeItem('score')
        localStorage.removeItem('isAuthenticated')
      }

      setUser({isAuthenticated: true})
    }
    if(token){
      checkMe()
      googleUserCeck()
    }
    if(!token){
      handleLogout()
    }
  },[handleLogout, token, dispatch])


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
        <Navbar />
            <Routes>
              <Route path="/" element={<Outlet />} />
              <Route index element={<Feed />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/Post/:id" element={<Post />} />
              <Route path="/Quiz_" element={<Quiz_ />} />
              <Route element={<RequireAuth />}>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/CreateQuiz" element={<CreateQuiz />} />
              </Route>
              <Route path="/Quizzes" element={<Quizzes />} />
              <Route path="/Quiz/:id" element={<Quiz />} />
              <Route path="*" element={<PageNotFound />} />

            </Routes>
      </div>
  )
}

export default App
