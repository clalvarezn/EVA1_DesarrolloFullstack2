// Solo aceptamos correos que terminen en:
// @duoc.cl, @profesor.duoc.cl o @gmail.com
const dominiosPermitidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


// Comprueba si el correo tiene un formato permitido.
function validarCorreo(correo) {
    return dominiosPermitidos.test(correo);
}


// ------------------------------------------------------------
// 2. VALIDACIÓN DEL RUN
// ------------------------------------------------------------
// Comprueba el dígito verificador utilizando el algoritmo
// del módulo 11 usado para el RUN chileno.
function validarRUN(run) {
    // Pasamos el RUN a mayúsculas para aceptar también una "k".
    run = run.toUpperCase();

    // Dejamos solamente números y la letra K.
    run = run.replace(/[^0-9K]/g, "");

    // El RUN debe tener una cantidad válida de caracteres.
    if (run.length < 7 || run.length > 9) {
        return false;
    }

    // Separamos el número del dígito verificador.
    let cuerpo = run.slice(0, -1);
    let digitoVerificador = run.slice(-1);

    // Variables para realizar el cálculo.
    let suma = 0;
    let multiplicador = 2;

    // Recorremos el cuerpo del RUN desde derecha hacia izquierda.
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        // Convertimos el carácter a número y lo multiplicamos.
        suma = suma + parseInt(cuerpo[i]) * multiplicador;

        // Aumentamos el multiplicador.
        multiplicador = multiplicador + 1;

        // Después de 7 volvemos a comenzar en 2.
        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    // Calculamos el resto del módulo 11.
    let resto = 11 - (suma % 11);

    // Calculamos cuál debería ser el dígito verificador.
    let digitoEsperado;

    if (resto === 11) {
        digitoEsperado = "0";
    } else if (resto === 10) {
        digitoEsperado = "K";
    } else {
        digitoEsperado = String(resto);
    }

    // Comparamos el dígito ingresado con el calculado.
    return digitoVerificador === digitoEsperado;
}


// ------------------------------------------------------------
// 3. FORMULARIO DE REGISTRO
// ------------------------------------------------------------
// El "?." permite que el código funcione aunque esta página
// no tenga un formulario llamado registroForm.
document.getElementById("registroForm")?.addEventListener("submit", function(event) {

    // Evitamos que el formulario recargue o cambie la página.
    event.preventDefault();

    // Obtenemos los datos escritos por el usuario.
    let correo = document.getElementById("correo").value;
    let run = document.getElementById("run").value;
    let mensaje = document.getElementById("registroMensaje");

    // Primero validamos el correo.
    if (!validarCorreo(correo)) {
        mensaje.textContent =
            "Correo no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com";
        return;
    }

    // Después validamos el RUN.
    if (!validarRUN(run)) {
        mensaje.textContent = "El RUN ingresado no es válido.";
        return;
    }

    // Si ambas validaciones fueron correctas.
    mensaje.textContent = "Registro validado correctamente.";
});


// ------------------------------------------------------------
// 4. FORMULARIO DE LOGIN
// ------------------------------------------------------------
document.getElementById("loginForm")?.addEventListener("submit", function(event) {

    // Evitamos el envío normal del formulario.
    event.preventDefault();

    // Obtenemos el correo escrito.
    let correo = document.getElementById("loginCorreo").value;
    let mensaje = document.getElementById("loginMensaje");

    // Validamos el correo y mostramos el resultado.
    if (validarCorreo(correo)) {
        mensaje.textContent = "Inicio de sesión validado correctamente.";

        if (new URLSearchParams(window.location.search).get("redirect") === "admin") {
            window.location.href = "admin/admin_index.html";
        }
    } else {
        mensaje.textContent = "Correo no permitido.";
    }
});


// ------------------------------------------------------------
// 5. FORMULARIO DE CONTACTO
// ------------------------------------------------------------
document.getElementById("contactoForm")?.addEventListener("submit", function(event) {

    // Evitamos el envío normal del formulario.
    event.preventDefault();

    // Obtenemos los datos ingresados.
    let correo = document.getElementById("contactCorreo").value;
    let comentario = document.getElementById("comentario").value;
    let mensaje = document.getElementById("contactoMensaje");

    // Validamos que el correo sea correcto y que exista un comentario.
    if (validarCorreo(correo) && comentario.trim().length > 0) {
        mensaje.textContent = "Mensaje enviado correctamente.";
    } else {
        mensaje.textContent = "Revisa el correo y el comentario.";
    }
});
