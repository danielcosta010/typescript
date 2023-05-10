import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logarTempoDeExecucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoesService.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService()
  

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoDeExecucao()
  public adiciona(): void {
    /* Comentário não pode aparecer no arquivo js */

    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value,
    )
    
    if(!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update('Somente negociações em dias úteis podem ser adicionadas');
      return ;
    }
    this.negociacoes.adiciona(negociacao);
    imprimir(negociacao, this.negociacoes)
    this.atualizaView();
    this.limparFormulario();    
  }

  public importaDados(): void {
    this.negociacoesService
      .obterNegociacoesDoDia()
      .then(negociacoesDeHoje => {
        return negociacoesDeHoje.filter(negociacoesDeHoje => {
          return !this.negociacoes
            .lista()
            .some(negociacao => negociacao.ehIgual(negociacoesDeHoje))
        })
      })
      .then(negociacoesDeHoje => {
        for(let negociacao of negociacoesDeHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      })
  }

  private ehDiaUtil(data: Date) {
    return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
  }

  

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus()
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso');
  }

}