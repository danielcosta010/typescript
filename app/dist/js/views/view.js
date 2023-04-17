export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw new Error(`Seletor ${seletor} não encontrado no DOM. Verifique.`);
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }
    update(model) {
        const t1 = performance.now();
        let template = this.template(model);
        if (this.escapar) {
            template = template
                .replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
        const t2 = performance.now();
        console.log(`O tempo de execução do método update foi ${(t2 - t1) / 1000} segundos`);
    }
}
