import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './assets/Home'
import Register from './login/Register'
import Login from './login/Login'
import Chatsec from './assets/Chatsec'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/chatsec/:id' element={<Chatsec/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
