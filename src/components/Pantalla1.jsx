import AjusteParametros from "./AjusteParametros";
import Enunciado from "./Enunciado";
import { NavBar } from "./NavBar";

export default function Pantalla1({paramsSimulation, setVisualization, setParamsSimulation}){
    return(
        <>
            <Enunciado></Enunciado>
            <AjusteParametros paramsSimulation={paramsSimulation} setVisualization={setVisualization} setParamsSimulation={setParamsSimulation}></AjusteParametros>
        </>

    )
}