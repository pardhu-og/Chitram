import { Link } from "react-router-dom"
import { User  } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";

export default function Title(){
const [displayResults, setDisplayResults] = useState([]);
const[value, setValue] = useState("")
const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_TMDB_TOKEN
                    },
                }
function handleLinkClick(){
  setDisplayResults([])
  setValue("")
}

function handleChange(e){
  setValue(e.target.value)
}

function debounce(callback, delay){
  let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

const debouncedFetch = useCallback(debounce(fetchFunc, 2000), []);
  async function fetchFunc(query){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
    if(!res.ok) {throw new Error(`Error fetching ${res.url}, ${res.status}:${res.statusText}`);};
    const data = await res.json();
    const x = data.results.sort((a,b)=> b.popularity - a.popularity ).slice(0,6)
    setDisplayResults(x)
  } catch(err){console.log(err)}
}


useEffect(()=>{
if(value.trim() !== "") {
  setDisplayResults([])
  debouncedFetch(value)
} 
},[value])

    return (
        <div className="border-b-1 border-gray-700 mb-2 pb-1 rounded sm:border-none sm:mb-0 sm:pb-0 flex flex-col items-center ">
          <h1 className="sm:m-4 sm:text-8xl text-center font-clicker cust-drop-shadow 
                         m-2 text-6xl"><Link to='/'>Chitram</Link>
          </h1>
          <div className="sm:self-end mb-1 flex gap-2 sm:mr-50">
            <div className="">
              <input type="text" value={value} onChange={handleChange} placeholder="Search..." className="border rounded-lg px-2 w-40 h-6 self-end my-2 font-[cursive]" />
              <div className={`absolute z-10 p-1 w-40 border rounded flex-col gap-1 bg-gray-300 divide-y ${value.trim() !== ""?"flex":"hidden"}`}>
                {value.trim() !=="" && displayResults.length === 0 && <div className='text-lg text-center'>Loading... <div className=' h-3 w-3 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></div>}
                {displayResults.map(p=> <Link onClick={handleLinkClick} key={p.id} to={`/${p.id}`}>
                                          <div className="flex items-center p-1 hover:text-red-600 transition rounded">
                                            <img src={`https://image.tmdb.org/t/p/w300${p.poster_path}`} alt={p.title} className="h-15"/>
                                            <div className="text-sm font-medium font-[cursive]">{p.title}</div>
                                          </div>
                                        </Link>)}
              </div>
            </div>            
            <div className=" text-lg sm:text-3xl m-1 " title="My Collection"><Link to="/user"><User className="w-6 h-6 sm:w-7 sm:h-7 hover:fill-gray-600 hover:scale-105" /></Link></div>
          </div>
          
        </div>
    )
}