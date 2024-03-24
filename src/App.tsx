import { Route, Routes } from "react-router-dom"
import Feed from "./Feed"
import Navbar from "./components/navbar/navbar"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App
