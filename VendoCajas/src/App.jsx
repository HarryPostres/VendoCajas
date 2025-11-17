import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import IndexHtml from "./components/IndexHtml.jsx";
import AddProductKart from "./components/ItemListContainer.jsx";
import Catalogo from "./components/Catalogo.jsx";
import Contacto from "./components/Contacto.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import { NotificationProvider } from './components/NotificationContext.jsx';
import Carrito from "./components/Cart.jsx";
import DetallesProductos from "./components/ItemDetail.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderDetail from "./components/OrderDetail.jsx";

export default function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>

              <Route
                path="/"
                element={
                  <Layout><IndexHtml /></Layout>
                } />

              <Route
                path="/add-product"
                element={
                  <Layout><AddProductKart /></Layout>
                } />

              <Route
                path="/catalogo"
                element={
                  <Layout><Catalogo /></Layout>
                } />

              <Route
                path="/contacto"
                element={
                  <Layout><Contacto /></Layout>
                } />

              <Route
                path="/cart"
                element={
                  <Layout> <Carrito /> </Layout>
                } />

              <Route
                path="/checkout"
                element={
                  <Layout> <Checkout /> </Layout>
                } />

              <Route
                path="/orden/:id"
                element={
                  <Layout><OrderDetail /></Layout>
                } />

              <Route
                path="/producto/:id"
                element={
                  <Layout><DetallesProductos /></Layout>
                } />

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export { App };