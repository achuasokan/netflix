import axios from "axios"
import { useEffect, useRef, useState } from "react"
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
  const cardsRef =useRef<HTMLDivElement | null>(null)

  const handleWheel =(e: WheelEvent)=> {
    e.preventDefault()
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += e.deltaY;
    }
  }
  useEffect(() => {

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel)
    }

    axios.get(url).then((response)=>  {
      setMovies(response.data.results)
     })
  }, [url])
  
  return (
    <>
   <h2 className="font-medium md:text-xl p-4 capitalize">{title}</h2>
   <div className="relative flex items-center">
    <div  className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide" ref={cardsRef}>
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