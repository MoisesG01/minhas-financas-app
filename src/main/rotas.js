import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
                <Route path="/consulta-lancamentos" element={<ConsultaLancamentos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
