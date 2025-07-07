import Title from "./components/title"
import Display from "./components/display"
import DetailsPge from "./pages/detailspge"
import { Routes, Route } from "react-router-dom"
import PersonsDetailspge from "./pages/personsDetailspge"
function App() {
  
  return (
    <div className="p-1 min-h-screen bg-gray-700/60 border-8 md:border-none">
      
      <Title/>
      <Routes>
        <Route path="/" element={<Display/>} />
        <Route path="/:movieId" element={<DetailsPge />} />
        <Route path="/person/:personId" element={<PersonsDetailspge/>} />
      </Routes>
    </div>
    
  )
}

export default App
