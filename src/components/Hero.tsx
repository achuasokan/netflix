import axios from 'axios'
import { useEffect, useState } from "react"
import endpoints, { createImageUrl } from '../services/movieServices'


interface Movie {
  title: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
}

const Hero = () => {
  const [movie,setMovie] = useState<Movie | null>(null)

  useEffect(()=> {
    axios.get(endpoints.popular).then((response)=> {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]   
      setMovie(randomMovie)   
    })
  },[])


  const {title, backdrop_path, release_date, overview } = movie || {}

  const truncate = (str: string | undefined, length: number) => {
    if(!str) return ""
    return str.length > length ? str.slice(0, length) + '...' : str;
  }

  return (
    <>
    <div className='w-full h-[550px] lg:h-[700px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black' />   
          <img  className="w-full h-full object-cover object-top" src={createImageUrl(backdrop_path || '','original')} alt={title || 'MOvie Title'} />
        {/* </div> */}

        <div className='absolute w-full top-[20%] lg:top-[40%] p-4 md:p8'>
          <h1 className='text-3xl md:text-6xl font-bold'>{title}</h1>
          <div className='mt-8 mb-4'>
            <button type='button'className='border bg-gray-300 py-2 px-2 text-black ml-2'>Play</button>
            <button type='button' className='border border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
          </div>
          <p className='text-gray-400 text-sm'>{release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[35%] xl:max-w-[35%] text-gray-200'>{truncate(overview, 200)}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero