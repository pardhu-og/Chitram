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
                if(list === "now_playing" || list === "upcoming") {
                    const data2 = data.results.sort((a,b)=>Date.parse(b.release_date)-Date.parse(a.release_date))
                    setDispdata(data2)
                } else { setDispdata(data.results)}
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
            <div className="flex flex-wrap sm:gap-6  sm:p-4 w-fit sm:text-lg mx-auto justify-evenly font-[cursive] 
                            text-md p-2 gap-2">
                <button value={"now_playing"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100   transition-all duration-100 ease-out ${list === "now_playing"?" bg-purple-600 text-gray-200 hover:bg-purple-400/80 pointer-events-none":""}`}>Now Playing</button>
                <button value={"popular"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "popular"?" bg-purple-600 text-gray-200 hover:bg-purple-400/80 pointer-events-none":""}`}>Trending</button>
                <button value={"top_rated"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "top_rated"?" bg-purple-600 text-gray-200 hover:bg-purple-400/80 pointer-events-none":""}`}>Top Rated</button>
                <button value={"upcoming"} onClick={handleClick} className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full cust-drop-shadow hover:cursor-pointer  hover:bg-gray-400/80  hover:text-gray-100  transition-all duration-100 ease-out  ${list === "upcoming"?" bg-purple-600 text-gray-200 hover:bg-purple-400/80 pointer-events-none":""}`}>Upcoming</button>
            </div>
            {!dispdata && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
            {dispdata && 
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center p-4">
                {dispdata.map((p)=>
                    <Link key={p.id} to={`${p.id}`}>
                        <div className="sm:bg-white/5 bg-gray-600/40 w-60  sm:w-40 p-2 sm:p-1 rounded-xl cust-shadow relative group "> 
                        <img src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
                        <div className="w-full h-full absolute top-0 left-0 bg-white/50  backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
                        <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2">
                            <div className="cust-drop-shadow">{p.title}</div>
                            <div className="animate-revolve inline-block">⭐</div>  
                            <div className="cust-drop-shadow">{p.vote_average.toFixed(1)}/10</div>
                        </div>
                        </div>
                        <div className='sm:hidden flex flex-col items-center py-1 text-lg font-semibold rounded-lg'>
                            <div className="cust-drop-shadow text-center text-xl p-1">{p.title}</div>
                            <div className="flex justify-center gap-2"><div className='animate-revolve inline-block'>⭐</div><div className='inline-block'>{p.vote_average.toFixed(1)}</div></div>  
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