import { useState,FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const Login = () => {
  const [rememberLogin, setRememberMe] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const { login } = userAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault()  
      await login(email,password)
      toast.success('login success')
      navigate('/') 
  }
  
  return(
    <>
    <div className="w-full h-screen relative">
      <img  className="hidden sm:block absolute w-full h-full object-cover" src="/dream111 (5).jpg" alt="///" />

      <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

      <div className="relative w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl text-bold ">Login</h1>

            <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
              <input className="p-3 my-2 bg-gray-700 rounded" type='email' placeholder='Enter Your email' autoComplete="email" value={email} onChange={(e)=> setEmail(e.target.value)}/> 
              <input className="p-3 my-2 bg-gray-700 rounded" type='password' placeholder='Enter Your Password' autoComplete="current-password" value={password} onChange={(e)=> setPassword(e.target.value)}/> 

              <button type='submit' className="bg-red-600 py-3 my-6 rounded">Submit</button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  
                  <input type='checkbox' className="mr-2" checked={rememberLogin} onChange={(e)=> setRememberMe(!rememberLogin)}/>
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-4">
                <span className="text-gray-600 mr-2">New to Netflix?</span>
                <Link to='/signup'>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login