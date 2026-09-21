// Busca el carrito guardado en el navegador.
// Si no existe, devuelve un arreglo vacío [].
function obtenerCarrito() {
    // localStorage guarda la información como texto.
    let datosCarrito = localStorage.getItem("levelupCarrito");

    // Si existe información guardada, la convertimos desde JSON a JavaScript.
    if (datosCarrito) {
        return JSON.parse(datosCarrito);
    }

    // Si todavía no hay productos, comenzamos con un carrito vacío.
    return [];
}


// ------------------------------------------------------------
// 2. GUARDAR EL CARRITO
// ------------------------------------------------------------
// Recibe el arreglo de productos y lo guarda en el navegador.
function guardarCarrito(carrito) {
    // localStorage solo puede guardar texto,
    // por eso convertimos el arreglo a JSON.
    let datosCarrito = JSON.stringify(carrito);

    // Guardamos el carrito usando la clave "levelupCarrito".
    localStorage.setItem("levelupCarrito", datosCarrito);
}


// ------------------------------------------------------------
// 3. AGREGAR PRODUCTO
// ------------------------------------------------------------
// Recibe el nombre y el precio del producto.
function agregarCarrito(nombre, precio) {
    // Primero obtenemos el carrito actual.
    let carrito = obtenerCarrito();

    // Buscamos si el producto ya estaba en el carrito.
    let productoEncontrado = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    // Si el producto ya existe, aumentamos su cantidad.
    if (productoEncontrado) {
        productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
    }
    // Si no existe, agregamos un producto nuevo.
    else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // Guardamos los cambios.
    guardarCarrito(carrito);

    // Avisamos al usuario.
    alert(nombre + " fue añadido al carrito.");
}


// ------------------------------------------------------------
// 4. MOSTRAR EL CARRITO
// ------------------------------------------------------------
function mostrarCarrito() {
    // Buscamos en el HTML dónde mostrar los productos y el total.
    let contenedorCarrito = document.getElementById("carrito");
    let elementoTotal = document.getElementById("total-carrito");

    // Algunas páginas no tienen estos elementos.
    // En ese caso no hacemos nada.
    if (!contenedorCarrito) {
        return;
    }

    // Obtenemos los productos guardados.
    let carrito = obtenerCarrito();

    // Si no hay productos, mostramos un mensaje.
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
        elementoTotal.innerHTML = "";
        return;
    }

    // Variable donde acumularemos el precio total.
    let total = 0;

    // Limpiamos el contenedor antes de volver a mostrar los productos.
    contenedorCarrito.innerHTML = "";

    // Recorremos cada producto del carrito.
    carrito.forEach(function(producto) {
        // Calculamos el subtotal del producto.
        let subtotal = producto.precio * producto.cantidad;

        // Sumamos el subtotal al total general.
        total = total + subtotal;

        // Agregamos el producto al HTML.
        contenedorCarrito.innerHTML +=
            "<div class='cart-item'>" +
            "<span>" + producto.nombre + " x " + producto.cantidad + "</span>" +
            "<strong>$" + subtotal.toLocaleString("es-CL") + "</strong>" +
            "</div>";
    });

    // Mostramos el total y el botón para vaciar el carrito.
    elementoTotal.innerHTML =
        "Total: $" + total.toLocaleString("es-CL") +
        "<br>" +
        "<div class='cart-item'>" +
        "<button class='btn' onclick='vaciarCarrito()'>" +
        "Vaciar carrito" +
        "</button>" +
        "<button class='btn'>" + "💳 Pagar" + "</button>" +
        "</div>";
}


// ------------------------------------------------------------
// 5. VACIAR EL CARRITO
// ------------------------------------------------------------
function vaciarCarrito() {
    // Eliminamos el carrito guardado en el navegador.
    localStorage.removeItem("levelupCarrito");

    // Actualizamos la pantalla para mostrar que quedó vacío.
    mostrarCarrito();
}
