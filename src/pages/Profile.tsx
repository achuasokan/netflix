import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import { userAuth } from '../context/AuthContext'
import {db} from '../services/firebase'
import { createImageUrl } from '../services/movieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'


const Profile = () => {
  const [movies ,setMovies] = useState([])
  const {user} = userAuth()
  
  useEffect(()=> {
    if(user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc)=> {
        const data = doc.data()
        if(data) setMovies(data.favShows);
      })
    }
  },[user?.email])

  const slide = (offset: number) => {
    const slider = document.getElementById('slider')
    if(slider) {
      slider.scrollLeft = slider.scrollLeft + offset
    }
  }

  const removeShow =async (movie) => {
    const userDoc = doc(db, 'users', user.email)
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    })
  }
  return(
    <>
    <div>
      <div>
        <img  className="block w-full h-[500px] object-cover"src="/dream111 (5).jpg" alt="///" />

        <div className='bg-black/50 fixed top-0 left-0 w-full h-[500px]' />

        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl text-bold my-2'>My Shows</h1>
           <p className='text-lg text-gray-400'>{user.email}</p>
        </div>
      </div>

      {/* Movie Row */}
      <h2 className="font-medium md:text-xl p-4 capitalize">Favorite Shows</h2>
   <div className="relative flex items-center group">
    <MdChevronLeft onClick={()=> slide(-500)}className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-50 hidden group-hover:block cursor-pointer" size={40} />
    <div  id={`slider`} className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
      {
        movies.map((movie) => (

          <div key={movie.id}className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">

   <img className="w-full h-40 block object-cover object-top" src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title} />

   <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-80">

   <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold ">{movie.title}</p>
   <p > 
    <AiOutlineClose size={30}  onClick={()=> removeShow(movie)}className='absolute top-2 right-2' />
   </p>

   </div>
    </div>
        ))
      }
    </div>
    <MdChevronRight onClick={()=> slide(500)}className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-50 hidden group-hover:block cursor-pointer" size={40}/>
   </div>
    </div>
    </>
  )
}

export default Profile