import { Link } from "react-router-dom"
export default function Title(){

    return (
        <div className="relative">
          <h1 className="  m-4 text-8xl text-center font-medium font-clicker cust-drop-shadow "><Link to='/'>Chitram</Link></h1>
          <div className="absolute text-3xl top-[50%] -translate-y-1/2 right-5 "><Link to="/user">👤</Link></div>
        </div>
    )
}