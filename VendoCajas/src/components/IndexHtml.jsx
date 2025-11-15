
import { Link } from "react-router-dom";
import AddProductKart from "./ItemListContainer.jsx";  
import '../css/indexHtml.css';

const IndexHtml = () => {
  return (
<>
<div id='app-layout'>


<main className='main-content'>

  <h1>VENDEMOS CAJAAAS</h1>

<div className="img-index-container">
<img className ="img-index" src="https://thumbs.dreamstime.com/b/hombre-con-la-caja-en-la-cabeza-48097117.jpg" alt="" />

<p className="index-img-text">¿¡Querés ser millonario!? ¡Invertí en cajas! Durante años todas las personalidades importantes del mundo empresarial han contado con 
  nuestro servicio para organizar, empaquetar y distribuir sus productos. ¡Y claro que les fue bien! ¡Tenian cajas! ¿¡Que podia salir mal!? ¡Asi que ya sabes! Inverti en cajas,
   ¡Te aseguramos ser el proximo millonario!</p>
</div>

<h3>Te presentamos nuestros productos</h3>
<p>Tenemos cajas del dueño anterior y diseñadas por nosotos,
  cajas únicas para clientes únicos.
</p>


<AddProductKart mostrarAleatorios={true}/>

<div className="ver-catalogo-container">
<Link to ="/catalogo">
<button className="btn-ver-catalogo">Ver catálogo completo</button>
</Link>
</div>

</main>


</div>
</>
  );
}

export default IndexHtml;