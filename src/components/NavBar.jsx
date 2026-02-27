import "./NavBar.css"

export function NavBar({setVisualization}){
    function handleOnClick(){
        setVisualization(1)
    }

    return(
        <nav className="navBar-nav"> 
        <span>
            <img src="./utnLogo.png" alt="Logo UTN"></img>
            <h3>Simulacion</h3>
        </span>

            <ul>
                <li onClick={handleOnClick}>Inicio</li>
            </ul>

        </nav>
    )


}