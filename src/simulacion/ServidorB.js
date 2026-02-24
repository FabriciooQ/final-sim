import { Estados } from "./Estados"

export class ServidorB{
    constructor(media, desv, capacidad){
        this.media = media
        this.desv = desv
        this.capacidad = capacidad
        this.cola = 0
        this.estado = Estados.LIBRE
        this.lastIndex = 0
        this.nums=null
    }

    getTiempoAtencion(){
        const rnd1 = Math.random();
        const rnd2 = Math.random();

        if(this.lastIndex>1 || this.nums == null){
            this.lastIndex = 0
            const u1 = Math.sqrt(-2*Math.log(rnd1))*Math.cos(2*Math.PI*rnd2)*this.desv + this.media
            const u2 = Math.sqrt(-2*Math.log(rnd1))*Math.sin(2*Math.PI*rnd2)*this.desv + this.media
            this.nums = [u1,u2]
            const index = this.lastIndex
            this.lastIndex++
            return this.nums[index]
        }else{
            const index = this.lastIndex
            this.lastIndex++
            return this.nums[index]
        }

        
    }
}