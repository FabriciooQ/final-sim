import "./Enunciado.css"

export default function Enunciado(){
    return(
        <section className="enunciado-container">
            <div className="enunciado-titulo">
                <h1>Enunciado</h1>
            </div>
            <div className="enunciado-texto">
                <p className="enunciado-p">
                    <strong>Los trabajos llegan a un taller</strong>, que tiene 2 centros de trabajo (A y B), en serie, <strong>a una tasa exponencial de 5 por 
                    hora.</strong> Cada trabajo requiere de procesado en ambos centros de trabajo, primero en A y luego en B. Los trabajos 
                    que llegan y no pueden ser procesados inmediatamente, esperan en una cola que les toque el turno, entre el 
                    centro de trabajo A y B, existe sólo lugar para 3 trabajos esperando, cuando este espacio se llena, el centro de 
                    trabajo A no puede liberarse de trabajos (deteniendo el proceso a la espera de lugar). Los tiempos de proceso 
                    están dados por las siguientes distribuciones de probabilidad: <strong>Centro A, Uniforme entre 1 y 10 minutos. Centro 
                    B, Normal de media 8 minutos y desviación estándar = 5.</strong>
                </p>
                <p className="enunciado-p"> </p>
                <p className="enunciado-p">Determine:</p>
                <p className="enunciado-p">     <strong>a)</strong> El número máximo de trabajos en el taller en un momento dado.</p>
                <p className="enunciado-p">     <strong>b)</strong> El tiempo de parada del centro A por no tener lugar donde colocar su trabajo.</p>
                <p className="enunciado-p">     <strong>c)</strong> El tiempo promedio de terminar un trabajo.</p>                
            </div>
        </section>
    )
}