import { Estadisticas } from "./Estadisticas"
import { ServidorA } from "./ServidorA"
import { ServidorB } from "./ServidorB"
import { EventosTypes } from "./EventosTypes"
import { Evento } from "./Evento"

export class GestorSimulacion{
    constructor(limitReloj, limitFilas, llegMedia, llegLambda, Ali, Als, Bmedia, Bdesv, capac){
        this.reloj=0
        this.filas = 0
        this.limitReloj=limitReloj,
        this.limitFilas = limitFilas,
        this.mediaLlegada = llegMedia,
        this.lambdaLlegada = llegLambda,
        this.servidorA = new ServidorA(Ali, Als)
        this.servidorB = new ServidorB(Bmedia, Bdesv, capac)
        this.estadisticas = new Estadisticas()
        this.trabajos = []
        this.eventos = []
        this.contLlegadas = 0
        this.res = []
    }

    iniciarSimulacion(){
        //crea llegada de inicio
        const [rnd, llegada] = this.getProxLlegada()
        //creamos el evento
        const eventoInicio = new Evento(llegada, this.reloj+llegada, rnd, EventosTypes.INICIO, "inicio")
        this.eventos.push(eventoInicio)
        //pusheamos renglon
        this.pushRenglon(eventoInicio)

        while(this.reloj<= this.limitReloj || this.filas<= this.limitFilas){
            let eventoActual = this.buscarEvento()
            
        }
    }

    buscarEvento(){
        if(this.eventos.length == 0 || this.eventos == null){
            return
        }
        let proxEvento = this.eventos[0]
        let index = 0
        this.eventos.forEach((e)=>{
            if(e.tiempo < proxEvento){
                index = this.eventos.indexOf(e)
                proxEvento = {...e}
            }
        })
        //borramos el evento de la lista de proximos eventos
        this.eventos.splice(index,index)
        //retornamos proximo evento
        return proxEvento
    }

    pushRenglon(evento){
        switch(evento.type){
            case (EventosTypes.INICIO):{
                const renglon = {
                reloj: this.reloj,
                evento: evento.nombre,
                rndLlegada: evento.rnd,
                llegada: evento.tiempo,
                proxLlegada: evento.tie,
                colaA:this.servidorA.cola,
                estadoA:this.servidorA.estado,
                atencionA: null,
                finAtencionA: null,
                colaB:this.servidorB.cola,
                estadoB: this.servidorB.estado,
                atencionB: null,
                finAtencionB:null,
                tiempoOciosoA:0,
                horasTrabajo:0,
                trabajosFinalizados:0,
                trabajosActuales:0,        
                }
                this.res.push(renglon)
            }
        }
        
    }

    getProxLlegada(){
        const rnd = Math.random()
        const llegada =  -this.mediaLlegada*Math.log(1-rnd)
        return {rnd, llegada}
    }
}