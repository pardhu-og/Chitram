import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Bookmark, SquareCheckBig } from 'lucide-react'
export default function DetailsPge (){
    const [detailsData, setDetailsData] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [castdata, setCast] = useState(null)
    const [videodata, setVideoData] =useState(null)
    const imglink = "https://image.tmdb.org/t/p/original"
    const { movieId } = useParams();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userdata")) || {"wishList":[], "seenList":[], "favactr":[]})
    const [status, setStatus] = useState(null)
 
    const options = { 
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TMDB_TOKEN
        }
    }
    function addUserData (e){
        const name = e.target.name
        const movie = e.target.value
       const x = userData.wishList.length >0 ? userData.wishList.filter(p=> p !== movie): []
       const y = userData.seenList.length >0 ? userData.seenList.filter(p=> p !== movie): []
       
        if (name === "wishList" && status !== "wishList") {
            const filtered = {wishList: [...x, movie], seenList:[...y], favactr:[...userData.favactr]}
            setUserData(filtered)
            setStatus("wishList")
        }
       else if (name === "seenList" && status !== "seenList") {
            const filtered = {wishList: [...x], seenList:[...y, movie], favactr:[...userData.favactr]}
            setUserData(filtered)
            setStatus("seenList")
        } else {
            const filtered = {wishList: [...x], seenList:[...y], favactr:[...userData.favactr]}
            setUserData(filtered)
            setStatus(null)
        } 
    }

     useEffect(()=>{
        localStorage.setItem("userdata",JSON.stringify(userData))
    }, [userData])

    useEffect(()=>{
        if(userData && userData.wishList) {if(userData.wishList.some(p=> p === movieId)) {setStatus("wishList")}}
        if(userData && userData.seenList) {if(userData.seenList.some(p=> p === movieId)) {setStatus("seenList")}}
    },[])
    // Async operations start

    useEffect (()=>{
        async function fetchDetails () {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options) 
                if(!res.ok) {throw new Error(`Error ${res.status}`)}
                const data = await res.json()
                setDetailsData(data)
            } catch (err) {console.log(err)}
            
        } 
       fetchDetails ()
       async function fetchImgData (){
          try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options) 
                if(!res.ok) {throw new Error(`Error ${res.status}`)}
                const data = await res.json()
                setImgData(data)
            } catch (err) {console.log(err)}
       }
       fetchImgData()
       async function fetchCastData (){
          try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options) 
                if(!res.ok) {throw new Error(`Error ${res.status}`)}
                const data = await res.json()
                setCast(data)
            } catch (err) {console.log(err)}
       }
       fetchCastData()
       async function fetchVideoData (){
          try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options) 
                if(!res.ok) {throw new Error(`Error ${res.status}`)}
                const data = await res.json()
                setVideoData(data)
            } catch (err) {console.log(err)}
       }
        fetchVideoData ()
  
    },[movieId])
    
    return(
        <>
        {!detailsData && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
        {detailsData && 
            <div className={`flex flex-col rounded-xl sm:grid sm:grid-cols-[240px_1fr] sm:m-1 sm:p-2 sm:gap-2 bg-gradient-to-b from-gray-800/90 to-black/90 backdrop-blur-xl`} >
            <div className="m-2 sm:m-0 sm:mt-2 ">
                <img className="sm:mx-2 rounded-xl  sm:object-contain "src={`https://image.tmdb.org/t/p/w780${detailsData.poster_path}`} alt="" />
            </div>
            <div className="m-2 p-4 pb-2 font-bold text-lg border border-white/30 bg-white/30 backdrop-blur-sm rounded-xl flex flex-col gap-3" >
                <div className="text-3xl font-extrabold ">{detailsData.title}</div>
                        <div className="italic font-[400]  ">{detailsData.tagline}</div>
                        <div className="flex leading-none divide-x-[1.5px] ml-[-8px]">{detailsData.genres.slice(0,3).map((p)=><div key={p.id} className="p-1 px-2 ">{p.name}</div>)}</div>
                        <div>Release Date: {detailsData.release_date}</div>
                        <div>{detailsData.vote_average.toFixed(1)} / 10</div>
                        <div className="flex gap-4">
                             <button name='wishList' value={detailsData.id} onClick={addUserData} className="px-2 py-0.5  hover:bg-blue-700/20 rounded font-medium italic hover:cursor-pointer hover:text-gray-200" title={`${status === "wishList"?"Remove from Watch Later":"Add to Watch Later"}`}><Bookmark className={`pointer-events-none ${status === "wishList"?"fill-blue-400 stroke-blue-800":""}`}/></button>
                             <button name='seenList' value={detailsData.id} onClick={addUserData} className="px-2 py-0.5  hover:bg-blue-700/20 rounded font-medium italic hover:cursor-pointer hover:text-gray-200" title={`${status === "seenList"?"Remove from Seen List":"Add to Seen List"}`}><SquareCheckBig  className={`pointer-events-none ${status === "seenList"?"fill-blue-400 stroke-blue-800":""}`}/></button></div>
                        <div>
                            <div className="text-xl">Overview:</div>
                            <div className="text-justify">{detailsData.overview}</div>
                        </div>
            </div>
            <div className="mx-2 py-2 font-bold bg-white/30 rounded-lg col-span-2 flex flex-wrap justify-evenly gap-1">
                {!castdata && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
                {castdata && castdata.cast.length === 0 && <p>No Cast Data Available</p>}
                {castdata && castdata.crew.filter((p)=>p.job === "Director").map((p)=><Link key={p.id} to={`/person/${p.id}`}>
                                                                            <div className=" flex w-80 sm:w-full border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm my-2 p-2 rounded-xl ">
                                                                            <div><img className="w-20 rounded-full aspect-square object-contain object-top text-xs text-center font-medium" src={`https://image.tmdb.org/t/p/w300${p.profile_path}`} alt={`${p.name}` } /></div>
                                                                            <div className="flex flex-col justify-center gap-1">
                                                                                <div>{p.name}</div>
                                                                                <div className="text-sm">(Director)</div>
                                                                            </div>
                                                                            </div></Link>)}
                {castdata && castdata.cast.filter((p)=>p.order <=10).map((p)=><Link key={p.id} to={`/person/${p.id}`}>
                                                                            <div className=" flex w-80 sm:w-full border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm my-2 p-2 rounded-xl ">
                                                                            <div><img className="w-20 rounded-full aspect-square object-contain object-top text-xs text-center font-medium" src={`https://image.tmdb.org/t/p/w300${p.profile_path}`} alt={`${p.name}` } /></div>
                                                                            <div className="flex flex-col justify-center gap-1">
                                                                                <div>{p.name}</div>
                                                                                <div className="text-sm">{`(${p.character})`}</div>
                                                                            </div>
                                                                            </div></Link>)}
            </div>
            {!videodata && <h1 className='m-10 text-xl sm:text-4xl text-center col-span-2'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
            {videodata && videodata.results.length === 0 && <p className="text-center text-2xl col-span-2 mt-4">No Videos Available</p>}
            {videodata && 
                <div className="col-span-2 flex flex-col sm:flex-row justify-center py-2 mx-2 gap-2">
                {videodata.results.length > 0 && <div className="w-full sm:w-1/2"><iframe className="w-full aspect-video rounded-xl"  src={`https://www.youtube.com/embed/${videodata.results[0].key}`} title={`${videodata.results[0].name} `} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>}
                {videodata.results.length > 1 && <div className="w-full sm:w-1/2"><iframe className="w-full aspect-video rounded-xl" src={`https://www.youtube.com/embed/${videodata.results[1].key}`} title={`${videodata.results[1].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>}
            </div>
            }
            <div className="col-span-2 mx-2 ">
                <img className="rounded-xl mb-2" src={`${imglink}${detailsData.backdrop_path}`} alt={`Backdrop image of ${detailsData.title}`} />
            </div>
        </div>
        }
        </>
    )
}

