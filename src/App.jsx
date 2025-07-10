import Title from "./components/title"
import Display from "./components/display"
import DetailsPge from "./pages/detailspge"
import { Routes, Route } from "react-router-dom"
import PersonsDetailspge from "./pages/personsDetailspge"
import UserPage from "./pages/user"
function App() {
  
  return (
    <div className="p-1 min-h-screen bg-gray-700/60 ">
      
      <Title/>
      <Routes>
        <Route path="/" element={<Display/>} />
        <Route path="/:movieId" element={<DetailsPge />} />
        <Route path="/person/:personId" element={<PersonsDetailspge/>} />
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </div>
    
  )
}

export default App
