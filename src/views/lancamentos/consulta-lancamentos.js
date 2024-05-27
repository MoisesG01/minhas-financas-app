import React from "react";
import { useNavigate } from 'react-router-dom';

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";
import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {
    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: [
            {descricao: 'Fatura', valor: 1000, tipo: 'DESPESA', mes: 1, situacao: 'EFETIVADO'}
        ]
    }

    constructor() {
        super();
        this.service = new LancamentoService();
        this.buscar = this.buscar.bind(this);
    }

    buscar() {
        if(!this.state.ano){
            messages.mensagemErro('O Preenchimento do Campo Ano é Obrigratório!')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                const lista = resposta.data;
                
                if(lista.length < 1){
                    messages.mensagemAlert("Nenhum Resultado Encontrado!")
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.navigate(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});

                messages.mensagemSucesso('Lançamento Deletado com Sucesso!');
            }).catch(error => {
                messages.mensagemErro('Ocorreu um Erro ao Tentar Excluir o Lançamento!');
            })
    }

    preparaFormularioCadastro = () => {
        this.props.navigate('/cadastro-lancamentos');
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento});
                }
                messages.mensagemSucesso("Status Atualizado com Sucesso!")
            })
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogfooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        )

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control"
                                    lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                <SelectMenu id="inputTipo"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    className="form-control"
                                    lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction={this.abrirConfirmacao}
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogfooter}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p>Tem certeza que deseja realizar a exclusão deste Lançamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

const ConsultaLancamentosWrapper = (props) => {
    const navigate = useNavigate();
    return <ConsultaLancamentos navigate={navigate} {...props} />;
};

export default ConsultaLancamentosWrapper;
