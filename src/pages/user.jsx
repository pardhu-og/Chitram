import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function UserPage(){
const alldata = JSON.parse(localStorage.getItem("userdata")) || {"wishList":[], "seenList":[], "favactr":[]};
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
        
        <div className="flex flex-wrap mb-4 gap-4 justify-evenly sm:gap-6 sm:justify-center p-1 sm:p-4 w-fit mx-auto  font-comic text-sm sm:text-lg
                        ">
                <button value={"wishList"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full lg:cust-drop-shadow hover:cursor-pointer  lg:hover:bg-gray-400/80  hover:text-gray-100 transition-all duration-100 ease-out ${list === "wishList"?" bg-purple-600 text-gray-200 lg:hover:bg-purple-700 pointer-events-none":""}`}>To Watch</button>
                <button value={"seenList"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full lg:cust-drop-shadow hover:cursor-pointer  lg:hover:bg-gray-400/80  hover:text-gray-100 transition-all duration-100 ease-out  ${list === "seenList"?" bg-purple-600 text-gray-200 lg:hover:bg-purple-400/80 pointer-events-none":""}`}>Seen List </button>
                <button value={"favactr"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full lg:cust-drop-shadow hover:cursor-pointer  lg:hover:bg-gray-400/80  hover:text-gray-100 transition-all duration-100 ease-out  ${list === "favactr"?" bg-purple-600 text-gray-200 lg:hover:bg-purple-400/80 pointer-events-none":""}`}>Favourite People</button>
            </div>
        {dispdata.length !==0 && 
            <h1 className="text-md sm:text-2xl font-bold text-center">
                {list === "wishList" && "Your To-Watch List"}
                {list === "seenList" && "Movies You've Watched"}
                {list === "favactr" && "Your Favourite People"}
            </h1>  
        }
        {(dispdata.length !== 0) && (output.length === 0)  && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
        {(dispdata.length === 0) && <div className='p-2'>
                                        {list === "wishList" && 
                                            <div className="text-center  py-12">
                                                <p className="text-xl sm:text-2xl font-semibold">Your watchlist is empty.</p>
                                                <p className="mt-2 sm:text-xl">Add movies to watch later — let the reel roll!</p>
                                                <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 cust-drop-shadow rounded-lg hover:bg-green-700">
                                                    Browse Movies
                                                </Link>
                                            </div>

                                        } 
                                        {list === "seenList" && 
                                            <div className="text-center  py-12">
                                                <p className="text-xl sm:text-2xl font-semibold">Your Seen List is Empty.</p>
                                                <p className="mt-2 sm:text-xl">Looks like you haven’t marked any movies as seen. Let the world know what you’ve watched!</p>
                                                <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 cust-drop-shadow rounded-lg hover:bg-green-700">
                                                    Browse Movies
                                                </Link>
                                            </div>

                                        }
                                        {list === "favactr" && 
                                            <div className="text-center py-12">
                                                <p className="text-xl sm:text-2xl font-semibold">Favourite People is Empty.</p>
                                                <p className="mt-2 sm:text-xl">You haven’t picked your favourite stars yet. Discover amazing actors and add them to your list!</p>
                                            </div>

                                        }
                                    </div>}
        {(list !== "favactr") && 
           <div className="flex flex-wrap gap-4 sm:gap-6 justify-center p-4">
                {output.map((p)=>
                    <Link key={p.id} to={`/${p.id}`}>
                        <div className="sm:bg-white/5 bg-gray-600/40 w-60  sm:w-40 p-2 sm:p-1 rounded-xl cust-shadow relative group "> 
                        <img src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
                        <div className="w-full h-full absolute top-0 left-0 bg-white/50  backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
                        <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
                            <div className="cust-drop-shadow">{p.title}</div>
                            <div className="animate-revolve inline-block">⭐</div>  
                            <div className="cust-drop-shadow">{p.vote_average.toFixed(1)}/10</div>
                        </div>
                        </div>
                        <div className='lg:hidden flex flex-col items-center py-1 text-lg font-semibold rounded-lg'>
                            <div className="sm:hidden cust-drop-shadow text-center text-xl p-1">{p.title}</div>
                            <div className="flex justify-center gap-2"><div className='animate-revolve sm:animate-none inline-block'>⭐</div><div className='inline-block'>{p.vote_average.toFixed(1)}</div></div>  
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
                            <div className='lg:hidden flex flex-col items-center py-1 text-lg font-semibold rounded-lg'>
                            <div className="cust-drop-shadow text-center text-xl p-1">{p.name}</div>
                        </div>
                        </div>
                    </Link>
                )}
            </div>
        }
        </>
    )
}