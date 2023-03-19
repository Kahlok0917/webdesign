/*modify from website*/
let carts=document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'FIRE SPORTS T-SHIRT',
        tag:'newin1',
        price:90,
        inCart:0
    },

    {
        name: 'AD 11 SPORT SHOES',
        tag:'newin2',
        price:320,
        inCart:0
    },

    {
        name: 'AD 21 SPORT SHOES',
        tag:'newin3',
        price:420,
        inCart:0
    },

    {
        name: 'KIV-11 SPORT PANTS',
        tag:'newin4',
        price:420,
        inCart:0
    },

    {
        name: 'KTV-11 SPORT T-SHIRT',
        tag:'newin5',
        price:100,
        inCart:0
    },

    {
        name: 'VTM55 SPORT SHOES',
        tag:'newin6',
        price:400,
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
    let cartCost=localStorage.getItem('totalCost');

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

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon onclick="removeItem();" name="close-circle-outline"></ion-icon>
                <img src="${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>

            <div class="price">RM${item.price}.00</div>
            <div class="quantity">
                <ion-icon onclick="myQuantity();" class="decrease" name="arrow-down-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon onclick="mySecQuantity();" class="increase" name="arrow-up-circle-outline"></ion-icon>
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
