import './app.css'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Homepage } from "./pages/home/Homepage"
import { Buy } from './pages/buy/Buy'
import { Sell } from './pages/sell/Sell'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Profile } from './pages/profile/Profile'
import { Wishlist } from './pages/wishlist/Wishlist'
import { ProductDetails } from './pages/productDetails/ProductDetails'

function App() {

  const { user } = useContext(AuthContext)

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={<Sell />} />
          {/* <Route path='/buy' element={user ? <Buy /> : <Navigate to="/login" replace />} /> */}
          {/* <Route path='/sell' element={user ? <Sell /> : <Navigate to="/login" replace />} /> */}
          <Route path='/login' element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path='/register' element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='details/:id' element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </AuthContextProvider>
  )
}

export default App
