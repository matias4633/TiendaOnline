const email = document.querySelector('.email');
const desktopmenu = document.querySelector('.desktop-menu');
const menu_movil = document.querySelector('.mobile-menu');
const boton_menu_movil = document.querySelector('img.menu');
const boton_carrito = document.querySelector('.carrito');
const carrito = document.querySelector('.my-order');
const cardsConteiner = document.querySelector('.cards-conteiner');
const botonCerrarDetalles = document.querySelector('.cerrar');
const detallesProducto = document.querySelector('.detalle-producto ');


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
    imagen.setAttribute('src', producto.imagen);

    const info = document.createElement('div');
    info.classList.add('info');
    const productoInfoDetalles = document.createElement('div');
    productoInfoDetalles.classList.add('product-info-detalles');
    const precio = document.createElement('p');
    precio.innerText ='$' +producto.price;
    const nombre = document.createElement('p');
    nombre.innerText = producto.name;
    const descripcion = document.createElement('p');
    descripcion.classList.add('descrip');
    descripcion.innerText = producto.descripcion;
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
        productImg.setAttribute('src', producto.imagen);
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
        nombre.innerText = producto.name;

        const figure = document.createElement('figure');

        const icono = document.createElement('img');
        icono.setAttribute('src', './icons/bt_add_to_cart.svg');

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
for (let index = 0; index < 8; index++) {
    productos.push({
        name: 'Bike',
        price: 120+index,
        imagen: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id voluptates, recusandae consectetur deleniti a ratione debitis quidem incidunt autem quas amet natus tempore harum vitae nisi maiores quamest? Vel.'
    });

}

renderProductos(productos);
