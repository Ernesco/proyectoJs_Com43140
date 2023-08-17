/*** refresco en la pantalla el carrito   */
const mostrarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Productos Agregados.</h1>
        `;
    modalContainer.append(modalHeader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    modalHeader.append(modalbutton);
    carrito.forEach((articulo) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
                        <img src="${articulo.img}"></img>
                        <h3>${articulo.nombre}</h3>
                        <p>$ ${articulo.precio}</p>
                        <span class="restar"> ➖ </span>
                        <p>Cantidad: ${articulo.cantidad}</p>
                        <span class="sumar"> ➕ </span>
                        <p>Total: $ ${articulo.cantidad * articulo.precio}</p>
                        <span class="delete-product"> ❌ </span>
                        `;
        modalContainer.append(carritoContent)
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (articulo.cantidad !== 1) {
                articulo.cantidad--;
                saveLocal();
                mostrarCarrito()
                Toastify({
                    text: "Articulo Eliminado:   ",
                    duration: 3000,
                    position: 'center',
                    style: {
                        background: 'linear-gradient(to right, #0a0101, #0a1010)'
                    }
                }).showToast();
            } else {
                Toastify({
                    text: "No es posible descontar",
                    duration: 3000,
                    position: 'center',
                    style: {
                        background: 'linear-gradient(to right, #0a0101, #0a1010)'
                    }
                }).showToast();
            }
        })
        //se suman articulos dentro del carrito
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            articulo.cantidad++;
            Toastify({
                text: "Cantidad Agregada",
                duration: 3000,
                position: 'center',
                style: {
                    background: 'linear-gradient(to left, #0a0101, #0a1010)'
                }
            }).showToast();
            /*** guado el carrito en el storage */
            saveLocal();
            mostrarCarrito()
        })
        //eliminar articulo
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            Swal.fire({
                title: 'Está seguro de eliminar?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarProducto(articulo.id);
                    Swal.fire({
                        title: 'Borrada!',
                        icon: 'success',
                        text: 'Articulo Eliminado'
                    })
                }
            })
        })
    });
    //calcula el total de la compra
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `TOTAL A PAGAR: $ ${total}`;
    modalContainer.append(totalBuying);
};
//elimina artoculo del carrito
verCarrito.addEventListener("click", mostrarCarrito)
    const eliminarProducto = (id) => {
    const foundId = carrito.find((Element) => Element.id === id);
    console.log(foundId);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    mostrarCarrito();
};

/* cuento carrito, guardo en el localStorage */
    const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

