
/* Clase Productos: Crea el objeto  nuevo objeto */
class Productos {
    constructor(guitarra, precio) {
        this.guitarra = guitarra;
        this.precio = parseInt(precio);
    }
}


let aniadirCarrito = [] ;
let btnGuardar = document.getElementById("btn");

/* funcio inventario: Pide valores para varibles guitarra y precio. Las guarda por parametro en la clase Productos creando un nuevo producto */

function inventario(){
    let guitarra = document.getElementById("guitarraModelo").value;
    let precio = document.getElementById("precioGuitarra").value;
    const nuevoProd = new Productos(guitarra,precio);

    console.log(nuevoProd);

    let listaNueva = [];
    if (localStorage.getItem("Productos de guitarras") != null) {
        listaNueva = JSON.parse(localStorage.getItem("Productos de guitarra"));
        listaNueva.push(nuevoProd);
        localStorage.setItem("Productos de guitarra", JSON.stringify(listaNueva));
    } else {
        aniadirCarrito.push(nuevoProd);
        localStorage.setItem("Productos de guitarra", JSON.stringify(aniadirCarrito));

    }
    return nuevoProd
}

btnGuardar.addEventListener("click", (e) =>{
    e.preventDefault();
    inventario();
})  






/* En clase 9 esta la funcion para hacer aparecer carrito cuando le añado un producto  */


// Funcionalidades para agregar al e-comerce

/* funcion para filtrar por el buscador el producto que busquemos  */
/* funcion para mostrar un historial de los productos que buscamos */
/* funcio para agregar productos favoritos  */
/* hacer que aparezca el stock disponible del producto  */
/* funcion para agregar cantidad de productos al carrito y a medida que aumento la cantidad baja la cantidad de stock */




/* Una api es una respuesta del servidor que nos va a estar entregando datos que nosotros podemos usar en nuestra app web*/
/* se usa fetch para leer apis */
