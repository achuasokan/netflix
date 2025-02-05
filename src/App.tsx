import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <>
    <AuthProvider>
    <Navbar />
    <ToastContainer theme='dark'/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
    </Routes>
    <Footer />
    </AuthProvider>
   
    </>
  )
}

export default App
