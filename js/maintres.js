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



/* Recorro cada producto del array y por cada uno le agrego una clase. Le agrego un id al boton, que despues lo guardo con el DOM y despues le agrego un addEventListener que va a ejecutar una funcion */

/* stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt="modelo de ${producto.modelo}">
    <div class="containderPrecioModelo">
        <h2>${producto.modelo}</h2>
        <h2>$ ${producto.precio}</h2>
        <button id="agregar${producto.id}" class="btn btn-lg c-fondo cLetra text-center w-40">Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div);

})
 */




const obtenerDatos = ()=>{
    fetch("../js/productos.json")
        .then(response => response.json())
        .then((result) => {
            let datosProductos = result;
            datosProductos.forEach(prod =>{
                contenedorProductos.innerHTML = `
                <div class="producto">
                    <img src=${prod.img} alt="modelo de ${prod.modelo}">
                    <div class="containderPrecioModelo">
                        <h2>${prod.modelo}</h2>
                        <h2>$ ${prod.precio}</h2>
                        <button id="agregar${prod.id}" class="btn btn-lg c-fondo cLetra text-center w-40">Agregar al carrito</button>
                    </div>
                </div>
                `
            })
        })
        .catch(error => console.log(error));
        const boton = document.getElementById(`agregar${prod.id}`); //string template
        boton.addEventListener("click", () => {
        agregarAlCarrito(prod.id)
    })
}

obtenerDatos();



/* Funcion que agrega los productos al carrito que resive por parametro la id del producto  */
/* Nos va a traer el producto que que tenga la propiedad id que coincida con el producto id que resivo por parametro   */


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
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
1 - Funcion eliminar del carrito: recive por parametro el id del producto
2 - Busca ese mismo ID con find dentro del carrito 
3 - Con indexOf obtiene su indice
4 - Hace un splice con ese indice 
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

    /*  */
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);

}
