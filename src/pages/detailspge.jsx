import Title from "../components/title"
import detailsdatafrmId from '../data/sampleDetails.json'
import { useState } from "react"
import ImagesfrmId from '../data/sampleImages.json'
import videos from '../data/sampleVideos.json' // make a state for it
import caste from '../data/sampleCaste.json'
export default function DetailsPge (){
    const [detailsData, setDetailsData] = useState(detailsdatafrmId)
    const [imgData, setImgData] = useState(ImagesfrmId)
    const [castedata, SetCaste] = useState(caste)
    const imglink = "https://image.tmdb.org/t/p/original"
    return(
        <div className={`grid grid-cols-[240px_1fr] m-1 p-2 bg-[url(${imglink}${detailsData.backdrop_path})] bg-cover  gap-2 `}>
            <div>
                <img className="m-2 rounded-lg  " src={`${imglink}${imgData.posters[1].file_path}`} alt="" />
            </div>
            <div className="m-2 p-4 font-bold text-lg border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm  rounded-xl flex flex-col gap-3" >
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
                {castedata.cast.filter((p)=>p.order <=10).map((p)=><div key={p.id} className=" flex border border-white/30 bg-white/30 hover:bg-black/30 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm m-2 p-2 rounded-xl ">
                                                                            <div><img className="w-20 rounded-full aspect-square object-contain object-top" src={`${imglink}${p.profile_path}`} alt={`${p.name}` } /></div>
                                                                            <div className="flex flex-col justify-center">
                                                                                <div>{p.name}</div>
                                                                                <div>{p.character}</div>
                                                                            </div>
                                                                            </div>)}
            </div>
            <div className="col-span-2 flex py-2 mx-2 gap-2">
                <div className="w-1/2"><iframe className="w-full aspect-video rounded-xl"  src={`https://www.youtube.com/embed/${videos.results[0].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
                <div className="w-1/2"><iframe className="w-full aspect-video rounded-xl" src={`https://www.youtube.com/embed/${videos.results[1].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
            </div>
        </div>
    )
}




{/*
         <div>
         <div className={`bg-[url(${imglink}${detailsData.backdrop_path})] bg-cover `}>
            <div className=" p-6 flex flex-col gap-2 bg-white/20 backdrop-blur-md">
                <div className="flex ">
                    <img className="  w-1/4 rounded" src={`${imglink}${imgData.posters[1].file_path}`} alt="" />
                    <div className=" flex flex-col justify-between m-2 p-1 font-medium">
                        <div className="text-2xl">{detailsData.title}</div>
                        <div className="italic font-[400]  ">{detailsData.tagline}</div>
                        <div className="flex leading-none divide-x-[1.5px] ml-[-8px]">{detailsData.genres.map((p)=><div key={p.id} className="p-1 px-2 ">{p.name}</div>)}</div>
                        <div>Release Date: {detailsData.release_date}</div>
                        <div>{detailsData.vote_average}/10</div>
                        <div><button>Wish list</button> || <button>Watched List</button></div>
                        <div className="text-justify">Overview: {detailsData.overview}</div>
                    </div>
                </div>
                <div className="flex flex-wrap bg-white/30 justify-evenly p-4 gap-1 rounded">
                    {castedata.cast.filter((p)=>p.order <=10).map((p)=><div key={p.id} className="flex bg-white/30 p-2 rounded-xl ">
                                                                            <div><img className="w-20 rounded-full aspect-square object-contain object-top" src={`${imglink}${p.profile_path}`} alt={`${p.name}` } /></div>
                                                                            <div className="flex flex-col justify-center">
                                                                                <div>{p.name}</div>
                                                                                <div>{p.character}</div>
                                                                            </div>
                                                                            </div>)}
                </div>
            </div >
        </div>

        <div className="flex py-2 gap-2">
                        <div className="w-1/2"><iframe className="w-full aspect-video"  src={`https://www.youtube.com/embed/${videos.results[0].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
                        <div className="w-1/2"><iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${videos.results[2].key}`} title={`${videos.results[0].name}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>

        </div>
       </div>

    */}