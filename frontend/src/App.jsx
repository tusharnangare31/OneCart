import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/login' element ={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
