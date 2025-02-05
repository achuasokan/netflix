import axios from "axios"
import { useEffect, useRef, useState } from "react"

//^ Import MovieItem component to display individual movie items
import MovieItem from "./MovieItem"
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'   //^ icons for navigation

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


  const rowId = Math.floor(Math.random() * 1000)

   //* Function to slide the movie cards left or right
  const slide = (offset: number) => {
    const slider = document.getElementById('slider' + rowId)
    if(slider) {
      slider.scrollLeft = slider.scrollLeft + offset
    }
  }

  //* Function to handle mouse wheel scrolling
  const handleWheel =(e: WheelEvent)=> {
    e.preventDefault()
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += e.deltaY;
    }
  }

  //* useEffect to fetch movies and set up event listener
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
   <div className="relative flex items-center group">
    <MdChevronLeft onClick={()=> slide(-500)}className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-50 hidden group-hover:block cursor-pointer" size={40} />
    <div  id={`slider` + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide" ref={cardsRef}>
      {
        movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))
      }
    </div>
    <MdChevronRight onClick={()=> slide(500)}className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-50 hidden group-hover:block cursor-pointer" size={40}/>
   </div>
    </>
  )
}

export default MovieRow