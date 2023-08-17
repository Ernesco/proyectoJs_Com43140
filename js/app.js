const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito")


//se crea el div para mostrar los productos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async() => {
    const response = await fetch ("data.json")
    const data = await response.json()    
    data.forEach((articulo) => {
        let content = document.createElement("div")
        content.className = "card";
        content.innerHTML = `
    <img src="${articulo.img}"></img>
    <h3>${articulo.nombre}</h3>
    <h5>${articulo.descripcion}</h5>
    <p>$ ${articulo.precio}</p>
    `;
        shopContent.append(content);

        //se crea el boton para comprar
        let comprar = document.createElement("button")
        comprar.innerText = "Agregar al Carrito";
        comprar.className = "comprar";
        content.append(comprar);
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === articulo.id);
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === articulo.id) {
                        prod.cantidad++
                    }
                })
            } else {
                Toastify({
                    text: "Articulo Agregado",
                    duration: 3000,
                    position: 'center',
                    style: {
                        background: 'linear-gradient(to right, #0a1010, #0a1010)'
                    }
                }).showToast();
                carrito.push({
                    id: articulo.id,
                    img: articulo.img,
                    nombre: articulo.nombre,
                    precio: articulo.precio,
                    cantidad: articulo.cantidad ,
                });
            }
            console.log(carrito)
            console.log(carrito.length)
            /* cuento los productos */
            carritoCounter();
            /* lo meto en el localstorage  */
            saveLocal();
        })
    })
}
getProductos();
    
//set item
const saveLocal = () => {
    /* guardo el carrito en el localstorage y le mando el string con JSON.stringify */
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
carritoCounter();
