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
let nuevoProd = 0; 
/* funcio inventario: Pide valores para varibles guitarra y precio. Las guarda por parametro en la clase Productos creando un nuevo producto */
function inventario(){
    let guitarra = document.getElementById("guitarraModelo").value;
    let precio = document.getElementById("precioGuitarra").value;
    nuevoProd = new Productos(guitarra,precio);
    nuevoProd.sumarIva();
    nuevoProd.vender()
}

inventario();

const boton = document.querySelector("#btn");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    aniadirCarrito.push(nuevoProd);
    console.log(aniadirCarrito);
});












