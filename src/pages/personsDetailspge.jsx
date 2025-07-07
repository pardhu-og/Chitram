import { useEffect, useState } from "react"
// import samplePersons from "../data/samplePerson.json"
// import knownfor from "../data/sampleKnownfor.json"
import { Link, useParams } from "react-router-dom"
import { Heart } from "lucide-react"
export default function PersonsDetailspge (){
    const [biography, setBiography] = useState(false)
    const {personId} = useParams()
    const[personData, setPersonData] = useState(null)
    const[knownfortitels, setKnownfortitels] =useState(null)
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
          const Data2 = await res2.json()
          setKnownfortitels(Data2)
          } catch(err) {console.log(err)}
        }


    useEffect(()=>{
        fetchPersonDetails(personId)
    },[])









    return (
        <>
        {(!personData || !knownfortitels) && <div>Loading</div> }
        {personData && knownfortitels &&
                <div>
        <div className="grid grid-cols-[240px_1fr]  m-1 p-2 md:gap-2 bg-gradient-to-b from-gray-800/90 to-black/90 backdrop-blur-xl">
            <img className="m-2 rounded-xl object-contain border border-white/30" src={`https://image.tmdb.org/t/p/original${personData.profile_path}`} alt={`${personData.name}`} />
            <div className="overflow-hidden h-90 m-2 p-4 pb-2 font-bold text-lg border border-white/30 bg-white/30 backdrop-blur-sm rounded-xl flex flex-col gap-3">
                <div className="text-3xl font-extrabold font-[cursive]">{personData.name} <button className="hover:cursor-pointer"><Heart className=" w-8 fill-red-400" /></button></div>
                <div>Date of Birth: {personData.birthday}</div>
                <div>Known for: {personData.known_for_department}</div>
                <div>Place of Birth: {personData.place_of_birth}</div>
                <div className={`-m-4 p-4 overflow-hidden text-justify ${personData.biography.length > 600?"bg-gradient-to-b from-transparent via-black/10 to-black rounded-xl":"" } relative`}>Biography: {personData.biography}
                {personData.biography.length >600 && 
                <button className=" -mx-6 -mb-1 pr-8 text-right absolute bottom-3 p-2 w-full bg-gradient-to-b from transparent to-black right-6 text-gray-200 text-sm font-medium" onClick={()=>setBiography(true)}>Read More...</button>}
                </div>
            </div>

            <div className=" col-span-2 flex flex-col m-4 p-8 bg-white/30 rounded-lg gap-6 font-[cursive]">
                <div className="text-center text-2xl font-bold">Best Known For</div>
                <div className="flex flex-wrap gap-6 justify-center ">
                    {knownfortitels.cast.map((p)=>
                    <Link key={p.id} to={`/${p.id}`}>
                        <div className="bg-white/5  w-60 md:w-40 p-1 rounded-xl cust-shadow relative group m-0 "> 
                        <img src={`https://image.tmdb.org/t/p/w500${p.poster_path}`} alt={p.title} className=" rounded-lg "/>
                        <div className="w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-lg opacity-0 hover:opacity-100 rounded-xl ">
                        <div className=" text-center text-xl font-bold absolute top-0 left-1/2 translate-x-[-50%] flex flex-col justify-center h-full gap-2 ">
                            <div className="cust-drop-shadow overflow-hidden">{p.title}</div>
                            <div className="animate-revolve inline-block">⭐</div>  
                            <div className="cust-drop-shadow">{p.vote_average.toFixed(1)}/10</div>
                        </div>

                        </div>
                        </div>
                    </Link>
                )}
                </div>
            </div>
        </div>
        {biography && <div className="w-screen h-screen fixed top-0 flex align-center bg-white/30 backdrop-blur-lg">
            <div className="relative bg-gray-800 m-8 p-8 text-gray-300 rounded-xl border-4 border-black/30">
                <div className="text-center text-3xl font-bold font-[cursive] mb-8 mt-4">Biography</div>
                <div className=" text-lg font-medium text-justify ">{personData.biography}
                <button className=" absolute -top-1 right-2 text-2xl hover:cursor-pointer hover:scale-110 font-bold text-white" onClick={()=>setBiography(false)}>x</button>
            </div>
            </div>
            </div>}
        </div>
        }
        </>
    )
}