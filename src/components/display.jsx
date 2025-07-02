import data from '../data/sampleMovies.json'
import { useState } from 'react'

export default function Display(){
    const [dispdata, setDispdata] = useState(data.results)
    console.log(JSON.stringify(dispdata,null,2))
    
    return (
        <div className="flex flex-wrap gap-6 justify-center p-4">
    {dispdata.map((p)=>
    <div key={p.id} className="bg-white/5  w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
    <img title={p.title} src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
    <div className="w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
    <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
        <div className="cust-drop-shadow">{p.title}</div>
        <div className="animate-revolve inline-block">⭐</div>  
        <div className="cust-drop-shadow">{p.vote_average.toFixed(1)}/10</div>
    </div>

    </div>
    </div>
    )}
    </div>


    )
}