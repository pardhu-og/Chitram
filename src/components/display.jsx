import { Heading1 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Display(){
   
    const [dispdata, setDispdata] = useState(null)
    const [list, setList] = useState("now_playing")
    function handleClick (e){
            setDispdata(null)
            isrendered.current = false
            pageNo.current = 2
            setList(e.target.value)

    }    
    useEffect (()=>{
        async function fetchListData (){
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${list}?language=en-US&page=1`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
                })
                if (!res.ok) {throw new Error(`Error: ${res.status}`)}
                const data = await res.json()
                setDispdata(data.results)
                } catch (err) {console.log(err)}
            
        }
        fetchListData()
        
    },[list])
//pagination logic
    const paginationdiv = useRef(null);
    const isrendered = useRef(false)
    const pageNo = useRef(2)
     async function fetchpages (num){
         try { 
                const res = await fetch(`https://api.themoviedb.org/3/movie/${list}?language=en-US&page=${num}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
                })
                if (!res.ok) {throw new Error(`Error: ${res.status}`)}
                const data = await res.json()
                setDispdata(p=>[...p, ...data.results] )
                pageNo.current = pageNo.current + 1
                } catch (err) {console.log(err)}
            
    }

    useEffect(()=>{
           
        const target = paginationdiv.current;
        if(!target) return;
        const observer = new IntersectionObserver(e=>{
            if(e[0].isIntersecting){
            if(!isrendered.current) {
                isrendered.current = true;
                return;
            }
            fetchpages(pageNo.current)}
        },{
            root: null,
            threshold: 0,
            rootMargin: '0px 0px 500px 0px'
        })
        observer.observe(target)
        return ()=>{
            observer.unobserve(target)
        }
    },[list])







    return (
        <>
        <div>
            <div className="flex flex-wrap md:gap-6 justify-evenly md:justify-center p-1 md:p-4 w-fit mx-auto  font-[cursive] text-lg">
                <button value={"now_playing"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100   transition-all duration-100 ease-out ${list === "now_playing"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Now Playing</button>
                <button value={"popular"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "popular"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Trending</button>
                <button value={"top_rated"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "top_rated"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Top Rated</button>
                <button value={"upcoming"} onClick={handleClick} className={`px-4 py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "upcoming"?" bg-purple-400/80  text-gray-100 hover:bg-purple-400/80 pointer-events-none":""}`}>Upcoming</button>
            </div>
            {!dispdata && <h1 className='text-xl text-center'>Loading</h1>}
            {dispdata && 
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {dispdata.map((p)=>
                    <Link key={p.id} to={`${p.id}`}>
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
            </div>}
        </div>
        <div ref={paginationdiv}></div>
        </>


    )
}