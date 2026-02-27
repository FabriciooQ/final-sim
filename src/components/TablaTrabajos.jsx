import "./TablaTrabajo.css"
export default function TablaTrabajo({trabajos}){

    function aDecimales(numero){
        if(numero == null || numero == undefined || numero==""){
            return "-"
        }else{
            return numero.toFixed(4)
        }
    }
    return(
        <table className="table-trabajo">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Estado</th>
                    <th>Hora llegada</th>
                    <th>Hora Atencion</th>
                    <th>Hora Salida</th>
                </tr>
            </thead>
                <tbody>
                    {trabajos != null && 
                    trabajos.map((t,i)=>{
                        return(
                            <tr key={i}>
                                <td>{t.id}</td>
                                <td>{t.estado}</td>
                                <td>{aDecimales(t.horaLlegada)}</td>
                                <td>{aDecimales(t.horaAtencion)}</td>
                                <td>{aDecimales(t.horaSalida)}</td>
                            </tr>
                        )
                    })}
                </tbody>
        </table>
    )
}