import { Estados } from "./Estados.js"
import { Evento } from "./Evento.js"
import { EventosTypes } from "./EventosTypes.js"

export class ServidorB{
    constructor(media, desv, capacidad){
        this.media = media
        this.desv = desv
        this.capacidad = capacidad
        this.trabajoActual = null
        this.cola = 0
        this.estado = Estados.LIBRE
        this.finAtencion = null
        this.lastIndex = 0
        this.nums=null
        this.rnds=[]
    }

    atenderLlegada(trabajo, reloj){
        if(this.estado == Estados.LIBRE){
            const tAtencion = this.getTiempoAtencion()
            this.finAtencion = reloj+tAtencion
            this.estado = Estados.OCUPADO
            trabajo.estado = Estados.EN_ATENCION_B
            this.trabajoActual = trabajo
            return new Evento(tAtencion, reloj+tAtencion, this.rnds, EventosTypes.FIN_ATENCION_B, "Fin atencion B")
        }else{
            trabajo.estado = Estados.ESPERANDO_B
            this.cola++
            return null
        }
    }
    
    finalizarAtencion(trabajo, reloj){
        //destruimos trabajo
        this.trabajoActual.estado = Estados.DESTRUIDO
        this.trabajoActual.horaSalida = reloj
        const aux = this.trabajoActual
        if(trabajo != null){
            this.cola--
            this.estado = Estados.LIBRE
            return {evento:this.atenderLlegada(trabajo, reloj),trabajo:aux}
        }else{
            this.estado = Estados.LIBRE
            this.trabajoActual = null
            return {evento:null,trabajo:aux}
        }
    }

    getTiempoAtencion(){
        if(this.lastIndex>1 || this.nums == null){
            let u1=0;
            let u2=0
            while(u1<=0 || u2<=0){
                this.lastIndex = 0
                this.rnds[0] = Math.random();
                this.rnds[1] = Math.random();
                u1 = Math.sqrt(-2*Math.log(this.rnds[0]))*Math.cos(2*Math.PI*this.rnds[1])*this.desv + this.media
                u2 = Math.sqrt(-2*Math.log(this.rnds[0]))*Math.sin(2*Math.PI*this.rnds[1])*this.desv + this.media
            }
            this.nums = [u1,u2]
            const tiempo = this.nums[this.lastIndex]
            this.lastIndex++
            return tiempo
        }else{
            const tiempo = this.nums[this.lastIndex]
            this.lastIndex++
            return tiempo
        }
    }

}