import { Estados } from "./Estados.js";
import { Evento } from "./Evento.js";
import { GestorSimulacion } from "./GestorSimulacion.js";
import { ServidorA } from "./ServidorA.js";
import { ServidorB } from "./ServidorB.js";
import { Trabajo } from "./Trabajo.js";

//const gestor = new GestorSimulacion(200,30,3,0.083,1,3,8,5,3)
const gestor = new GestorSimulacion(200,30,9,0.083,1,5,10,5,1)
gestor.iniciarSimulacion()


/* 
const t1 = new Trabajo(1, 2, Estados.DESTRUIDO, 2)
const t2 = new Trabajo(2, 3, Estados.EN_ATENCION_B, 3)
const t3 = new Trabajo(3, 4, Estados.ESPERANDO_B, null)
const t4 = new Trabajo(4, 5, Estados.ESPERANDO_B, null)
const t5 = new Trabajo(5, 5, Estados.EN_ATENCION_A, 5)
const t6 = new Trabajo(6, 6, Estados.ESPERANDO_A, null)
const t7 = new Trabajo(7, 7, Estados.ESPERANDO_A, null)

const cola = [ t1,t2,t3,t4,t5,t6,t7]

gestor.trabajos = cola

console.log(gestor.buscarProxTrabajo(Estados.ESPERANDO_B))
 */



/* const sv = new ServidorA(1,3,gestor)
for(let i=0; i<10; i++){
    const obj = sv.getTiempoAtencion()
    console.log(obj)
} */