import Title from "./components/title"
import Display from "./components/display"
import DetailsPge from "./pages/detailspge"
import { Routes, Route } from "react-router-dom"
function App() {
  
  return (
    <div className="p-1 min-h-screen bg-gray-700/30 border-8 md:border-none">
      <Title/>
      <Routes>
        <Route path="/" element={<Display/>} />
        <Route path="/:movieId" element={<DetailsPge />} />
      </Routes>
    </div>
    
  )
}

export default App
