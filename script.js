document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SMOOTH SCROLL (Navegación suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Evitar errores con enlaces vacíos
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) { 
                targetElement.scrollIntoView({ behavior: 'smooth' }); 
            }
        });
    });

    // 2. MATRIX ANIMATION (Optimizada y Responsiva)
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        
        // Configuración de caracteres Matrix
        const chars = "MEXIA011010IAWEB"; 
        const charArray = chars.split('');
        const fontSize = 16;

        // Función para inicializar/reiniciar el canvas
        function initMatrix() {
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            columns = Math.ceil(width / fontSize);
            drops = [];
            
            // Llenar el arreglo de gotas
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * height; // Iniciar en posiciones aleatorias para que se vea natural
            }
        }

        function draw() {
            // Fondo semitransparente para dejar estela
            ctx.fillStyle = 'rgba(26, 16, 60, 0.1)'; 
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = '#00C9A7'; // Color verde neón
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reiniciar la gota al llegar al final de forma aleatoria
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Iniciar
        initMatrix();
        setInterval(draw, 50); // Velocidad de caída

        // Evento Resize: Ajustar canvas si cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
            initMatrix();
        });
    }
});