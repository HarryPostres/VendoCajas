
import { Link } from "react-router-dom";
import AddProductKart from "./ItemListContainer.jsx";  
import '../css/indexHtml.css';

const IndexHtml = () => {
  return (
<>
<div id='app-layout'>


<main className='main-content'>

<h3>te presentamos nuestros productos</h3>
<p>tenemos cajas del dueño anterior y diseñadas por nosotos,
  cajas unicas para clientes unicos.
</p>


<AddProductKart mostrarAleatorios={true}/>

<Link to ="/catalogo">
<button>Ver catálogo completo</button>
</Link>


</main>


</div>
</>
  );
}

export default IndexHtml;