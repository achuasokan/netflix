import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <div className='absolute w-full p-4 flex items-center justify-between z-50'>
      <Link to='/'>
      <h1 className='uppercase text-red-600 cursor-pointer font-bold text-5xl'>netflix</h1>
      </Link>


      <div className=''>
        <Link to='/login'>
        <button type="button" className='bg-red-600 px-4 py-1 rounded cursor-pointer mr-30'>Login</button>
        </Link>
      </div>
    </div>
    
  )
}

export default Navbar