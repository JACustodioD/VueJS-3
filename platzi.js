class PlatziReactive{
    constructor(options){
        this.origen = options.data();

        // Destino
        this.$data = new Proxy(this.origen, {
            get(target, name) {
                if(name in target) {
                    return target[name];
                }
                console.warn("La propiedad ",name," no existe");
                return "";
            }
        })
    }
    mount() {
        document.querySelectorAll("*[p-text]").forEach(el => {
            this.pText(el, this.$data , el.getAttribute("p-text"));
        });
    }

   pText(el, target, name){
       el.innerText = target[name];
   }
    pModel(){}
}

var Platzi = {
    createApp(options) {
        return new PlatziReactive(options)
    }
}