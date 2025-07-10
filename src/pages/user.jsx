import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function UserPage(){
const alldata = JSON.parse(localStorage.getItem("userdata"));
const [list, setList] = useState("wishList")
const [dispdata, setDispdata] = useState(alldata.wishList)
const [output, setOutput] = useState([])
const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TMDB_TOKEN
        }
}
function handleClick(e){
    setList(e.target.value)
    setOutput([])
}

useEffect(()=>{
    setDispdata(alldata[list])
},[list])


useEffect(()=>{
    async function fetching (){
try {
        if(list !== "favactr"){
                const fetchedData = await Promise.allSettled(dispdata.map(p=>
                            fetch(`https://api.themoviedb.org/3/movie/${p}`, options)
                            .then(res=>{
                                if(!res.ok){console.log(`Error while fetching ${res.url},${res.status}:${res.statusText}`)}
                                return res.json();
                            })
        ))
        fetchedData.forEach(p=>{
            if(p.status === "rejected"){
                console.log(`${p.reason}`)
            } else {setOutput(q=>[...q, p.value])}
            
        })
        } else {
                const fetchedData = await Promise.allSettled(dispdata.map(p=>
                            fetch(`https://api.themoviedb.org/3/person/${p}`, options)
                            .then(res=>{
                                if(!res.ok){console.log(`Error while fetching ${res.url},${res.status}:${res.statusText}`)}
                                return res.json();
                            })
        ))
                fetchedData.forEach(p=>{
            if(p.status === "rejected"){
                console.log(`${p.reason}`)
            } else {setOutput(q=>[...q, p.value])}
            
        })
        }
        
} catch(err) {console.log(err)}

    } fetching()
},[dispdata])

    return(
        <>
        <div className="flex flex-wrap gap-6 justify-center p-4 w-fit mx-auto  font-[cursive] text-lg">
                <button value={"wishList"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100   transition-all duration-100 ease-out ${list === "wishList"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>To Watch</button>
                <button value={"seenList"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100 transition-all duration-100 ease-out  ${list === "seenList"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Watched </button>
                <button value={"favactr"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100 transition-all duration-100 ease-out  ${list === "favactr"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Favoutie People</button>
            </div>
        <h1 className="text-xl sm:text-2xl font-bold text-center">
            {list === "wishList" && "Your To-Watch List"}
            {list === "seenList" && "Movies You've Watched"}
            {list === "favactr" && "Your Favourite People"}
        </h1>
        {(list !== "favactr") && 
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {output.map((p)=>
                    <Link key={p.id} to={`/${p.id}`}>
                        <div className="bg-white/5  w-60 md:w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
                        <img src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
                        <div className="w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
                        <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
                            <div className="cust-drop-shadow">{p.title}</div>
                            <div className="animate-revolve inline-block">⭐</div>  
                            <div className="cust-drop-shadow">{p.vote_average.toFixed(1)}/10</div>
                        </div>
                        </div>
                        </div>
                    </Link>
                )}
            </div>
        }

        {(list === "favactr") && 
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {output.map((p)=>
                    <Link key={p.id} to={`/person/${p.id}`}>
                        <div className="bg-white/5  w-60 md:w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
                        <img src={`https://image.tmdb.org/t/p/w500${p.profile_path}`} alt={p.name} className=" rounded-lg "/>
                        <div className="w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
                        <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
                        <div className="cust-drop-shadow">{p.name}</div>
                        </div>
                        </div>
                        </div>
                    </Link>
                )}
            </div>
        }
        </>
    )
}