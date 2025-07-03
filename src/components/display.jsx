import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Display(){
    const [dispdata, setDispdata] = useState(null)
    const [list, setList] = useState("now_playing")
    function handleClick (e){
            setList(e.target.value)
    }    
    useEffect (()=>{
        async function fetchListData (){
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${list}?language=en-US&page=1`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTk1Yzg3N2JlN2E3OGY4ODMzYTk3NWU1MTllNTFlOCIsIm5iZiI6MTc1MTI4NDc5OS40Niwic3ViIjoiNjg2MjdjM2Y5NWYzMzEwNTgyNzE4OWRmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2xAF5Akl3St260Khas9TG-VvyZkFTHYnIPrnbeDLoaw'
                    }
                })
                if (!res.ok) {throw new Error(`Error: ${res.status}`)}
                const data = await res.json()
                setDispdata(data)
                } catch (err) {console.log(err)}
            
        }
        fetchListData()
    },[list])
    return (
        <>
        {dispdata && 
        <div>
            <div className="flex flex-wrap gap-6 justify-center p-4 w-fit mx-auto  rounded-lg font-[cursive] text-lg ">
                <button value={"now_playing"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100   transition-all duration-100 ease-out ${list === "now_playing"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80":""}`}>Now Playing</button>
                <button value={"popular"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  ${list === "popular"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 ":""}`}>Trending</button>
                <button value={"top_rated"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  ${list === "top_rated"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 ":""}`}>Top Rated</button>
                <button value={"upcoming"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  ${list === "upcoming"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 ":""}`}>Upcoming</button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {dispdata.results.map((p)=>
                    <Link key={p.id} to={`${p.id}`}>
                        <div className="bg-white/5  w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
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
        </div>
        }
        </>


    )
}