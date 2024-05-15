import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import UsuarioService from '../app/service/usuarioService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState(null);
    const navigate = useNavigate();

    const service = new UsuarioService();

    const entrar = () => {
        service.autenticar ({
                email: email,
                senha: senha 
            }).then( response => {
                localStorage.setItem('_usuario_logado', JSON.stringify(response.data) )
                navigate('/home')
            } ).catch( erro => {
                setMensagemErro(erro.response?.data);
            })
    }

    const prepareCadastrar = () => {
        navigate('/cadastro-usuarios');
    }

    return (
        <div className="row">
            <div className='col-md-6' style={{ position: 'relative', left: '300px' }}>
                <div className='bs-docs-section'>
                    <Card title="Login">
                        <div className='row'>
                            <span>{mensagemErro}</span>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='bs-component'>
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input
                                                type='email'
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className='form-control'
                                                id='exampleInputEmail1'
                                                aria-describedby='emailHelp'
                                                placeholder='Digite o Email'
                                            />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input
                                                type='password'
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                                className='form-control'
                                                id='exampleInputPassword1'
                                                placeholder='Password'
                                            />
                                        </FormGroup>
                                        <button onClick={entrar} className='btn btn-success'>Entrar</button>
                                        <button onClick={prepareCadastrar} className='btn btn-danger'>Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;
