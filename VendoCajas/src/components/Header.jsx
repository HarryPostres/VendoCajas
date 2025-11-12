import {Link} from "react-router-dom";  
import '../css/Header.css';
import CartWidget from "./CartWidget";


export default function Header(){
  return (
    <header className="main-header">
        <h2>VendoCajas</h2>
        <nav className="nav-links">
          <Link to ="/" className="nav-item">Inicio</Link>
          <Link to ="/contacto" className="nav-item">Contacto</Link>
          <Link to ="/catalogo" className="nav-item">Catálogo</Link>
          <CartWidget/> {}          
        </nav>
    </header>
  );
}

