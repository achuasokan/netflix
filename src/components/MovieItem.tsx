import { useState } from "react";
import { createImageUrl } from "../services/movieServices"
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { userAuth } from "../context/AuthContext";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db  } from "../services/firebase";
import { toast } from "react-toastify";
interface Movie {
  title: string;
  backdrop_path: string; 
  poster_path: string;   
}

const MovieItem = ({movie}: {movie: Movie}) => {

  const [like, setLike] = useState(false)
  const {user} = userAuth();
  const {title, backdrop_path, poster_path} = movie

  //* Function to mark a movie as a favorite
  const markFavShow = async () => {
    const userEmail = user?.email;

    if(userEmail) {
      const userDoc = doc(db, 'users', userEmail)
      setLike(!like)
      await updateDoc(userDoc, {
        favShows: arrayUnion({...movie})
      })
    } else {
      toast.error('Please login to like a movie')
    }
  }

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
   <img className="w-full h-40 block object-cover object-top" src={createImageUrl(backdrop_path ?? poster_path, "w500")} alt={title} />

   <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-80">
   <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold ">{title}</p>

   <p onClick={markFavShow} className="cursor-pointer">
    {like ? <FaHeart size={20} className="absolute top-2 left-2 text-gray-300" /> : <FaRegHeart  size={20} className="absolute top-2 left-2 text-gray-300"/>}
   </p>
   </div>
    </div>
  )
}

export default MovieItem