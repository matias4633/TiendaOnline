const email = document.querySelector('.email');
const desktopmenu = document.querySelector('.desktop-menu');
const menu_movil = document.querySelector('.mobile-menu');
const boton_menu_movil = document.querySelector('img.menu');
const boton_carrito = document.querySelector('.carrito');
const carrito = document.querySelector('.my-order');
const cardsConteiner = document.querySelector('.cards-conteiner');
const botonCerrarDetalles = document.querySelector('.cerrar');
const detallesProducto = document.querySelector('.detalle-producto ');
const loader=document.querySelector('.loader');
const contenedorCarrito=document.querySelector('.contenedor');
const totalRender=document.querySelector('.total');
const cantEnCarrito=document.querySelector('.cantidad');

let total=0;
let productosEnCarrito=[];


function toggleElemento(elemento) {
    elemento.classList.toggle('oculto');
}
function openElemento(elemento) {
    elemento.classList.remove('oculto');
}
function renderDetalles(producto) {
    const aside = document.createElement('aside');
    aside.classList.add('producto');
    const cerrar=document.createElement('img');
    cerrar.classList.add('cerrar');
    cerrar.setAttribute('src','/icons/icon_close.png');
    cerrar.addEventListener('click',
        () => {
            toggleElemento(detallesProducto);
            while(detallesProducto.firstChild){
                detallesProducto.removeChild(detallesProducto.firstChild);
            }
        }
    );
    const imagen = document.createElement('img');
    imagen.setAttribute('src', producto.image);

    const info = document.createElement('div');
    info.classList.add('info');
    const productoInfoDetalles = document.createElement('div');
    productoInfoDetalles.classList.add('product-info-detalles');
    const precio = document.createElement('p');
    precio.innerText ='$' +producto.price;
    const nombre = document.createElement('p');
    nombre.innerText = producto.title;
    const descripcion = document.createElement('p');
    descripcion.classList.add('descrip');
    descripcion.innerText = producto.description;
    const boton = document.createElement('button');
    boton.className='primary-button primary-button-detalles';
    boton.innerHTML='Add to card';
    const icono = document.createElement('img');
    icono.setAttribute('src', './icons/bt_add_to_cart.svg');
    
    boton.appendChild(icono);
    productoInfoDetalles.appendChild(precio);
    productoInfoDetalles.appendChild(nombre);
    productoInfoDetalles.appendChild(descripcion);
    productoInfoDetalles.appendChild(boton);
    info.appendChild(productoInfoDetalles);
    aside.appendChild(cerrar);
    aside.appendChild(imagen);
    aside.appendChild(info);

    detallesProducto.appendChild(aside);

}
function renderProductos(array) {
    
    array.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.setAttribute('src', producto.image);
        productImg.addEventListener('click', () => {
            if (!carrito.classList.contains('oculto')) {
                toggleElemento(carrito);
            }
            if (!menu_movil.classList.contains('oculto')) {
                toggleElemento(menu_movil);
            }
            if (!desktopmenu.classList.contains('oculto')) {
                toggleElemento(desktopmenu);
            }
            while(detallesProducto.firstChild){
                detallesProducto.removeChild(detallesProducto.firstChild);
            }
            renderDetalles(producto);
            openElemento(detallesProducto);

        });

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const divSinClase = document.createElement('div');

        const precio = document.createElement('p');
        precio.innerText = '$' + producto.price;

        const nombre = document.createElement('p');
        nombre.innerText = producto.title;

        const figure = document.createElement('figure');

        const icono = document.createElement('img');
        icono.setAttribute('src', './icons/bt_add_to_cart.svg');
        icono.addEventListener('click',()=>{
            agregarAlCarrito(producto);
        });

        figure.appendChild(icono);
        divSinClase.appendChild(precio);
        divSinClase.appendChild(nombre);
        productInfo.appendChild(divSinClase);
        productInfo.appendChild(figure);
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);

        cardsConteiner.appendChild(productCard);

    });
}
function borrarProductos(){
    while(cardsConteiner.firstChild){
        cardsConteiner.removeChild(cardsConteiner.firstChild);
    }
}
function todas(){
    borrarProductos();
    toggleElemento(loader);
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                console.log(json);
                toggleElemento(loader);
                renderProductos(json);
            } )
}
function ropahombre(){
    borrarProductos();
    toggleElemento(loader);
    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
            .then(res=>res.json())
            .then(json=>{
                toggleElemento(loader);
                renderProductos(json);
            })
}
function ropamujer(){
    borrarProductos();
    toggleElemento(loader);
    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
            .then(res=>res.json())
            .then(json=>{
                toggleElemento(loader);
                renderProductos(json);
            })
}
function joyas(){
    borrarProductos();
    toggleElemento(loader);
    fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res=>res.json())
            .then(json=>{
                toggleElemento(loader);
                renderProductos(json);
            } )
}
function electronicos(){
    borrarProductos();
    toggleElemento(loader);
    fetch('https://fakestoreapi.com/products/category/electronics')
            .then(res=>res.json())
            .then(json=>{
                toggleElemento(loader);
                renderProductos(json);
            })
}
function actualizarTotal(sumar,producto){
    let valor=Math.floor(producto.price*100);
    let aux=Math.floor(total*100);
    if(sumar){
        aux+=valor;
        productosEnCarrito.push(producto);
        localStorage.setItem('carrito',JSON.stringify(productosEnCarrito));
    }else{
        aux-=valor;
        productosEnCarrito=productosEnCarrito.filter((objeto)=>objeto.hash!==producto.hash);
        localStorage.setItem('carrito',JSON.stringify(productosEnCarrito));
    }
    total=aux/100;
    cantEnCarrito.innerText=productosEnCarrito.length;
    totalRender.innerText='$ '+total;
}
function agregarAlCarrito(producto){
    producto.hash=Math.floor(Math.random() * 100)*Date.now();

    const shoppingCart=document.createElement('div');
    shoppingCart.classList.add('shopping-cart');

    const figure=document.createElement('figure');
    const img=document.createElement('img');
    img.setAttribute('src',producto.image);

    const nombre=document.createElement('p');
    nombre.innerText=producto.title;

    const precio=document.createElement('p');
    precio.innerText='$ '+producto.price;

    const eliminar=document.createElement('img');
    eliminar.setAttribute('src','/icons/icon_close.png');
    eliminar.addEventListener('click',
        ()=>{
               shoppingCart.remove();
               actualizarTotal(false,producto);
        });

    figure.appendChild(img);
    shoppingCart.appendChild(figure);
    shoppingCart.appendChild(nombre);
    shoppingCart.appendChild(precio);
    shoppingCart.appendChild(eliminar);

    contenedorCarrito.appendChild(shoppingCart);
    
    actualizarTotal(true,producto);

}
function recordarCarrito(productos){
    productos.forEach((producto)=>{agregarAlCarrito(producto)});
}

