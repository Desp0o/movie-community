import { Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"
import { useDarkModeHook } from "./hooks/useDarkModeHook"
import "./index.css"


function App() {

  const {isDark} = useDarkModeHook()

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
