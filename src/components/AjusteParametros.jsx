import { GestorSimulacion } from "../simulacion/GestorSimulacion"
import "./AjusteParametros.css"
import { useState } from "react"

export default function AjusteParametros({paramsSimulation, setVisualization, setParamsSimulation}){

    const [formData, setFormData] = useState({
        expMedia: 12,
        expLambda: 0.0833,
        uniformeLi: 1,
        uniformeLs: 10,
        normalMedia: 8,
        normalDesv: 5,
        cola: 3,
        flagCola: false,
        tiempo: 100,
        filas: 100,
    })

    const [errores, setErrores] = useState({
        expMedia:"",
        expLambda: "",
        uniformeLi: "",
        uniformeLs: "",
        normalMedia: "",
        normalDesv: "",
        cola: "",
        tiempo: "",
        filas: "",
    })

    function truncar(num){
        if(num==""){
            return ""
        }
        return Math.trunc(num * 10000) / 10000;
        
    } 

    function handleChangeExpMedia(e){
        setParamsSimulation(prev=>({
            ...prev,
            expMedia: truncar(e.target.value),
            expLambda: truncar(1/e.target.value)
        }))   
    }
    
    function handleChangeExpLambda(e){
        setParamsSimulation(prev=>({
            ...prev,
            expLambda: truncar(e.target.value),
            expMedia: truncar(1/e.target.value)
        }))   
    }

    function validar(){
        let error = false
        //exponencial
        if(Number(paramsSimulation.expMedia<=0)){
            error=true
            setErrores(prev =>({
                ...prev,
                expMedia:"debe ser mayor a cero"
            }))
        }else{
            setErrores(prev =>({
                ...prev,
                expMedia:""
            }))
        }
         if(Number(paramsSimulation.expLambda<=0)){
            error=true
            setErrores(prev =>({
                ...prev,
                expLambda:"debe ser mayor a cero"
            }))
        }else{
            setErrores(prev =>({
                ...prev,
                expLambda:""
            }))
        }

        //uniforme
        if(Number(paramsSimulation.uniformeLi<1)){
            error=true
            setErrores(prev =>({
                ...prev,
                uniformeLi:"debe ser mayor a 1"
            }))
        }else{
            setErrores(prev =>({
                ...prev,
                uniformeLi:""
            }))
        }
         if(Number(paramsSimulation.uniformeLs) <= Number(formData.uniformeLi)){
            error=true
            setErrores(prev =>({
                ...prev,
                uniformeLs:"debe ser mayor a li"
            }))
        }else{
            setErrores(prev =>({
                ...prev,
                uniformeLs:""
            }))
        }
        //servidor normal
        if(Number(paramsSimulation.normalMedia)<0){
            error=true
            setErrores(prev=>({
                ...prev,
                normalMedia:"debe ser positiva"
            }))
        }else{
            setErrores(prev=>({
                ...prev,
                normalMedia:""
            }))
        }
        if(Number(paramsSimulation.normalDesv)<0){
            error=true
            setErrores(prev=>({
                ...prev,
                normalDesv:"debe ser positiva"
            }))
        }else{
            setErrores(prev=>({
                ...prev,
                normalDesv:""
            }))
        }

        //cola
        if(!formData.flagCola && (Number(paramsSimulation.cola)<0 || !Number.isInteger(Number(paramsSimulation.cola)))){
            error=true
            setErrores(prev=>({
                ...prev,
                cola:"debe ser positivo y entero"
            }))
        }else{
            setErrores(prev=>({
                ...prev,
                cola:""
            }))
        }

        //limites
        if(Number(paramsSimulation.tiempo)<0){
            error=true
            setErrores(prev=>({
                ...prev,
                tiempo:"debe ser positivo"
            }))
        }else{
            setErrores(prev=>({
                ...prev,
                tiempo:""
            }))
        }
        if(Number(paramsSimulation.filas) < 0 || !Number.isInteger(Number(paramsSimulation.filas))){
            error=true
            console.log("si:", formData.filas, " , ",)
            
            setErrores(prev=>({
                ...prev,
                filas:"debe ser positivo y entero"
            })) 
        }else{
            setErrores(prev=>({
                ...prev,
                filas:""
            }))
        }


        return error
    }

    function handleOnSubmit(e){
        e.preventDefault()
        const error = validar()
        if(!error){
            let cola = Number(paramsSimulation.cola)
            if(paramsSimulation.flagCola){
                cola = 10000000
            }

            setVisualization(2)
        }
    }

    return(
        <div className="parametros-container">
            <div className="parametros-titulo">
                <h1>Ajuste de parametros</h1>
            </div>
            <form className="parametros-form" onSubmit={(e)=>{handleOnSubmit(e)}}>
                <div className="parametros-izquierda">
                    <h2>Llegada (exp)</h2>
                    <div className="parametros-section">
                        <label 
                            className={errores.expMedia !== "" ? "inputErrorLabel" : ""}
                            htmlFor="">{errores.expMedia !== "" ? `μ ${errores.expMedia}` : "μ"}</label>
                        <input value={paramsSimulation.expMedia} 
                            onChange={(e)=>{handleChangeExpMedia(e)}} 
                            required
                            type="number" />
                    </div>
                    <div className="parametros-section">
                        <label 
                            className={errores.expLambda !== "" ? "inputErrorLabel" : ""}
                            htmlFor="">{errores.expLambda !== "" ? `λ ${errores.expLambda}` : "λ"}</label>
                        <input value={paramsSimulation.expLambda} 
                            onChange={(e)=>{handleChangeExpLambda(e)}} 
                            required
                            type="number" />
                    </div>
                    <h2 id="corte">Corte</h2>
                    <div className="parametros-section">
                        <label 
                            className={errores.tiempo !== "" ? "inputErrorLabel" : ""}
                            htmlFor="">{errores.tiempo!==""?`tiempo ${errores.tiempo}` : "tiempo"}</label>
                        <input value={paramsSimulation.tiempo} 
                            onChange={(e)=>{setParamsSimulation(f=>({...f,tiempo:e.target.value}))}}
                            required
                            type="number" />
                    </div>
                    <div className="parametros-section">
                        <label 
                            className={errores.filas !== "" ? "inputErrorLabel" : ""}
                            htmlFor="">{errores.filas!==""?`filas ${errores.filas}`:"filas"}</label>
                        <input value={paramsSimulation.filas} 
                            onChange={(e)=>{
                                if(e.target.value>10000){
                                    setParamsSimulation(f=>({...f, filas:10000}))
                                }else{
                                    setParamsSimulation(f=>({...f,filas:e.target.value}
                                ))}}}
                            required 
                            type="number" />
                    </div>
                </div>

                <div className="parametros-derecha">
                    <h2>Servidores</h2>
                    <h3>Servidor A (uniforme)</h3>
                    <span className="parametros-renglon">
                        <div className="parametros-section">
                            <label 
                                className={errores.uniformeLi !== "" ? "inputErrorLabel" : ""}
                                htmlFor="">{errores.uniformeLi!==""?`li ${errores.uniformeLi}`:"li"}</label>
                            <input value={paramsSimulation.uniformeLi} 
                                onChange={(e)=>{setParamsSimulation(f=>({...f,uniformeLi:e.target.value}))}} 
                                required
                                type="number" />
                        </div>
                        <div className="parametros-section">
                            <label 
                                className={errores.uniformeLs !== "" ? "inputErrorLabel" : ""}
                                htmlFor="">{errores.uniformeLs!==""?`ls ${errores.uniformeLs}`:"ls"}</label>
                            <input value={paramsSimulation.uniformeLs} 
                                onChange={(e)=>{setParamsSimulation(f=>({...f,uniformeLs:e.target.value}))}} 
                                required
                                type="number" />
                        </div>
                    </span>
                    <h3>Servidor B (normal)</h3>
                    <span className="parametros-renglon">
                        <div className="parametros-section">
                            <label 
                                className={errores.normalMedia !== "" ? "inputErrorLabel" : ""}
                                htmlFor="">{errores.normalMedia!==""?`μ ${errores.normalMedia}`:"μ"}</label>
                            <input value={paramsSimulation.normalMedia} 
                                onChange={(e)=>{setParamsSimulation(f=>({...f,normalMedia:e.target.value}))}} 
                                required
                                type="number" />
                        </div>
                        <div className="parametros-section">
                            <label 
                                className={errores.normalDesv !== "" ? "inputErrorLabel" : ""}
                                htmlFor="">{errores.normalDesv!==""?`σ ${errores.normalDesv}`:"σ"}</label>
                            <input value={paramsSimulation.normalDesv} 
                                onChange={(e)=>{setParamsSimulation(f=>({...f,normalDesv:e.target.value}))}} 
                                required
                                type="number" />
                        </div>
                    </span>
                    <h3>Cola entre servidores</h3>
                    <div className="parametros-section">
                            <label 
                                className={errores.cola !== "" ? "inputErrorLabel" : ""}
                                htmlFor="">{errores.cola!==""?`Capacidad ${errores.cola}`:"Capacidad"}</label>
                            <input  value={paramsSimulation.cola} 
                                disabled={paramsSimulation.flagCola}
                                onChange={(e)=>{setParamsSimulation(f=>({...f,cola:e.target.value}))}} 
                                required
                                type="number" />
                    </div>
                    <span className="parametros-checkbox">
                        <input checked={paramsSimulation.flagCola} 
                            onChange={(e)=>{setParamsSimulation(f=>({...f,flagCola:e.target.checked}))}} 
                            type="checkbox" />
                        <label htmlFor="">infinita</label>
                    </span>
                </div>
                <button type="submit" className="parametros-btn">Simular</button>
            </form>
        </div>
    )
}