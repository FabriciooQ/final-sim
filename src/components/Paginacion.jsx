import "./Paginacion.css"
import { ChevronLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"

export default function Paginacion({cambiarPagina, paginas, actual}){

    function handleAnterior(){
        cambiarPagina(-1)


    }

    function handleSiguiente(){
        cambiarPagina(1)

    }

    return(
            <div className="paginacion-container">
                <ul>
                    <li>
                        <button onClick={handleAnterior} className="paginacion-button-anterior">
                            <ChevronLeft size={20} color="#189dcd" />
                            <p>Anterior</p>
                        </button>
                    </li>
                    <li><p className="paginacion-texto">{Number(actual)+1} de {Number(paginas)+1}</p></li>
                    <li>
                        <button onClick={handleSiguiente} className="paginacion-button-siguiente">
                            <p>Siguiente</p>
                            <ChevronRight size={20} color="#189dcd"/>    
                        </button>
                    </li>
                </ul>
            </div>
    )
}