import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logarTempoDeExecucao.js";

export abstract class View<T> {

  protected elemento: HTMLElement;
  
  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);
    if(elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw new Error(`Seletor ${seletor} não encontrado no DOM. Verifique.`);
    }
  }

  
  @logarTempoDeExecucao(true)
  @inspect
  public update(model: T): void {
    let template = this.template(model);
    this.elemento.innerHTML = template;   
  }
  
  protected abstract template(model: T): string
  
}