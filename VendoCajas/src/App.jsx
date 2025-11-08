import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import IndexHtml from "./components/Main/IndexHtml";
import AddProductKart from "./components/AddProductKart/AddProductKart";
import Catalogo from "./components/catalogo/Catalogo.jsx";
import Contacto from "./components/Contacto/Contacto.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import DetallesProductos from "./components/DetallesProductos/DetallesProductos.jsx";


export default function App() {
  return(
    <BrowserRouter>
        <Routes>
          
          <Route
           path="/"
            element={
            <Layout><IndexHtml/></Layout>
            }
            />

          <Route
           path="/add-product"
            element={
           <Layout><AddProductKart/></Layout>
           }/>
          
          <Route 
          path="/catalogo"
           element={
           <Layout><Catalogo/></Layout>
           }/>
          
          <Route 
          path ="/contacto"
           element ={
           <Layout><Contacto/></Layout>
           }/>
          
          <Route
           path ="/carrito"
            element ={
           <Layout> <Carrito/> </Layout>
            }/>
          
          <Route
           path="/producto/:id"
            element={
            <Layout><DetallesProductos/></Layout>
            }/>

        </Routes>
    </BrowserRouter>
  )
}

export {App};