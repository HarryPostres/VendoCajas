import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function app() {
    return(
        <div style={{TextAlign: "center", marginTop: "50px"}}>
            <h1>titulo 1</h1>
            <p>parrafo 1</p>
        </div>
    );
}

export default app;
