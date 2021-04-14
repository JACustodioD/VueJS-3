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
    props: ["product"],
    setup(props){
        const productState = reactive({
            activeImage: 0
        });

        function addToCar(){
            const prodIndex = cartState.cart.findIndex(prod => prod.name === props.product.name);
            if(prodIndex >= 0 ) {
                cartState.cart[prodIndex].quantity += 1;
            } else {
                cartState.cart.push(props.product);
            }
            props.product.stock -= 1;
        }
        
        const discountCodes = ref(["PLATZI21", "JACD04", "OTROCODE"])
        function applyDiscount(event){
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if(discountCodeIndex > 0){
                props.product.price *= 50/ 100;
                discountCodes.value.splice(discountCodeIndex, 1);
            }
        }

        return {
            ...toRefs(productState),
            addToCar,


            applyDiscount
        };

    }
});