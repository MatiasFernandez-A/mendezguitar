const productos = [
    {
        "precio": 150000,
        "modelo": "guitarra1"
    },
    {
        "precio": 93000,
        "modelo": "guitarra2"
    },
    {
        "precio": 95500,
        "modelo": "guitarra3"
    },
    {
        "precio": 150000,
        "modelo": "guitarra4"
    },
    {
        "precio": 125500,
        "modelo": "guitarra5"
    },
    {
        "precio": 111000,
        "modelo": "guitarra6"
    },
    {
        "precio": 200000,
        "modelo": "guitarra7"
    },
    {
        "precio": 165700,
        "modelo": "guitarra8"
    }
]; 

let aniadirCarrito = [] ;


let comprar = document.querySelectorAll('.comprar');

comprar.forEach((agregarCarrito) => {
    agregarCarrito.addEventListener('click', () => console.log("hola"));
})

