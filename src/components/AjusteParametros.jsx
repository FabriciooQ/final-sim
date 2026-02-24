import "./AjusteParametros.css"

export default function AjusteParametros(){
    return(
        <div class="container">
            <div class="card">
                <h2>Ajuste de Parámetros</h2>

                <div class="grid">

                    <div class="section">
                        <h3>Llegada</h3>
                        <div class="field">
                        <label>Media</label>
                        <input type="number"/>
                        </div>
                        <div class="field">
                        <label>Lambda</label>
                        <input type="number"/>
                        </div>
                    </div>

                    <div class="section">
                        <h3>Servidores</h3>

                        <p>Servidor A</p>
                        <div class="row">
                        <div class="field">
                            <label>li</label>
                            <input type="number"/>
                        </div>
                        <div class="field">
                            <label>ls</label>
                            <input type="number"/>
                        </div>
                        </div>

                        <p>Servidor B</p>
                        <div class="row">
                        <div class="field">
                            <label>Media</label>
                            <input type="number"/>
                        </div>
                        <div class="field">
                            <label>Desv. est</label>
                            <input type="number"/>
                        </div>
                        </div>

                        <div class="field">
                        <label>Cola máxima</label>
                        <input type="number"/>
                        </div>
                    </div>

                </div>

                <button class="btn">Simular</button>

            </div>
        </div>
    )
}