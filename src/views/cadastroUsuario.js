import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Card from "../components/card";
import FormGroup from "../components/form-group";
import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

const CadastroUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepeticao] = useState('');

    const navigate = useNavigate();
    const service = new UsuarioService();

    const cadastrar = () => {
        const usuario = { nome, email, senha, senhaRepeticao };

        try {
            service.validar(usuario);
        } catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário Cadastrado com Sucesso! Faça o Login Para Acessar o Sistema.');
                navigate('/login');
            })
            .catch(erro => {
                mensagemErro(erro.response?.data);
            });
    };

    const cancelar = () => {
        navigate('/login');
    };

    return (
        <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                id="inputNome"
                                className="form-control"
                                name="nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="E-mail: *" htmlFor="inputEmail">
                            <input type="email"
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password"
                                id="inputSenha"
                                className="form-control"
                                name="senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Repetir Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password"
                                id="inputRepitaSenha"
                                className="form-control"
                                name="senhaRepeticao"
                                value={senhaRepeticao}
                                onChange={e => setSenhaRepeticao(e.target.value)} />
                        </FormGroup>
                        <button type="button" 
                                onClick={cadastrar} 
                                className='btn btn-success'>
                                <i className="pi pi-save"></i> Salvar
                        </button>
                        <button type="button" 
                                onClick={cancelar} 
                                className='btn btn-danger'>
                                <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CadastroUsuario;
