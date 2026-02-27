import { useEffect } from "react"
import { useState } from "react"
import './Pantalla2.css'
import TablaEventos from "./TablaEventos"
import Paginacion from "./Paginacion"
import TablaTrabajo from "./TablaTrabajos"
import { useRef } from "react"
import useScrollToTop from "../hooks/useScrollToTop.js"

export default function Pantalla2({paramsSimulation}){

    const tabla = useRef(null)

    
    const[datos,setDatos] = useState(null)
    const [datosActuales, setDatosActuales] = useState(null)
    const[promedio, setPromedio] = useState(0)
    const[paginacion, setPaginacion] = useState({
        flag:false,
        paginaActual:0,
        paginas:0,
        cant:500,
        desde:0,
        hasta:0,
        limite:0,
    })
    
    function cambiarPaginaActual(numero){
        if(numero<0){
            if(paginacion.paginaActual+numero<0){
                return
            }
            if(paginacion.hasta==paginacion.limite){
                setPaginacion(p=>({
                    ...p,
                    hasta: p.desde,
                    desde: p.desde-p.cant,
                    paginaActual: p.paginaActual-1
                }))
            }else{
                setPaginacion(p=>({
                    ...p,
                    hasta: p.hasta-p.cant,
                    desde: p.desde-p.cant,
                    paginaActual: p.paginaActual-1
                }))
            }
            
        }else if(numero>0){
            if(paginacion.paginaActual+numero>paginacion.paginas){
                return
            }
            if(paginacion.hasta+paginacion.cant >= paginacion.limite){
                setPaginacion(p=>({
                    ...p,
                    hasta: p.limite,
                    desde: p.limite-p.desde-p.cant,
                    paginaActual: p.paginaActual+1
                }))
            }else{
                setPaginacion(p=>({
                    ...p,
                    hasta: p.hasta + p.cant,
                    desde: p.desde + p.cant,
                    paginaActual: p.paginaActual+1
                })) 
            }
            
        }
        
    }   

    //scrolleamos al principio
    useScrollToTop(tabla, paginacion.paginaActual)

    useEffect(()=>{
        if(datos != null && paginacion.flag){
            const datosCortados = datos.eventos.slice(paginacion.desde, paginacion.hasta)
            setDatosActuales(datosCortados)
        }else if(datos!=null){
            setDatosActuales(datos.eventos)
        }
    },[paginacion,datos])
    

    useEffect(()=>{
        const worker = new Worker(new URL("../worker/worker.js", import.meta.url), { type: "module" })

        worker.postMessage({...paramsSimulation})

        worker.onmessage = (datos) =>{
            setDatos(datos.data)
            //calculamos promedio
            const estadisticas = datos.data.eventos[datos.data.eventos.length-1].estadisticas
            setPromedio((estadisticas.tiempoTrabajo / estadisticas.trabajosTerminados).toFixed(4))
            //vemos si va a haber paginacion o no
            if(datos.data.eventos.length > paginacion.cant){
                const cantPag = Math.round(datos.data.eventos.length / paginacion.cant)
                setPaginacion(p=>(
                    {
                        ...p,
                        flag:true,
                        paginas:cantPag,
                        desde:0,
                        hasta:p.cant,
                        limite:datos.data.length
                    }
                ))
            }
        }

        
        return () => worker.terminate();
    },[])

    return(
        <>
            <h1>Tabla Eventos</h1>
            <div ref={tabla} className="table-wrapper">
                <TablaEventos datos={datosActuales!=null?datosActuales:null}></TablaEventos>
            </div>
            <div className="estadistica-wrapper">
                <h3 id="table-promedio">Tiempo promedio en terminar un trabajo: <strong>{promedio}</strong></h3>
                {paginacion.flag && <Paginacion cambiarPagina={cambiarPaginaActual} actual={paginacion.paginaActual} paginas={paginacion.paginas}></Paginacion>}
            </div>
            <h1 className="pantalla2-h1">Tabla Trabajos</h1>
            <div className="table-wrapper table-scrollx">
                <TablaTrabajo trabajos={datos!=null?datos.trabajos:null}></TablaTrabajo>
            </div>   
        </>
    )
}