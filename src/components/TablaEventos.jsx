import "./TablaEventos.css"


export default function TablaEventos({datos}){

    function mapearEstado(estado){
        let colorBorder = "rgb(90, 39, 144)"
        let colorBackground = "rgba(153, 123, 185, 0.7)"
        //expresiones regulares
        const regexInicio = /^Ini.*/i
        const regexLlegada = /^lle.*/i
        const regexAtA = /^fin.*A$/i
        const regexAtB = /^fin.*B$/i
        const regexFin = /^fin.*n$/i
        //inicio
        if(regexInicio.test(estado)){
            colorBorder = "rgb(158, 137, 6)"
            colorBackground = "rgba(232, 207, 119, 0.7)"
        }
        //llegada
        else if(regexLlegada.test(estado)){
            colorBorder = "rgb(5, 137, 0)"
            colorBackground = "rgba(142, 229, 184, 0.7)"
        }
        //at A
        else if(regexAtA.test(estado)){
            colorBorder = "rgb(90, 39, 144)"
            colorBackground = "rgba(153, 123, 185, 0.7)"
        }
        //at B
        else if(regexAtB.test(estado)){
            colorBorder = "rgb(48, 88, 162)"
            colorBackground = "rgba(119, 152, 229, 0.7)"
        }
        //fin
        else if(regexFin.test(estado)){
            colorBorder = "rgb(120, 40, 45)"
            colorBackground = "rgba(197, 124, 129, 0.7)"
        }

        return <div style={{"--txt-color":colorBorder, "--back-color":colorBackground}} className="tabla-estado">{estado}</div>
    }

    function aDecimales(numero){
        if(numero == null || numero == undefined || numero==""){
            return "-"
        }else{
            return numero.toFixed(4)
        }
    }


    return(
        <>
            <table className="table-eventos">
                <thead>
                    <tr className="th-0">
                        <th rowSpan={2}>Reloj</th>
                        <th rowSpan={2}>Evento</th>
                        <th colSpan={3}>Llegadas</th>
                        <th colSpan={5}>Servidor A</th>
                        <th colSpan={6}>Servidor B</th>
                        <th colSpan={4}>Estadisticas</th>
                    </tr>
                    <tr className="th-1">
                        <th>rnd</th>
                        <th>Llegada</th>
                        <th className="border-rigth">Proxima</th>
                        <th>Cola</th>
                        <th>Estado</th>
                        <th>rnd</th>
                        <th>atencion</th>
                        <th className="border-rigth">Fin atencion</th>
                        <th>Cola</th>
                        <th>Estado</th>
                        <th>rnd1</th>
                        <th>rnd2</th>
                        <th>atencion</th>
                        <th className="border-rigth">Fin atencion</th>
                        <th>Trabajos en sistema</th>
                        <th>Tiempo A bloqueado</th>
                        <th>Trabajos terminados</th>
                        <th className="border-rigth">Tiempo trabajo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datos != null &&
                        datos.map((fila,index)=>{
                            return (
                                <tr key={index}>
                                    <td style={{fontWeight:"700"}} className="border-rigth">{fila.reloj.toFixed(4)}</td>
                                    <td className="border-rigth">{mapearEstado(fila.nombre)}</td>
                                    <td>{aDecimales(fila.rndLlegada)}</td>
                                    <td>{aDecimales(fila.llegada)}</td>
                                    <td className="border-rigth" style={{fontWeight:"700",color:"rgb(5, 137, 0)"}}>{fila.proxLlegada.toFixed(4)}</td>
                                    <td>{fila.colaA}</td>
                                    <td>{fila.estadoA}</td>
                                    <td>{aDecimales(fila.rndA)}</td>
                                    <td>{aDecimales(fila.atencionA)}</td>
                                    <td className="border-rigth" style={{fontWeight:"700",color:"rgb(90, 39, 144)"}}>{aDecimales(fila.finAtencionA)}</td>
                                    <td>{fila.colaB}</td>
                                    <td>{fila.estadoB}</td>
                                    <td>{aDecimales(fila.rndB[0])}</td>
                                    <td>{aDecimales(fila.rndB[1])}</td>
                                    <td >{aDecimales(fila.atencionB)}</td>
                                    <td className="border-rigth" style={{fontWeight:"700", color:"rgb(48, 88, 162)"}}>{aDecimales(fila.finAtencionB)}</td>
                                    <td>{fila.estadisticas.trabajosEnTaller}</td>
                                    <td>{aDecimales(fila.estadisticas.tiempoOciosoA)}</td>
                                    <td>{fila.estadisticas.trabajosTerminados}</td>
                                    <td className="border-rigth">{aDecimales(fila.estadisticas.tiempoTrabajo)}</td>
                                </tr>
                            )
                        }) 
                    }
                </tbody>
            </table>
            
        </>
    )
    
}