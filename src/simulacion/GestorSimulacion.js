import { Estadisticas } from "./Estadisticas.js"
import { ServidorA } from "./ServidorA.js"
import { ServidorB } from "./ServidorB.js"
import { EventosTypes } from "./EventosTypes.js"
import { Evento } from "./Evento.js"
import { Trabajo } from "./Trabajo.js"
import { Estados } from "./Estados.js"

export class GestorSimulacion{
    constructor(limitReloj, limitFilas, llegMedia, llegLambda, Ali, Als, Bmedia, Bdesv, capac){
        this.relojAnterior=0
        this.reloj=0
        this.filas = 0
        this.nombre = null
        this.contLlegadas = 0
        this.limitReloj = limitReloj,
        this.limitFilas = limitFilas,
        this.mediaLlegada = llegMedia,
        this.lambdaLlegada = llegLambda,
        this.servidorA = new ServidorA(Ali, Als)
        this.servidorB = new ServidorB(Bmedia, Bdesv, capac)
        this.res = []
        this.trabajos = []
        this.eventos = {
            eventoLlegada:null,
            eventoA:null,
            eventoB:null
        }
        this.estadisticas = {
            trabajosEnTaller:0,
            tiempoOciosoA:0,
            trabajosTerminados:0,
            tiempoTrabajo:0,
            promedio: null
        }
    }

    iniciarSimulacion(){
        //creamos el evento inicio
        this.eventos.eventoLlegada = new Evento(null, null, null, EventosTypes.INICIO, "Inicio")

        //creamos filas hasta que se cumpla algun limite (reloj o filas)
        while(this.reloj<=this.limitReloj && this.filas<=this.limitFilas){
            this.relojAnterior = this.reloj
            let eventoActual = this.buscarEvento()
            this.update(eventoActual)
            this.calcularEstadisticas()
            this.pushRenglon()
            //console.log(this.res[this.res.lenght-1])
        }

        const eventoFin = new Evento(null, this.reloj, null, EventosTypes.FIN_SIMULACION, "Fin simulacion")
        this.update(eventoFin)
        this.calcularEstadisticas()
        this.pushRenglon()

         

            
        
    }

    update(evento){
        switch(evento.tipo){
            case(EventosTypes.INICIO):{ 
                this.reloj = 0
                this.nombre = evento.nombre
                const proxLlegada = this.getProxLlegada()
                this.eventos.eventoLlegada = new Evento(proxLlegada.llegada, proxLlegada.llegada + this.reloj, proxLlegada.rnd, EventosTypes.LLEGADA, "Llegada 1")
                return
            }

            case(EventosTypes.LLEGADA):{
                //actualizamos 
                this.reloj = evento.hora
                this.filas++;
                this.nombre = evento.nombre
                this.contLlegadas ++

                //estadisticas
                this.estadisticas.trabajosEnTaller++

                //creamos el Trabajo y lo atendemos en el servidor A
                const trabajo = new Trabajo(this.contLlegadas,this.reloj, null, null)
                this.trabajos.push(trabajo)
                const eventoA = this.servidorA.atenderLlegada(trabajo, this.reloj)
                if(eventoA != null){
                    this.eventos.eventoA = eventoA
                }

                //creamos la proxima llegada y añadimos a la lista de eventos
                const proxLlegada = this.getProxLlegada()
                this.eventos.eventoLlegada = new Evento(proxLlegada.llegada, proxLlegada.llegada+this.reloj, proxLlegada.rnd, EventosTypes.LLEGADA, `Llegada ${this.contLlegadas+1}`)
                return
            }

            case(EventosTypes.FIN_ATENCION_A):{
                //actualizamos reloj y estadisticas de trabajos realizados
                this.reloj = evento.hora
                this.filas++;
                this.nombre = evento.nombre

                //vemos capacidad de la cola de B
                const colaB = this.servidorB.cola
                const capacidad = this.servidorB.capacidad
                let flag = false
                if(colaB >= capacidad){
                    flag = true
                }              
                //buscamos el prox trabajo en cola para A
                const proxTrabajoA = this.buscarProxTrabajo(Estados.ESPERANDO_A)

                //finalizamos trabajo en A
                const resultadoA = this.servidorA.finalizarAtencion(this.reloj, proxTrabajoA, flag)
                this.eventos.eventoA = resultadoA.evento

                //si A esta bloqueado no atendemos el trabajo en B
                if(this.servidorA.estado == Estados.BLOQUEADO){
                    return
                }
                const eventoB = this.servidorB.atenderLlegada(resultadoA.trabajo,this.reloj)
                if(eventoB != null){
                    this.eventos.eventoB = eventoB
                }
                
                return
            }

            case(EventosTypes.FIN_ATENCION_B):{
                //actualizamos 
                this.reloj = evento.hora
                this.filas++;
                this.nombre = evento.nombre

                //buscamos siguiente trabajo para B
                const proxTrabajo = this.buscarProxTrabajo(Estados.ESPERANDO_B)
                const resultadoB = this.servidorB.finalizarAtencion(proxTrabajo, this.reloj)
                this.eventos.eventoB = resultadoB.evento

                //estadisticas
                this.estadisticas.trabajosEnTaller--
                this.estadisticas.trabajosTerminados++;
                this.estadisticas.tiempoTrabajo += resultadoB.trabajo.horaSalida-resultadoB.trabajo.horaAtencion
            
                //averiguamos si A estaba bloqueado
                if(this.servidorA.estado == Estados.BLOQUEADO){
                    const proxTrabajoA = this.buscarProxTrabajo(Estados.ESPERANDO_A)
                    this.calcularEstadisticas() //calcula el tiempo bloqueado de A, se lo llama aca porque despues ya se debloquea y este tiempo no se suma sino
                    const resultadoA = this.servidorA.finalizarAtencion(this.reloj,proxTrabajoA)
                    this.eventos.eventoA = resultadoA.evento
                    this.servidorB.atenderLlegada(resultadoA.trabajo, this.reloj)
                }
                return
            }
            case(EventosTypes.FIN_SIMULACION):{
                this.reloj = evento.hora
                this.nombre = evento.nombre
                this.filas++;

                this.estadisticas.promedio = this.estadisticas.tiempoTrabajo / this.estadisticas.trabajosTerminados
                return

            }


            
        }

    }

