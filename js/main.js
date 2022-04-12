/* Clase Productos: Ademas de crear el objeto, le suma el iva y muestra que ya esta vendido */
class Productos {
    constructor(guitarra, precio) {
        this.guitarra = guitarra;
        this.precio = parseFloat(precio);
        this.vendido = false;
    }
    sumarIva (){
        this.precio = this.precio * 1.21;
    }
    vender (){
        this.vendido = true;
    }
}
let aniadirCarrito = " ";

/* funcio inventario: Pide valores para varibles guitarra y precio. Las guarda por parametro en la clase Productos creando un nuevo producto */
function inventario() {
    let guitarra = prompt("Que guitarra queres?");   
    let precio = parseInt(prompt("Ingrese precio de la guitarra. El precio se muestra en la tabla de precios"));   
    const producto1 = new Productos(guitarra,precio);
    producto1.sumarIva();
    producto1.vender();
    console.log(producto1)
}

inventario();

aniadirCarrito = confirm("Queres añadirlo al carrito?");

const carrito = [];

if (aniadirCarrito == true){
carrito.push(new producto1);
}
console.log(carrito);