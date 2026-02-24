import "./AjusteParametros.css"

export default function AjusteParametros(){
    return(
        <div className="parametros-container">
            <div className="parametros-titulo">
                <h1>Ajuste de parametros</h1>
            </div>
            <form className="parametros-form">
                <div className="parametros-llegada">
                    <h2>Llegada (exp)</h2>
                    <div className="parametros-section">
                        <label htmlFor="">μ</label>
                        <input type="number" />
                    </div>
                    <div className="parametros-section">
                        <label htmlFor="">λ</label>
                        <input type="number" />
                    </div>
                </div>
                <div className="parametros-servidores">
                    <h2>Servidores</h2>
                    <h3>Servidor A (uniforme)</h3>
                    <span className="parametros-renglon">
                        <div className="parametros-section">
                            <label htmlFor="">li</label>
                            <input type="number" />
                        </div>
                        <div className="parametros-section">
                            <label htmlFor="">ls</label>
                            <input type="number" />
                        </div>
                    </span>
                    <h3>Servidor B (normal)</h3>
                    <span className="parametros-renglon">
                        <div className="parametros-section">
                            <label htmlFor="">μ</label>
                            <input type="number" />
                        </div>
                        <div className="parametros-section">
                            <label htmlFor="">σ</label>
                            <input type="number" />
                        </div>
                    </span>
                    <h3>Cola entre servidores</h3>
                    <div className="parametros-section">
                            <label htmlFor="">Capacidad</label>
                            <input type="number" />
                    </div>
                    <span className="parametros-checkbox">
                        <input type="checkbox" />
                        <label htmlFor="">infinita</label>
                    </span>
                </div>
                <button className="parametros-btn">Simular</button>
            </form>
        </div>
    )
}