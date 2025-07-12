import { Link } from "react-router-dom"
import { User  } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
// import sample from '../data/sampleSearch.json'

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
    const x = data.results.slice(0,6)
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
        <div className="border-b-1 border-gray-700 mb-2 pb-1 rounded sm:border-none sm:mb-0 sm:pb-0 flex flex-col">
          <h1 className="sm:m-4 sm:text-8xl text-center font-clicker cust-drop-shadow 
                         m-2 text-6xl"><Link to='/'>Chitram</Link>
          </h1>
          <div className="self-end mr-4 mb-1 flex gap-2 mr-50">
            <div className="">
              <input type="text" value={value} onChange={handleChange} placeholder="Search..." className="border rounded-lg px-2 w-40 h-6 self-end my-2" />
              <div className={`absolute z-10 p-1 w-40 border rounded-xl flex-col gap-1 bg-white divide-y ${value.trim() !== ""?"flex":"hidden"}`}>
                {value.trim() !=="" && displayResults.length === 0 && <h1 className='m-10 text-xl sm:text-4xl text-center'>Loading... <div className='sm:h-6 sm:w-6 h-4 w-4 m-1 mb-0 pb-0 border-b-2 border-r-1 sm:border-b-3 sm:border-r-1 border-blue-800 inline-block rounded-full animate-spin'></div></h1>}
                {displayResults.map(p=> <Link onClick={handleLinkClick} key={p.id} to={`/${p.id}`}>
                                          <div className="flex items-center">
                                            <img src={`https://image.tmdb.org/t/p/w300${p.poster_path}`} alt={p.title} className="h-20"/>
                                            <div className="text-md">{p.title}</div>
                                          </div>
                                        </Link>)}
              </div>

            </div>            
            <div className=" text-lg sm:text-3xl top-[50%] right-5 " title="My Collection"><Link to="/user"><User className="w-6 h-6 sm:w-8 sm:h-8 hover:fill-gray-600 hover:scale-105" /></Link></div>
          </div>
        </div>
    )
}