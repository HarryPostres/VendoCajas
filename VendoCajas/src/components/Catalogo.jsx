import AddProductKart from "./ItemListContainer.jsx";

const Catalogo = () => {
  return (
    <>
      <div id='app-layout'>
        <main className='main-content'>
          <h2>Catálogo completo de productos</h2>
          <p>
            Explora nuestra gama completa de cajas diseñadas para satisfacer todas tus necesidades.
            Cada caja es única y está hecha con la máxima calidad para clientes especiales como tú.
          </p>
          <AddProductKart mostrarAleatorios={false} />
        </main>
      </div>
    </>
  );
}

export default Catalogo;