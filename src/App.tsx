import { Route, Routes } from "react-router-dom"
import Feed from "./Feed"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App
