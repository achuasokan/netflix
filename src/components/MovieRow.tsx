import axios from "axios"
import { useEffect, useState } from "react"
import MovieItem from "./MovieItem"


interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string
}

interface MovieRowProps {
  title: string;
  url: string
}

const MovieRow = ({ title, url }: MovieRowProps) => {

  const [movies,setMovies] = useState<Movie[]>([])

  useEffect(() => {
    axios.get(url).then((response)=>  {
      console.log(response.data.results);
      
      setMovies(response.data.results)
     })
  }, [url])
  
  return (
    <>
   <h2 className="font-medium md:text-xl p-4 capitalize">{title}</h2>
   <div className="relative flex items-center">
    <div  id={`slider`} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
      {
        movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))
      }
    </div>
   </div>
    </>
  )
}

export default MovieRow