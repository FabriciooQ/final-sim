import { Estados } from "./Estados"

export class ServidorA{
    constructor(li,ls){
        this.li = li
        this.ls = ls
        this.estado = Estados.LIBRE
    }

    getTiempoAtencion(){
        return this.li + Math.random()*(this.ls-this.li)
    }
}