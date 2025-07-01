import { useState } from "react"
import data from './data/sampleMovies.json'
import Title from "./components/title"


function App() {
  const [dispdata, setDispdata] = useState(data.results)
  console.log(JSON.stringify(dispdata,null,2))
  return (
    <div className="p-1 min-h-screen bg-gray-700/30">
    <div className="">
    <Title/>
    <div className="flex flex-wrap gap-6 justify-center p-4">
    {dispdata.map((p)=>
    <div key={p.id} className="bg-white/5  w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
    <img title={p.title} src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
    <div className="w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
    <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
        <div className="">{p.title}</div>
        <div className="animate-revolve inline-block">⭐</div>  
        <div>{p.vote_average.toFixed(1)}/10</div>
    </div>

    </div>
    </div>
    )}
    </div>
    
    
    {/*<div  className="flex justify-center mt-16 ">
      <div className="bg-red-200/55 backdrop-blur-lg w-1/8 p-2 rounded-xl cust-shadow">
      <img title={dispdata[1].title} src={`https://image.tmdb.org/t/p/w500${dispdata[1].poster_path}`} alt={dispdata[1].title} className=" rounded-lg "/>*/}
    
    {/*<p className=" text-sm">⭐:{dispdata[1].vote_average}</p>*/}
      </div>
    </div>
    
  )
}

export default App
