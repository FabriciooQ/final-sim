import "./NavBar.css"

export function NavBar(){
    return(
        <nav className="navBar-nav"> 
        <span>
            <img src="./utnLogo.png" alt="Logo UTN"></img>
            <h3>Simulacion</h3>
        </span>

            <ul>
                <li>Inicio</li>
                <li>Enunciado</li>
            </ul>

        </nav>
    )


}