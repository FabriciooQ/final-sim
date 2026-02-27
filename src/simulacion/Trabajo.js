export class Trabajo{
    constructor(id, horaLlegada, estado, horaAtencion){
        this.id = id
        this.horaLlegada = horaLlegada
        this.estado = estado
        this.horaAtencion = horaAtencion
        this.horaSalida = null
    }
}