import { Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"
import { useEffect } from "react"


function App() {
  const {isDark} = useDarkModeHook()

  useEffect(()=>{
    console.log(localStorage.getItem('darkMode'));
    Boolean(localStorage.getItem('darkMode'))
    
  },[])


  return (
    <div className={isDark ? "app darkMode" : "app"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </div>
  )
}

export default App
