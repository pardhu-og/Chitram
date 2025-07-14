import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Heart } from "lucide-react"
export default function PersonsDetailspge (){
    const [biography, setBiography] = useState(false)
    const {personId} = useParams()
    const[personData, setPersonData] = useState(null)
    const[knownfortitels, setKnownfortitels] =useState(null)
    const [favourite, setFavourite] = useState(false)
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userdata")) || {"wishList":[], "seenList":[], "favactr":[]})
    function favouritefunc(){
        if(!favourite) {
           const data = [...userData.favactr, String(personId)]
            setUserData (p=>({...p, "favactr":data }))
            setFavourite(true)
        } else {
          const  data = userData.favactr.filter(p=> p!== personId)
            setUserData (p=>({...p, "favactr":[...data] }))
            setFavourite(false)
        }
    }

    useEffect(()=>{
        localStorage.setItem("userdata",JSON.stringify(userData))
    }, [userData])


    async function fetchPersonDetails(personId) {
          try{
            const res = await fetch(`https://api.themoviedb.org/3/person/${personId}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
        })
          if(!res.ok) {throw new Error("Error fetching Person Details", res.status, res.statusText);
          }
          const Data = await res.json()
          setPersonData(Data)
          const res2 = await fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits`,{
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    }
          })
            if(!res2.ok) {throw new Error("Error fetching Person Known for titles", res2.status, res2.statusText);
          }
          const Data2 = await res2.json();
          const Data3 = Data2.cast.sort((a,b) => b.popularity - a.popularity);
          setKnownfortitels(Data2)
          } catch(err) {console.log(err)}
        }


    useEffect(()=>{
        fetchPersonDetails(personId)
    },[personId])

    useEffect(()=>{
            if (userData.favactr.some(p=> p === String(personId))) {setFavourite(true)}
    },[])





    return (
        <>
        {(!personData || !knownfortitels) && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1> }
        {personData && knownfortitels &&
          <div >
            <div className={` flex-col  sm:grid-cols-[240px_1fr]  m-1 p-2 gap-2 bg-gradient-to-b from-gray-800/90 to-black/90 backdrop-blur-xl ${biography ? "hidden":"flex sm:grid"}`}>
              <img className="m-1 sm:m-2 rounded-xl object-contain border border-white/30" src={`https://image.tmdb.org/t/p/original${personData.profile_path}`} alt={`${personData.name}`} />
              <div className="overflow-hidden h-90 m-1 sm:m-2 p-4 pb-2 font-bold text-lg border border-white/30 bg-white/30 backdrop-blur-sm rounded-xl flex flex-col gap-3">
                  <div className="text-3xl font-extrabold font-comic self-center">{personData.name} <button onClick={favouritefunc} title={favourite?"Remove from Favourite":"Add to Favourite"} className="hover:cursor-pointer"><Heart className={` w-8 ${favourite?"fill-red-400":"fill-white/50"}`} /></button></div>
                  <div>Date of Birth: {personData.birthday}</div>
                  <div>Known for: {personData.known_for_department}</div>
                  <div>Place of Birth: {personData.place_of_birth}</div>
                  <div className={`-m-4 p-4 overflow-hidden text-justify ${personData.biography.length > 600?"bg-gradient-to-b from-transparent via-black/10 to-black rounded-xl":"" } relative`}>Biography: {personData.biography}
                  {personData.biography.length >600 && 
                  <button className=" -mx-6 -mb-1 pr-8 text-right absolute bottom-3 p-2 w-full bg-gradient-to-b from transparent to-black right-6 text-gray-200 text-sm font-medium hover:cursor-pointer hover:text-gray-500" onClick={()=>setBiography(true)}>Read More...</button>}
                  </div>
              </div>

            <div className=" col-span-2 flex flex-col m-1 sm:m-4 p-8 bg-white/30 rounded-lg gap-6">
                <div className="text-center text-2xl font-bold">Best Known For</div>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center p-4">
                {knownfortitels.cast.map((p)=>
                    <Link key={p.id} to={`/${p.id}`}>
                        <div className="sm:bg-white/5 bg-gray-200/40 w-60  sm:w-40 p-2 sm:p-1 rounded-xl cust-shadow relative group "> 
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
            </div>
            </div>
        </div>
        {biography && <div className="w-screen min-h-screen fixed inset-0  flex align-center bg-white/30 backdrop-blur-lg">
            <div className="relative bg-gray-800 m-2 p-4 sm:m-8 sm:p-8 text-gray-300 rounded-xl border-4 border-black/30 overflow-auto ">
                <div className="text-center text-3xl font-bold font-comic mb-8 mt-4">Biography</div>
                <div className=" text-lg font-medium text-justify ">{personData.biography}
                <button className=" absolute top-0 sm:-top-1  right-2 text-2xl hover:cursor-pointer hover:scale-110 font-bold text-white" onClick={()=>setBiography(false)}>x</button>
            </div>
            </div>
            </div>}
        </div>
        }
        </>
    )
}