

/* LA UNICA PESTAÑA QUE TIENE DESARROLLO ES LA DE Productos - Guitarras */


const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito"); 

const precioTotal = document.getElementById("precioTotal");

let carrito = [];


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

/* Funcion para vaciar el carrito */

botonVaciar.addEventListener('click', () => {
    swal({
        title: "¿Esta seguro de que quiere vaciar el carrito?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Carrito vacio", {
                    icon: "success",
                });
                carrito.length = 0;
                actualizarCarrito();
            } else {
                swal("Gracias por dejar las cosas en el carrito!!!");
            }
        });


})


//Funcion para traer la info del fetch y guardar en sessionStorage
const obtenerProductos = () => {
    fetch("../js/productos.json")
        .then(response => response.json())
        .then(json => {
            sessionStorage.removeItem('productos');
            sessionStorage.setItem('productos', JSON.stringify(json));
        })
        .catch(error => console.log(error));     
}

//Funcion para traer la info del SessionStorage y convertir a json nuevamente y devuelve la info en JSON
function totalProductos (){   
    let totalprod = sessionStorage.getItem('productos');
    totalprod = JSON.parse(totalprod);
    return totalprod;
}

//Renderizar cartas trayendo los productos de la funcion anterior
const renderizadoCartas = () =>{
    const datosProductos = totalProductos ()
    datosProductos.forEach(prod =>{
        contenedorProductos.innerHTML += `
        <div class="producto">
            <img src=${prod.img} alt="modelo de ${prod.modelo}">
            <div class="containderPrecioModelo">
                <h2>${prod.modelo}</h2>
                <h2>$ ${prod.precio}</h2>
                <button id="agregar${prod.id}" onclick="agregarAlCarrito(${prod.id})" class="btn btn-lg c-fondo cLetra text-center w-40">Agregar al carrito</button>
            </div>
        </div>
        `
    })
}
obtenerProductos()
renderizadoCartas()

/* Funcion que agrega los productos al carrito que resive por parametro la id del producto  */
/* Nos va a traer el producto que que tenga la propiedad id que coincida con el producto id que resivo por parametro   */


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
    const stockProductos = totalProductos ()
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    Toastify({
        text: "Se agrego al carrito",
        duration: 7000,
        destination: "https://matiasfernandez-a.github.io/mendezguitar/pages/carrito.html",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
    actualizarCarrito()
}

/* 
Funcion eliminar del carrito
*/

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

/* Recorrer el carrito y por cada objeto crear un div con una clase para que si inserten bien los carritos */

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');
        div.innerHTML = `
        <div class="carritoModelo">
            <p>${prod.modelo}</p>
            <p> Precio: ${prod.precio}</p>
        </div>
        <div class="botonEliminar" >
            <button onclick="eliminarDelCarrito(${prod.id})">X</button>
        </div>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length;

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);

}