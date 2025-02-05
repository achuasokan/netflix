import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

const Navbar = () => {
  const {user,logout} = userAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className='absolute w-full p-4 flex items-center justify-between z-50'>
      <Link to='/'>
      <h1 className='uppercase text-red-600 cursor-pointer font-bold text-5xl'>netflix</h1>
      </Link>

      {
        user ? (
          <div className=''>
          <Link to='/profile'>
          <button type="button" className=' px-4 py-1 rounded cursor-pointer mr-4'>Profile</button>
          </Link>

          <button onClick={handleLogout} type="button" className='bg-red-600 px-4 py-1 rounded cursor-pointer mr-30'>Logout</button>
        </div>
        ) : (

          <div className=''>
          <Link to='/login'>
          <button type="button" className='bg-red-600 px-4 py-1 rounded cursor-pointer mr-30'>Login</button>
          </Link>
        </div>

        )

      }


    </div>
    
  )
}

export default Navbar