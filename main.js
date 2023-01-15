const email=document.querySelector('.email');
const desktopmenu=document.querySelector('.desktop-menu');
const menu_movil=document.querySelector('.mobile-menu');
const boton_menu_movil=document.querySelector('img.menu');
const boton_carrito=document.querySelector('.carrito');
const carrito=document.querySelector('.my-order');
const cardsConteiner=document.querySelector('.cards-conteiner');


function toggleElemento(elemento){
    elemento.classList.toggle('oculto');
}
function renderProductos(array){
    for(producto of array){
    const productCard=document.createElement('div');
    productCard.classList.add('product-card');

    const productImg=document.createElement('img');
    productImg.classList.add('product-img');
    productImg.setAttribute('src',producto.imagen);

    const productInfo=document.createElement('div');
    productInfo.classList.add('product-info');

    const divSinClase=document.createElement('div');
    
    const precio=document.createElement('p');
    precio.innerText='$'+ producto.price;

    const nombre=document.createElement('p');
    nombre.innerText=producto.name;

    const figure=document.createElement('figure');

    const icono=document.createElement('img');
    icono.setAttribute('src','./icons/bt_add_to_cart.svg');

    figure.appendChild(icono);
    divSinClase.appendChild(precio);
    divSinClase.appendChild(nombre);
    productInfo.appendChild(divSinClase);
    productInfo.appendChild(figure);
    productCard.appendChild(productImg);
    productCard.appendChild(productInfo);

    cardsConteiner.appendChild(productCard);

}
}

email.addEventListener('click',
    ()=>{
        if(!carrito.classList.contains('oculto')){
            toggleElemento(carrito);
        }
        toggleElemento(desktopmenu);
    });
boton_menu_movil.addEventListener('click',
    ()=>{
            if(!carrito.classList.contains('oculto')){
                toggleElemento(carrito);
            }
            
            toggleElemento(menu_movil);
    });
boton_carrito.addEventListener('click',
    ()=>{
        if(!menu_movil.classList.contains('oculto')){
            toggleElemento(menu_movil);
        }
        if(!desktopmenu.classList.contains('oculto')){
            toggleElemento(desktopmenu);
        }
        toggleElemento(carrito)
    });

const productos=[];
for (let index = 0; index < 8; index++) {
    productos.push({
        name:'Bike',
        price:120,
        imagen:'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    });
    
}

renderProductos(productos);
