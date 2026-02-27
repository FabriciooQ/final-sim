import { Estados } from "./Estados.js"
import { Evento } from "./Evento.js"
import { EventosTypes } from "./EventosTypes.js"

export class ServidorA{
    constructor(li,ls){
        this.li = li
        this.ls = ls
        this.estado = Estados.LIBRE
        this.horaBloqueo = null
        this.finAtencion = null
        this.cola = 0
        this.trabajoActual = null
    }

    
    atenderLlegada(trabajo, reloj){
        if(this.estado == Estados.OCUPADO || this.estado == Estados.BLOQUEADO){
            trabajo.estado = Estados.ESPERANDO_A
            this.cola++
            return null
        }else {
            const tiempoAt= this.getTiempoAtencion();
            this.finAtencion = tiempoAt.tiempo + reloj
            this.estado = Estados.OCUPADO
            
            trabajo.estado = Estados.EN_ATENCION_A
            trabajo.horaAtencion = reloj
            this.trabajoActual = trabajo
            
            return new Evento(tiempoAt.tiempo, this.finAtencion, tiempoAt.rnd, EventosTypes.FIN_ATENCION_A, `fin atencion A`)            
        }
    }

    finalizarAtencion(reloj, proxTrabajo, flagColaB){
        if(flagColaB){
            this.estado = Estados.BLOQUEADO
            this.horaBloqueo = reloj
            console.log("BLOQUEADO HORA: ", this.horaBloqueo)
            return {evento:null, trabajo:null}
        }
        else if(proxTrabajo == null){
            const aux = this.trabajoActual
            this.estado = Estados.LIBRE
            this.horaBloqueo = null
            this.trabajoActual = null
            return {evento:null, trabajo:aux}
        }else if(proxTrabajo){
            const aux = this.trabajoActual
            this.cola--
            this.estado = Estados.LIBRE
            this.horaBloqueo = null;
            const evento = this.atenderLlegada(proxTrabajo, reloj)
            return {evento:evento, trabajo:aux}
        }        

    }

    getTiempoAtencion(){
        const rnd = Math.random()
        const tiempo = this.li + rnd*(this.ls-this.li);
        return {rnd, tiempo}
    }
}