    buscarProxTrabajo(estado){
        const cola = this.trabajos.filter(t=> t.estado===estado)
        if(cola.length > 0){
            return this.prox(cola)
        }
        return null
    }

    prox(cola){
        let trabajo = cola[0]
        cola.forEach(element => {
            if(element.horaLlegada <trabajo.horaLlegada){
                trabajo = element
            }
        });
        return trabajo
    }

    buscarTrabajo(estado){
        const trabajo = this.trabajos.filter(t=>t.estado==estado)
        return trabajo

    }

    pushRenglon(){
        //agregamos reloj y pusheamos renglon
        const renglon = {
            reloj:this.reloj,
            nombre:this.nombre,
            rndLlegada:this.eventos.eventoLlegada != null && this.eventos.eventoLlegada.rnd,
            llegada:this.eventos.eventoLlegada != null && this.eventos.eventoLlegada.tiempo,
            proxLlegada:this.eventos.eventoLlegada != null && this.eventos.eventoLlegada.hora,
            colaA:this.servidorA.cola,
            estadoA:this.mapearEstado(this.servidorA.estado),
            rndA:this.eventos.eventoA != null && this.eventos.eventoA.rnd,
            atencionA:this.eventos.eventoA != null && this.eventos.eventoA.tiempo,
            finAtencionA:this.eventos.eventoA != null && this.eventos.eventoA.hora,
            colaB:this.servidorB.cola,
            estadoB:this.mapearEstado(this.servidorB.estado),
            rndB: this.eventos.eventoB != null && this.eventos.eventoB.rnd,
            atencionB:this.eventos.eventoB != null && this.eventos.eventoB.tiempo,
            finAtencionB:this.eventos.eventoB != null && this.eventos.eventoB.hora,
            estadisticas:{...this.estadisticas},
            //trabajos:this.trabajos
        }
        this.res.push(renglon)
    }

    buscarEvento(){
        let min = this.eventos.eventoLlegada
        if(this.eventos.eventoA!=null && this.eventos.eventoA.hora < min.hora){
            min=this.eventos.eventoA
            if(this.eventos.eventoB!=null && this.eventos.eventoB.hora<min.hora){
                min = this.eventos.eventoB
            }
        }if(this.eventos.eventoB!=null && this.eventos.eventoB.hora < min.hora){
            min = this.eventos.eventoB
        }
        return min
    }

    getProxLlegada(){
        const rnd = Math.random()
        const llegada =  -this.mediaLlegada*Math.log(1-rnd)
        return {rnd, llegada}
    }

    //obtiene los trabajos pero mapea los estados a texto
    obtenerTrabajos(){
        const trabajos = this.trabajos.map(t=>{
            return({
                ...t,
                estado: this.mapearEstado(t.estado)
            })
        })
        return trabajos
    }

    mapearEstado(estado){
        if(estado == Estados.LIBRE){
            return("Libre")
        }else if(estado==Estados.OCUPADO){
            return ("Ocupado")
        }else if(estado == Estados.BLOQUEADO){
            return ("Bloqueado")
        }else if(estado==Estados.ESPERANDO_A){
            return("Esperando (A)")
        }else if(estado == Estados.ESPERANDO_B){
            return("Esperando (B)")
        }else if(estado == Estados.EN_ATENCION_A){
            return("En atencion (A)")
        }else{
            return("Realizado")
        }
    }

    calcularEstadisticas(){
        //tiempo ocioso A
        if(this.servidorA.estado == Estados.BLOQUEADO && this.reloj != this.servidorA.horaBloqueo){
            this.estadisticas.tiempoOciosoA += this.reloj-this.relojAnterior
        }     
        

    }
}