import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App.jsx';
import AddProductKart from './Components/AddProductKart.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path = "/" element={<App />} />

        <Route path = "/catalogo" element = {<AddProductKart/>} />  

    </Routes>
    </BrowserRouter>
  </StrictMode>
);

