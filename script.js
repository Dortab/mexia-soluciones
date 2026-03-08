document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', function() {
            // Alterna la clase 'active' para mostrar/ocultar el menú
            navList.classList.toggle('active');
            // Alterna la clase 'is-active' para la animación de la hamburguesa a X
            mobileMenu.classList.toggle('is-active');
        });

        // Cerrar el menú automáticamente al hacer clic en cualquier enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }

    // --- 2. SMOOTH SCROLL (Navegación suave para anclas #) ---
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

    // --- 3. MATRIX ANIMATION (Efecto de fondo en el Hero) ---
    const canvas = document.getElementById('matrix-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        
        const chars = "MEXIA011010IAWEB"; 
        const charArray = chars.split('');
        const fontSize = 16;

        function initMatrix() {
            // Ajustar el canvas al tamaño del contenedor padre (Hero)
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            columns = Math.ceil(width / fontSize);
            drops = [];
            
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * (height / fontSize); 
            }
        }

        function draw() {
            // Estela de rastro: color oscuro con opacidad baja
            ctx.fillStyle = 'rgba(26, 16, 60, 0.1)'; 
            ctx.fillRect(0, 0, width, height);
            
            // Color de los caracteres (Verde MEXIA)
            ctx.fillStyle = '#00C9A7'; 
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reinicio aleatorio de la gota al llegar al final
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Inicializar y ajustar si se cambia el tamaño de la ventana
        initMatrix();
        window.addEventListener('resize', initMatrix);

        // Ejecutar animación (20 cuadros por segundo aprox.)
        setInterval(draw, 50); 
    }
});