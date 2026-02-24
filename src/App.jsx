import { useState } from 'react'
import { NavBar } from './components/NavBar'
import Enunciado from './components/Enunciado'
import AjusteParametros from './components/AjusteParametros'
import './App.css'

function App() {


  return (
    <div className='main-container'>
      <NavBar/>
      <Enunciado/>
      <AjusteParametros/>

    </div>
  )
}

export default App
