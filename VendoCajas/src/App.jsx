/* identificador firebase: vendocajas-1fffe */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Link} from "react-router-dom"
import AddProductkart from './Components/AddProductKart.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className='background'>
<header className='header'>
</header>


<main className='main-content'>
  <div className='main-box'>
    <h1>¡Vendemos cajas!</h1>
    <p>o tal vez no tenemos cajas...</p>

    <div>
    <AddProductkart mostrarAleatorios={true} />
    </div>

    <div className='ver-todas-container'>
      <Link to="/Catalogo" className='btn-ver-todas'>
      Ver todas
      </Link> 
    </div>

  </div>
</main>


<footer className='footer'>
</footer>
</div>
    </>
  )
}

export default App
