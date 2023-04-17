export abstract class View<T> {

  protected elemento: HTMLElement;
  private escapar = false

  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);
    if(elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw new Error(`Seletor ${seletor} não encontrado no DOM. Verifique.`);
    }
    if(escapar) {
      this.escapar = escapar;
    }
  }

  public update(model: T): void {
    const t1 = performance.now();
    let template = this.template(model);
    if(this.escapar) {
      template = template
        .replace(/<script>[\s\S]*?<\/script>/, '')
    }
    this.elemento.innerHTML = template;
    const t2 = performance.now();
    console.log(`O tempo de execução do método update foi ${(t2 - t1) / 1000} segundos`);
    
    
  }
  
  protected abstract template(model: T): string
  
}