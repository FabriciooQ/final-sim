import { GestorSimulacion } from "../simulacion/GestorSimulacion";

self.onmessage = function simular(datos){
    const gestor = new GestorSimulacion(
        Number(datos.data.tiempo),
        Number(datos.data.filas),
        Number(datos.data.expMedia),
        Number(datos.data.expLambda),
        Number(datos.data.uniformeLi),
        Number(datos.data.uniformeLs),
        Number(datos.data.normalMedia),
        Number(datos.data.normalDesv),
        Number(datos.data.cola)
    )

    gestor.iniciarSimulacion()
    //devolvemos un objeto que contiene los eventos y en otro los trabajos
    self.postMessage({eventos:gestor.res,trabajos:gestor.obtenerTrabajos()})
}