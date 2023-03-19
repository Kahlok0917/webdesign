/*modify from website*/
let carts=document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'KTV-11 SPORT T-SHIRT',
        tag:'newin5',
        price:100,
        inCart:0
    },

    {
        name: 'S-05 SPORT T-SHIRT',
        tag:'womenclothing1',
        price:90,
        inCart:0
    },

    {
        name: 'S-20 SPORT T-SHIRT',
        tag:'womenclothing2',
        price:95,
        inCart:0
    },

    {
        name: 'S-15 SPORT T-SHIRT',
        tag:'womenclothing3',
        price:80,
        inCart:0
    },

    {
        name: 'KTV-12 SPORT T-SHIRT',
        tag:'womenclothing4',
        price:99,
        inCart:0
    },

    {
        name: 'KTV-8 SPORT T-SHIRT',
        tag:'womenclothing5',
        price:110,
        inCart:0
    },

    {
        name: 'GTS19 SPORT SHOES',
        tag:'womenshoes1',
        price:490,
        inCart:0
    },

    {
        name: 'GTS10 SPORT SHOES',
        tag:'USD_shoes2',
        price:390,
        inCart:0
    },
    
    {
        name: 'GTS05 SPORT SHOES',
        tag:'womenshoes3',
        price:450,
        inCart:0
    },

    {
        name: 'GTS012 SPORT SHOES',
        tag:'womenshoes4',
        price:500,
        inCart:0
    },

    {
        name: 'GTS20 SPORT SHOES',
        tag:'womenshoes5',
        price:400,
        inCart:0
    },

    {
        name: 'GTS1027 SPORT SHOES',
        tag:'womenshoes6',
        price:599,
        inCart:0
    }

];

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.addtocart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.addtocart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.addtocart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems !=null) {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems ={
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    //console.log("The product price is",product.price);
    let cartCost=localStorage.getItem('totalCost');
    
    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost );

    if(cartCost !=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems =localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');


    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>

            <div class="price">RM${item.price}.00</div>
            <div class="quantity">
                <ion-icon name="arrow-down-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-up-circle-outline"></ion-icon>
            </div>
            <div class="total">
                RM${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class"basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    RM${cartCost}.00
                </h4>
            </div>
        `;
    }

}

onLoadCartNumbers();
displayCart();