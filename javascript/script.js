// --- Typewriter Effect ---
const textElement = document.getElementById('typewriter-text');
const phrases = [
    "Hola soy Juan David",
    "Tecnólogo en desarrollo de software",
    "Actualmente estudiando ingeniería de sistemas"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Borrando
        textElement.innerHTML = currentPhrase.substring(0, charIndex - 1) + '<span class="typewriter-cursor"></span>';
        charIndex--;
    } else {
        // Escribiendo
        textElement.innerHTML = currentPhrase.substring(0, charIndex + 1) + '<span class="typewriter-cursor"></span>';
        charIndex++;
    }

    // Velocidad de escritura/borrado
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Frase completa, esperar antes de borrar
        isWaiting = true;
        typeSpeed = 2000; // Esperar 2 segundos
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Borrado completo, pasar a siguiente frase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pequeña pausa antes de empezar a escribir de nuevo
    }

    setTimeout(typeEffect, typeSpeed);
}

// Iniciar efecto de escritura
document.addEventListener('DOMContentLoaded', typeEffect);
