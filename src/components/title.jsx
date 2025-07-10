import { Link } from "react-router-dom"
import { User  } from 'lucide-react';
export default function Title(){

    return (
        <div className="relative border-b-1 border-gray-700 mb-2 pb-1 rounded sm:border-none sm:mb-0 sm:pb-0">
          <h1 className="sm:m-4 sm:text-8xl text-center font-clicker cust-drop-shadow 
                         m-2 text-6xl"><Link to='/'>Chitram</Link></h1>
          <div className="absolute text-lg sm:text-3xl top-[50%] right-5 " title="My Collection"><Link to="/user"><User className="w-6 h-6 sm:w-8 sm:h-8 hover:fill-gray-600 hover:scale-105" /></Link></div>
        </div>
    )
}