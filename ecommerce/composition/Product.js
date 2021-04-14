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

        <badge :product="product"></badge>
        
        <p class="description__status" v-if="product.stock === 1 ">último producto disponible</p>
        <p class="description__status" v-else-if="product.stock === 0"> Ya no hay más productos :(</p>
        <p class="description__status" v-else>Que esperas para pedir tu producto</p>
        <p class="description__price" :style="{ color: price_color }">$ {{ new Intl.NumberFormat("es-MX").format(product.price) }}</p>
        <p class="description__content">
            {{ product.content }}
        </p>
        <div class="discount">
            <span>Código de descuento:</span>
            <input type="text" placeholder="Ingresa tu código" @keyup.enter="applyDiscount($event)">
            <button :disabled="product.stock === 0" @click="sendToCart()">
                Agregar al carrito
            </button>
        </div> 
    </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],
    setup(props, context){
        const productState = reactive({
            activeImage: 0,
            price_color: "rgb(104, 104, 209)"
        });

      
        
        const discountCodes = ref(["PLATZI21", "JACD04", "OTROCODE"])
        function applyDiscount(event){
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if(discountCodeIndex > 0){
                props.product.price *= 50/ 100;
                discountCodes.value.splice(discountCodeIndex, 1);
            }
        }

        function sendToCart(){
            context.emit("sendtocart", props.product);
        }
        
        watch(() => productState.activeImage, (value, oldValue) => {
            console.log(value, oldValue);
        });
        watch( () => props.product.stock, (stock) => {
            if(stock <= 1 ) {
                productState.price_color = "rgb(188, 30, 67)";
            }
        });



        return {
            ...toRefs(productState),
            sendToCart,

            applyDiscount
        };

    }
});