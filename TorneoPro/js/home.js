
const TIEMPO_IMAGEN = 5000;       // cuánto dura cada imagen (5 segundos)
const TIEMPO_MAXIMO_VIDEO = 20000; // por si el video no termina nunca
const VELOCIDAD_MOVIMIENTO = 900;  // duración del desplazamiento (igual que en el CSS)
 
const diapositivas = Array.from(document.querySelectorAll('.diapositiva'));
let actual = 0;
 
if (diapositivas.length > 1) {
 
    diapositivas[0].classList.add('activa');
    programar();
 
    // Espera el tiempo correcto según la diapositiva y luego avanza
    function programar() {
        const video = diapositivas[actual].querySelector('video');
        const tieneVideo = video && (video.getAttribute('src') || video.querySelector('source'));
        let ya = false;
        let temporizador;
 
        const siguiente = () => {
            if (ya) return;
            ya = true;
            clearTimeout(temporizador);
            if (video) video.removeEventListener('ended', siguiente);
            avanzar();
        };
 
        if (tieneVideo) {
            video.currentTime = 0;
            video.play().catch(() => {});
            video.addEventListener('ended', siguiente);
            temporizador = setTimeout(siguiente, TIEMPO_MAXIMO_VIDEO);
        } else {
            temporizador = setTimeout(siguiente, TIEMPO_IMAGEN);
        }
    }
 
    // Mueve la diapositiva actual a la derecha y entra la siguiente por la izquierda
    function avanzar() {
        const saliente = diapositivas[actual];
        const indiceNuevo = (actual + 1) % diapositivas.length;
        const entrante = diapositivas[indiceNuevo];
 
        // La entrante empieza a la izquierda, sin animación
        entrante.classList.remove('animar', 'saliendo', 'activa');
        void entrante.offsetWidth; // fuerza a que se aplique la posición
 
        // Las dos se mueven a la vez hacia la derecha
        saliente.classList.add('animar', 'saliendo');
        saliente.classList.remove('activa');
        entrante.classList.add('animar', 'activa');
 
        actual = indiceNuevo;
 
        setTimeout(() => {
            saliente.classList.remove('animar', 'saliendo');
            entrante.classList.remove('animar');
 
            const videoSaliente = saliente.querySelector('video');
            if (videoSaliente) videoSaliente.pause();
 
            programar();
        }, VELOCIDAD_MOVIMIENTO);
    }
}