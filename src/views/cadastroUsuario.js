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

    const validar = () => {
        const msgs = []

        if (!nome) {
            msgs.push('O Campo Nome é OBRIGATÓRIO!');
        }

        if (!email) {
            msgs.push('O Campo E-mail é OBRIGATÓRIO!');
        } else if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i)) {
            msgs.push('Infome um E-mail Válido!');
        }

        if (!senha || !senhaRepeticao) {
            msgs.push('O Campo Senha é OBRIGATÓRIO!');
        } else if (senha !== senhaRepeticao) {
            msgs.push('As Senhas Devem Ser Iguais!');
        }

        return msgs;
    }

    const cadastrar = () => {
        const msgs = validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        }
        service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário Cadastrado com Sucesso! Faça o Login Para Acessar o Sistema.');
                navigate('/login');
            }).catch(erro => {
                mensagemErro(erro.response?.data);
            })
    }

    const cancelar = () => {
        navigate('/login');
    }

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
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="E-mail: *" htmlFor="inputEmail">
                            <input type="email"
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password"
                                id="inputSenha"
                                className="form-control"
                                name="senha"
                                onChange={e => setSenha(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Repitir Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password"
                                id="inputRepitaSenha"
                                className="form-control"
                                name="senhaRepeticao"
                                onChange={e => setSenhaRepeticao(e.target.value)} />
                        </FormGroup>
                        <button type="button" onClick={cadastrar} className='btn btn-success'>Salvar</button>
                        <button type="button" onClick={cancelar} className='btn btn-danger'>Cancelar</button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CadastroUsuario;
