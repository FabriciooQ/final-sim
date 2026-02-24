import { Estadisticas } from "./Estadisticas"

class Simulacion{
    constructor(llegMedia, llegLambda, Ali, Als, Bmedia, Bdesv, capac){
        this.mediaLlegada = llegMedia,
        this.lambdaLlegada = llegLambda,
        this.serverAli = Ali
        this.serverAls = Als
        this.serverBmedia = Bmedia
        this.serverBdesv = Bdesv
        this.serverCola = capac
        this.estadisticas = new Estadisticas()
        this.res = []
    }
}