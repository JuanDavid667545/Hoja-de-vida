// --- Typewriter Effect ---
const textElement = document.getElementById('typewriter-text');
const phrases = [
    "Desarrollador Front-end",
    "Tecnólogo en Desarrollo de Software",
    "Actualmente estudiando Ingenieria de Sistemas"
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

// Global function for Gmail compose popup
window.openGmailCompose = function(email) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        window.location.href = `mailto:${email}`;
    } else {
        const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;
        const width = 600;
        const height = 600;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        window.open(
            url, 
            '_blank', 
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,noopener,noreferrer`
        );
    }
}
