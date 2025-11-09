import {Link} from "react-router-dom";  
import '../css/Header.css';


export default function Header(){
  return (
    <header className="main-header">
        <h2>VendoCajas</h2>
        <nav className="nav-links">
          <Link to ="/" className="nav-item">Inicio</Link>
          <Link to ="/catalogo" className="nav-item">Catálogo</Link>
          <Link to ="/cart" className="nav-item">Carrito</Link>
          <Link to ="/contacto" className="nav-item">Contacto</Link>          
        </nav>
    </header>
  );
}

