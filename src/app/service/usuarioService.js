import ApiService from "../apiservice";

import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('', usuario);
    }

    validar(usuario) {
        const erros = []

        if (!usuario.nome) {
            erros.push('O Campo Nome é OBRIGATÓRIO!');
        }

        if (!usuario.email) {
            erros.push('O Campo E-mail é OBRIGATÓRIO!');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i)) {
            erros.push('Infome um E-mail Válido!');
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('O Campo Senha é OBRIGATÓRIO!');
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As Senhas Devem Ser Iguais!');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;