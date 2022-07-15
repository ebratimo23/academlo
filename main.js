const nav = document.querySelector("#nav");
const cart = document.querySelector("#cart");
const sidebar = document.querySelector("#sidebar");
const iconX = document.querySelector("#icon-x");

const allProducts = document.querySelector('.all-product-main')

const containerArticle = document.querySelector('.container-article');

const total1 = document.querySelector(".total");
const amountPlus = document.querySelector("#amount-plus")

window.addEventListener("scroll", function(){
    nav.classList.toggle('active', window.scrollY >0)
})

//! desplazamiento de carrtio de compras.
cart.addEventListener("click", function(){
    sidebar.classList.add("show_sidebar")
})
iconX.addEventListener("click", function(){
    sidebar.classList.remove("show_sidebar")
});

//* libreria de productos

mixitup(".all-product-main",{
    selectors:{
        target: '.card-product-main'
    },
    animation:{
        duration:300
    }
}).filter('Hoodies')

//? CARRITO DE COMPRAS 
const product = [

    {
        id:1,
        name: "Hoodies",
        price: 14.00,
        stock: 9,
        img: "box-img1",
        imagenes:"img/featured1.png",
    },
    {
        id:2,
        name: "Shirts",
        price: 24.00,
        stock: 15,
        img: "box-img2",
        imagenes:"img/featured2.png",


    },
    {
        id:3,
        name: "Sweatshirt",
        price: 24.00,
        stock: 20,
        img: "box-img3",
        imagenes:"img/featured3.png",

    },
]

containerArticle.addEventListener('click', (event) => {
    if(event.target.classList.contains("menos")){
        const id = parseInt(event.target.parentElement.id);
        if (orderAmout[id].amount === 1) {
            const res = confirm("seguro que quieres eleminar esto");

            if(res){
                delete orderAmout[id];
            }
        } else{
            orderAmout[id].amount--;
        }
    }

    if(event.target.classList.contains("mas")){
        const id = parseInt(event.target.parentElement.id);

        if(orderAmout[id].stock > orderAmout[id].amount){
            orderAmout[id].amount++;
        }else{
            alert("No hay mas disponibles")
        }
        
    }

    if(event.target.classList.contains("del")){
        const id = parseInt(event.target.parentElement.id);
        delete orderAmout[id];       
    }
    printPricaTotal();
    printCart();
    itemPlus();
})

const orderAmout = {};
allProducts.addEventListener("click", function(event){
    if(event.target.classList.contains("bx2")){
        const iduser = parseInt(event.target.parentElement.dataset.iduser); 
        
        const [currentProduct] = product.filter((n) => n.id === iduser)
        if(orderAmout[iduser]){
            if(orderAmout[iduser].stock > orderAmout[iduser].amount){
                orderAmout[iduser].amount++;
            }else{
                alert("No hay mas disponibles")
            }
        } else{
            orderAmout[iduser] = currentProduct;
            orderAmout[iduser].amount = 1;
        };


        
        printPricaTotal();
        printCart();
        itemPlus();

    }
});

function itemPlus(){
    amountPlus.textContent = Object.values(orderAmout).length;

}

function printPricaTotal(){
    const arraytotal = Object.values(orderAmout);

        let suma = 0;

        arraytotal.forEach((n) =>{
            suma += n.amount * n.price;
        });

         return total1.textContent = "$"+suma+".00";
}

function printCart(){
    const arrayOrder = Object.values(orderAmout);    
    let html = '';
    arrayOrder.forEach(({id, name, imagenes, price, stock, amount}) =>{
           html +=
           `<div class="article">
               <div class="img-article">
                   <img src="${imagenes}" alt="">
               </div>
               <div class="text-article">
                   <div class="text-price">
                       <h4>${name}</h4>
                       <p>Stock${stock}| <span>$${price}.00</span></p>
                       <p>Subtotal:${printPricaTotal()}</p>
                   </div>
                   <div class="contador" id="${id}">
                       <button class="menos"> - </button>
                       <p>${amount} units</p>
                       <button class="mas"> + </button>
                        <i class='del bx bxs-trash'></i>
                   </div>
               </div>
           </div>`;
    
        })    
        containerArticle.innerHTML = html;
    
    }
cardProducts();

function cardProducts(){
    const container = document.querySelector(".all-product-main")

    let html = ''
    
    for (let i = 0; i < product.length; i++) {
        html += `<div class="card-product-main all hoodies">
                    <div class="image-product-main ${product[i].img} "></div>
                    <div class="icon-plus" data-iduser='${product[i].id}'>
                        <i class='bx2 bx bx-plus'></i>
                    </div>
                    <div class="text-product-main">
                        <p><span>$${product[i].price}.00</span> | Stock:${product[i].stock}</p>
                        <p>${product[i].name}</p>
                    </div>
                </div>`;     
    }
    container.innerHTML = html;
}
/*
function pintarSidebar(){
    const sidebar1 = document.querySelector("#article")
    let html = "";
    const colecSidebar = Object.values(orderAmout);
    for (let i = 0; i < colecSidebar.length; i++) {
        html += `<div class="article">
                    <div class="img-article">
                        <img src="${colecSidebar[i].imagenes}" alt="">
                    </div>
                    <div class="text-article">
                        <div class="text-price">
                            <h4>${colecSidebar[i].name}</h4>
                            <p>Stock${colecSidebar[i].stock}| <span>${colecSidebar[i].price}</span></p>
                            <p>Subtotal:$48.00</p>
                        </div>
                        <div class="contador">
                            <button> - </button>
                            <p>2 units</p>
                            <button> + </button>
                            <div class="trash-icon" data-idicon='${colecSidebar[i].id}'>
                                <i class='bx bxs-trash'></i>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    sidebar1.innerHTML = html;
}
function addProducts(id1){
    for (let i = 0; i < product.length; i++) {   
        if(product[i].id === id1){
            colecSidebar.push(product[i])
        }         
    } 
}
function removeProducts(id2){
    for (let i = 0; i < colecSidebar.length; i++) {
        if (colecSidebar[i].id === id2) {
            colecSidebar.splice(i, 1);
        }
        
    }
}
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("bx2")){
        const id1 = parseInt(e.target.parentElement.dataset.iduser);
        
        addProducts(id1)
    }

    pintarSidebar();

})

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('bxs-trash')){
        const id2 = parseInt(event.target.parentElement.dataset.idicon);
        removeProducts(id2);
    }
})*/