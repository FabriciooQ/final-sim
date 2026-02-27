import { useState } from 'react'
import { NavBar } from './components/NavBar'
import Enunciado from './components/Enunciado'
import AjusteParametros from './components/AjusteParametros'
import './App.css'
import Pantalla1 from './components/Pantalla1'
import Pantalla2 from './components/Pantalla2'

function App() {

  const [visualization, setVisualization] = useState(1)
  const [paramsSimulation, setParamsSimulation] = useState(
    {
        expMedia: 12,
        expLambda: 0.0833,
        uniformeLi: 1,
        uniformeLs: 10,
        normalMedia: 8,
        normalDesv: 5,
        cola: 3,
        flagCola: false,
        tiempo: 1000,
        filas: 100,
    }
  )

  return (
    <div className='main-container'>
      <NavBar setVisualization={setVisualization}></NavBar>
      {visualization == 1 && <Pantalla1 paramsSimulation={paramsSimulation} setVisualization={setVisualization} setParamsSimulation={setParamsSimulation}></Pantalla1>}
      {visualization == 2 && <Pantalla2 paramsSimulation={paramsSimulation}></Pantalla2>}


    </div>
  )
}

export default App
