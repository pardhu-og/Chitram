export default function About(){

    return(
        <div className="flex flex-col gap-4 caret-transparent 
                        ">
            <section className=" rounded-lg shadow-md pb-4">
                <h2 className="bg-gray-800 text-white m-1 mb-2 p-1  font-semibold  text-center
                                md:m-2 md:mb-4 md:p-2 md:text-xl
                                lg:m-3 lg:mb-6 lg:p-3 lg:text-2xl
                                ">About Chitram</h2>
                <p className="text-justify m-1 p-1  
                               md:m-2 md:px-2 md:text-lg
                               lg:m-3 lg:px-3 lg:text-xl lg:leading-relaxed">Chitram is a responsive web application that allows users to explore the movie universe in an organized and engaging way.</p>
                <p className="text-justify m-1 p-1  mb-0
                               md:m-2 md:p-2 md:text-lg md:mb-0
                               lg:m-3 lg:mb-0 lg:px-3 lg:text-xl lg:leading-relaxed">You can:</p>
                <ul className="p-1 m-1 list-disc 
                                md:p-2 md:m-2 md:text-lg
                                lg:px-3 lg:m-3 lg:mt-0 lg:text-xl lg:leading-relaxed">
                    <li className="ml-8 mb-1">Browse movies by categories like Now Playing, Trending, Upcoming, and Top Rated of all time.</li>
                    <li className="ml-8 mb-1">Search individual movie titles.</li>
                    <li className="ml-8 mb-1">View in-depth details including ratings, overview, trailers, cast, and crew.</li>
                    <li className="ml-8 mb-1">Bookmark movies to your Watch List and Seen List.</li>
                    <li className="ml-8 mb-1">Explore profiles of actors and crew members, and bookmark your favourite stars.</li>
                    <li className="ml-8 mb-1">Access all your saved lists in one place to track your movie journey.</li>
                </ul>
                <p className="text-justify m-1 p-1  mb-0
                               md:m-2 md:p-2 md:text-lg md:mb-0
                               lg:m-3 lg:p-3 lg:text-xl lg:leading-relaxed">This project demonstrates RESTful API integration, component-based UI with React, and responsive design using Tailwind CSS.</p>
            </section>

            <section className=" rounded-lg shadow-md pb-4">
                <h2 className="bg-gray-800 text-white m-1 mb-2 p-1  font-semibold  text-center
                                md:m-2 md:mb-3 md:p-2 md:text-xl
                                lg:m-3 lg:mb-4 lg:p-3 lg:text-2xl
                                ">Powered By</h2>
                <p className="text-justify m-2 p-1  
                               md:m-2 md:p-2 md:text-lg
                               lg:m-3 lg:p-3 lg:text-xl lg:leading-relaxed">This application uses the TMDB API, an extensive, community-driven movie database. Special thanks to The Movie Database (TMDB) for providing access to their extensive data.</p>
                <p className="text-justify m-2 p-1  ml-5 border-l-4 border-gray-700
                               md:m-2 md:p-2 md:text-lg md:ml-6
                               lg:m-3 lg:p-3 lg:text-xl lg:ml-16 lg:leading-relaxed"><span className="font-medium">Disclaimer:</span> The listings in "Now Playing" and "Upcoming" sections may sometimes not reflect the latest theatrical releases. This is due to the TMDB database being user-maintained, and some data might not be frequently updated for all regions.</p>
            </section>

            <section className=" rounded-lg shadow-md pb-4">
                <h2 className="bg-gray-800 text-white m-1 mb-2 p-1  font-semibold  text-center
                                md:m-2 md:mb-3 md:p-2 md:text-xl
                                lg:m-3 lg:mb-4 lg:p-3 lg:text-2xl
                                ">About the Developer</h2>
                <p className="text-justify m-2 p-1  
                               md:m-2 md:p-2 md:text-lg
                               lg:m-3 lg:px-3 lg:text-xl lg:leading-relaxed">Hi! I'm Pardhasaradhi Alaparthi, a frontend developer focused on building clean, functional, and real-world-ready web apps. This project is a part of my journey to become a skilled and impactful developer. You can explore more about my work below:</p>
                <ul className="p-1 m-2 font-medium 
                                md:p-2 md:m-2 md:text-lg
                                lg:px-3 lg:m-3 lg:text-xl lg:leading-relaxed">
                    <li>🔗 Github Repo: <a href="https://github.com/pardhu-og/Chitram" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline">View</a></li>
                    <li>🔗 LinkedIn: <a href="https://www.linkedin.com/in/pardhasaradhi-alaparthi-203786371" target="_blank" rel="noopener noreferrer" className="font-semibold  text-blue-600 underline">View</a></li>
                    <li>🔗 Blog: <a href="https://dialogue-with-machine-a-coders-journey.hashnode.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline">View</a></li>
                    <li>🔗 Portfolio Site: <a href="https://portfolio-site-pardhasaradhi-alaparthis-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline">View</a></li>
                </ul>
            </section>
        </div>
    )
}