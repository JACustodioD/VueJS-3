app.component("product", {
    template: /* vue-html */ `
    <section class="product">
        <div class="product__thumbnails">
            <div v-for="image, index in product.images" :key="image.thumbnail" 
            class="thumb" 
            :class="{ active: activeImage === index }" 
            :style="{ backgroundImage: 'url(' + product.images[index].thumbnail+')'}"
            @click="activeImage = index"
            ></div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" alt="product.name">
        </div>
    </section>
    <section class="description">
        <h4> {{ product.name.toUpperCase() }} {{ product.stock === 0 ? ":(" : "8)" }} </h4>
        <span class="badge new" v-if="product.new" >Nuevo</span>
        <span class="badge offer" v-if="product.offer">Oferta</span>
        <p class="description__status" v-if="product.stock === 1 ">último producto disponible</p>
        <p class="description__status" v-else-if="product.stock === 0"> Ya no hay más productos :(</p>
        <p class="description__status" v-else>Que esperas para pedir tu producto</p>
        <p class="description__price">$ {{ new Intl.NumberFormat("es-MX").format(product.price) }}</p>
        <p class="description__content">
            {{ product.content }}
        </p>
        <div class="discount">
            <span>Código de descuento:</span>
            <input type="text" placeholder="Ingresa tu código" @keyup.enter="applyDiscount($event)">
            <button :disabled="product.stock === 0" @click="addToCar()">
                Agregar al carrito
            </button>
        </div> 
    </section>
    `,
    data(){
        return {
            product: {
                name: "Camara",
                price: 450_000,
                stock: 2,
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo recusandae eum sunt eos quod,
            voluptates quidem tempora. Eum, ipsum voluptates non aliquid voluptatum delectus nisi vel impedit.
            Repudiandae, soluta corrupti `,
            images: [
                {
                    image: "./images/camara.jpg",
                    thumbnail: "./images/camara-thumb.jpg"
                },
                {
                    image: "./images/camara-2.jpg",
                    thumbnail: "./images/camara-2-thumb.jpg"
                }
            ],
            new: true,
            offer: false,
            quantity: 1
            },
            activeImage:0,
            discountCodes: ["PLATZI21", "JACD04", "OTROCODE"]
        }
    },
    methods: {
        applyDiscount(event){
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if(discountCodeIndex > 0){
                this.product.price *= 50/ 100;
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        addToCar(){
            const prodIndex = this.cart.findIndex(prod => prod.name === this.product.name);

            if(prodIndex > 0 ) {
                this.cart[prodIndex].quantity += 1;
            } else {
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    }
})