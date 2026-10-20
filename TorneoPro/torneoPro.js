
/* CARRUSEL AUTOMÁTICO */

const diapositivas = document.querySelectorAll(".diapositiva");

let posicionActual = 0;

function cambiarDiapositiva() {

    // Ocultar la diapositiva actual
    diapositivas[posicionActual].classList.remove("activa");

    // Pasar a la siguiente
    posicionActual++;

    // Volver a la primera al terminar
    if (posicionActual >= diapositivas.length) {
        posicionActual = 0;
    }

    // Mostrar la nueva diapositiva
    diapositivas[posicionActual].classList.add("activa");
}

// Cambiar cada 5 segundos
setInterval(cambiarDiapositiva, 5000);
