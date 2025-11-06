import AddProductKart from "../Components/AddProductKart";
import { Link } from "react-router-dom";
import './App.css'

function Catalogo() {
    return(

        <>
<div className="background">
<header className="heaeder">

</header>




<main className="main-content">
    <div className="main-box">
            <h1>Catálogo completo</h1>

            <AddProductKart mostrarAleatorios={false} />

        <div className="volvler-container">
            <Link to="/" className="btn-volver"> 
                Volver al inicio
            </Link>
        </div>
    </div>
</main>

<footer className="footer">
</footer>
</div>
</>


);
}

export default Catalogo;