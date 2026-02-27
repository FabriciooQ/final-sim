import { useEffect } from "react"
import { useState } from "react"
import './Pantalla2.css'
import TablaEventos from "./TablaEventos"
import TablaTrabajo from "./TablaTrabajos"

export default function Pantalla2({paramsSimulation}){

    const[datos,setDatos] = useState(null)
    const[promedio, setPromedio] = useState(0)

    useEffect(()=>{
        const worker = new Worker(new URL("../worker/worker.js", import.meta.url), { type: "module" })

        worker.postMessage({...paramsSimulation})

        worker.onmessage = (datos) =>{
            setDatos(datos.data)
            const estadisticas = datos.data.eventos[datos.data.eventos.length-1].estadisticas
            setPromedio((estadisticas.tiempoTrabajo / estadisticas.trabajosTerminados).toFixed(4))
        }

        
        return () => worker.terminate();
    },[])

    return(
        <>
            <h1>Tabla Eventos</h1>
            <div className="table-wrapper">
                <TablaEventos datos={datos!=null?datos.eventos:null}></TablaEventos>
            </div>
            <h3 id="table-promedio">Tiempo promedio en terminar un trabajo: <strong>{promedio}</strong></h3>
            <h1 className="pantalla2-h1">Tabla Trabajos</h1>
            <div className="table-wrapper table-scrollx">
                <TablaTrabajo trabajos={datos!=null?datos.trabajos:null}></TablaTrabajo>
            </div>   
        </>
    )
}