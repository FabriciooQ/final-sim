import { Estados } from "./Estados"

export class ServidorA{
    constructor(li,ls){
        this.li = li
        this.ls = ls
        this.estado = Estados.LIBRE
        this.cola = 0
    }

    getTiempoAtencion(){
        return this.li + Math.random()*(this.ls-this.li)
    }
}