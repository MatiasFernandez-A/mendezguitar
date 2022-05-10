const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const precioTotal = document.getElementById("precioTotal");



let carrito = [];


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener ('click', () =>{
    carrito.length = 0;
    actualizarCarrito();
})



/* Recorro cada producto del array y por cada uno le agrego una clase. Le agrego un id al boton, que despues lo guardo con el DOM y despues le agrego un addEventListener que va a ejecutar una funcion */

stockProductos.forEach((producto) => {
    const div = document.createElement ('div'); 
    div.classList.add('producto')
    div.innerHTML = `
    <section class="container row d-none d-lg-block">
        <div class="d-flex w-100 justify-content-lg-center">
            <div class="card shadow-lg m-2" style="width: 18rem;">
                <img src="../images/dos.jpg" class="card-img-top" alt="modelo de guitarra guitarra1 ">
                <div class="d-flex flex-column justify-content-center align-items-center ">
                    <h2 class="card-title mt-3">${producto.modelo}</h2>
                    <h2 class="card-title mt-3">$ ${producto.precio}</h2>
                    <button id="agregar${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>
    </section>
    `
    contenedorProductos.appendChild(div); 
    const boton = document.getElementById(`agregar${producto.id}`); //string template
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id)
    })
})

/* Funcion que agrega los productos al carrito que resive por parametro la id del producto  */
/* Nos va a traer el producto que que tenga la propiedad id que coincida con el producto id que resivo por parametro   */


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}
/* 
1 - Funcion eliminar del carrito: recive por parametro el id del producto
2 - Busca ese mismo ID con find dentro del carrito 
3 - Con indexOf obtiene su indice
4 - Hace un splice con ese indice 
*/

const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item); 
    carrito.splice(indice, 1);
    actualizarCarrito();
}

/* Recorrer el carrito y por cada objeto crear un div con una clase para que si inserten bien los carritos */

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML= "";

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');
        div.innerHTML = `
        <p>${prod.modelo}</p>
        <p> Precio: ${prod.precio}</p>
        <button onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length;

    /*  */
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);

}
