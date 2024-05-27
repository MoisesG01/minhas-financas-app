import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'; // Adicionei Outlet aqui

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import AuthService from "../app/service/authService";

function RotaAutenticada({ children }) {
    let location = useLocation();

    if (!AuthService.isUsuarioAutenticado()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
                
                <Route path="/" element={<RotaAutenticada><Outlet /></RotaAutenticada>}>
                    <Route path="home" element={<Home />} />
                    <Route path="consulta-lancamentos" element={<ConsultaLancamentos />} />
                    <Route path="cadastro-lancamentos" element={<CadastroLancamentos />} />
                    <Route path="cadastro-lancamentos/:id" element={<CadastroLancamentos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
