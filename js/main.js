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

let aniadirCarrito = [] ;

/* funcio inventario: Pide valores para varibles guitarra y precio. Las guarda por parametro en la clase Productos creando un nuevo producto */

function inventario() {
    let guitarra = document.getElementById("guitarraModelo");   
    let precio = parseInt(document.getElementById("precioGuitarra"));   
    let nuevoProd = new Productos(guitarra,precio); 
    nuevoProd.sumarIva();
    nuevoProd.vender();
    let carrito = confirm("Queres añadirlo al carrito ?");
    if (carrito == true){
        aniadirCarrito.push(nuevoProd);
        console.log(aniadirCarrito);
    }
    
    console.log(nuevoProd);
}


inventario();

/* Queres saber si la guitarra que elegiste esta en el carrito? */

let cantidadCarrito = confirm("Queres saber cuantos productos tenes en el carrito?")

let cantidad = () => {
    if (cantidadCarrito == true) {
        console.log( aniadirCarrito.length );
    } else {
        console.log ("No se muestra")
    }
}

cantidad();
