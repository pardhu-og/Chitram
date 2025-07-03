import Title from "../components/title"
import detailsdatafrmId from '../data/sampleDetails.json'
import { useEffect, useState } from "react"
import ImagesfrmId from '../data/sampleImages.json'
import videos from '../data/sampleVideos.json' 
import caste from '../data/sampleCaste.json'
import { useParams } from "react-router-dom"
export default function DetailsPge (){
    const [detailsData, setDetailsData] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [castdata, setCast] = useState(null)
    const [videodata, setVideoData] =useState(null)
    const imglink = "https://image.tmdb.org/t/p/original"
    const { movieId } = useParams();
    const options = { 
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTk1Yzg3N2JlN2E3OGY4ODMzYTk3NWU1MTllNTFlOCIsIm5iZiI6MTc1MTI4NDc5OS40Niwic3ViIjoiNjg2MjdjM2Y5NWYzMzEwNTgyNzE4OWRmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2xAF5Akl3St260Khas9TG-VvyZkFTHYnIPrnbeDLoaw'
        }
    }

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
       fetchVideoData()
    },[])
    return(
        <>
        {!detailsData && "Loading"}
        {detailsData && 
            <div className={`grid grid-cols-[240px_1fr] m-1 p-2 gap-2 bg-gradient-to-b from-gray-800/90 to-black/90 backdrop-blur-xl`} >
            <div className="object-contain">
                <img className="m-2 rounded-lg object-contain "src={`https://image.tmdb.org/t/p/w780${detailsData.poster_path}`} alt="" />
            </div>
            <div className="m-2 p-4 pb-2 font-bold text-lg border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm rounded-xl flex flex-col gap-3" >
                <div className="text-3xl font-extrabold">{detailsData.title}</div>
                        <div className="italic font-[400]  ">{detailsData.tagline}</div>
                        <div className="flex leading-none divide-x-[1.5px] ml-[-8px]">{detailsData.genres.map((p)=><div key={p.id} className="p-1 px-2 ">{p.name}</div>)}</div>
                        <div>Release Date: {detailsData.release_date}</div>
                        <div>{detailsData.vote_average.toFixed(1)} / 10</div>
                        <div className="flex gap-4"><button className="px-2 py-0.5 bg-indigo-500/40 hover:bg-blue-700/20 rounded font-medium italic">Wish list</button>
                             <button className="px-2 py-0.5 bg-indigo-500/40 hover:bg-blue-700/20 rounded font-medium italic">Watched List</button></div>
                        <div>
                            <div className="text-xl">Overview:</div>
                            <div>{detailsData.overview}</div>
                        </div>
            </div>
            <div className="mx-2 py-2 font-bold bg-white/30 rounded-lg col-span-2 flex flex-wrap justify-evenly">
                {!castdata && "Loading"}
                {castdata && castdata.cast.length === 0 && <p>No Cast Data Available</p>}
                {castdata && castdata.cast.filter((p)=>p.order <=10).map((p)=><div key={p.id} className=" flex border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm m-2 p-2 rounded-xl ">
                                                                            <div><img className="w-20 rounded-full aspect-square object-contain object-top" src={`https://image.tmdb.org/t/p/w300${p.profile_path}`} alt={`${p.name}` } /></div>
                                                                            <div className="flex flex-col justify-center gap-1">
                                                                                <div>{p.name}</div>
                                                                                <div>{p.character}</div>
                                                                            </div>
                                                                            </div>)}
            </div>
            {!videodata && "Loading"}
            {videodata && videodata.results.length === 0 && <p>No Videos Available</p>}
            {videodata && 
                <div className="col-span-2 flex justify-center py-2 mx-2 gap-2">
                {videodata.results.length > 0 && <div className="w-1/2"><iframe className="w-full aspect-video rounded-xl"  src={`https://www.youtube.com/embed/${videodata.results[0].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>}
                {videodata.results.length > 1 && <div className="w-1/2"><iframe className="w-full aspect-video rounded-xl" src={`https://www.youtube.com/embed/${videodata.results[1].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>}
            </div>
            }
            <div className="col-span-2 mx-2">
                <img className="rounded-xl" src={`${imglink}${detailsData.backdrop_path}`} alt="" />
            </div>
        </div>
        }
        </>
    )
}