email.addEventListener('click',
    () => {
        if (!carrito.classList.contains('oculto')) {
            toggleElemento(carrito);
        }
        if (!detallesProducto.classList.contains('oculto')) {
            toggleElemento(detallesProducto);
        }
        toggleElemento(desktopmenu);
    });
boton_menu_movil.addEventListener('click',
    () => {
        if (!carrito.classList.contains('oculto')) {
            toggleElemento(carrito);
        }
        if (!detallesProducto.classList.contains('oculto')) {
            toggleElemento(detallesProducto);
        }

        toggleElemento(menu_movil);
    });
boton_carrito.addEventListener('click',
    () => {
        if (!menu_movil.classList.contains('oculto')) {
            toggleElemento(menu_movil);
        }
        if (!desktopmenu.classList.contains('oculto')) {
            toggleElemento(desktopmenu);
        }
        if (!detallesProducto.classList.contains('oculto')) {
            toggleElemento(detallesProducto);
        }
        toggleElemento(carrito)
    });

botonCerrarDetalles.addEventListener('click',
    () => {
        toggleElemento(detallesProducto);
        while(detallesProducto.firstChild){
            detallesProducto.removeChild(detallesProducto.firstChild);
        }
    }
);

const productos = [];
/* for (let index = 0; index < 8; index++) {
    productos.push({
        id:1,
        title: 'Bike',
        price: 120+index,
        category:'electro',
        image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id voluptates, recusandae consectetur deleniti a ratione debitis quidem incidunt autem quas amet natus tempore harum vitae nisi maiores quamest? Vel.'
    });

} */
todas();
recordarCarrito(JSON.parse(localStorage.getItem('carrito')));


//renderProductos(productos);
