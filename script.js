document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE SMOOTH SCROLL (Para anclas) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- LÓGICA DE ANIMACIÓN MATRIX ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Ajustar el tamaño del canvas al de la sección Hero
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const chars = "MEXIA01"; // Personalizado
        const charArray = chars.split('');
        
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);

        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            // Fondo semi-transparente para crear el efecto "estela"
            ctx.fillStyle = 'rgba(26, 16, 60, 0.05)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Color de los caracteres (Verde de la Opción D)
            ctx.fillStyle = '#00C9A7'; 
            ctx.font = fontSize + 'px arial';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Iniciar la animación
        setInterval(draw, 50); 
    }
});