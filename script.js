document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MENÚ MÓVIL (Corrección solicitada) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navLinks) {
        // Alternar menú al hacer clic en la hamburguesa
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active'); // Para animación de la X si la agregaste
        });

        // Cerrar el menú al hacer clic en cualquier enlace (importante en móviles)
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });

        // Cerrar menú si se hace clic fuera de la navegación
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        });
    }

    // --- 2. SMOOTH SCROLL (Navegación suave) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) { 
                targetElement.scrollIntoView({ behavior: 'smooth' }); 
            }
        });
    });

    // --- 3. MATRIX ANIMATION (Optimizada y Responsiva) ---
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        
        // Configuración de caracteres Matrix
        const chars = "MEXIA011010IAWEB"; 
        const charArray = chars.split('');
        const fontSize = 16;

        function initMatrix() {
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            columns = Math.ceil(width / fontSize);
            drops = [];
            
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * height; 
            }
        }

        function draw() {
            ctx.fillStyle = 'rgba(26, 16, 60, 0.1)'; 
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = '#00C9A7'; 
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        initMatrix();
        window.addEventListener('resize', initMatrix); // Ajustar si cambia el tamaño de pantalla
        setInterval(draw, 50); 
    }
});