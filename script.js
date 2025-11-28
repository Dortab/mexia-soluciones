document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SMOOTH SCROLL (Desplazamiento suave para enlaces ancla)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // 2. MATRIX ANIMATION (Solo funciona si existe el canvas en la página)
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const chars = "MEXIA01"; 
        const charArray = chars.split('');
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);
        let drops = [];
        for (let x = 0; x < columns; x++) { drops[x] = 1; }

        function draw() {
            ctx.fillStyle = 'rgba(26, 16, 60, 0.05)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00C9A7'; 
            ctx.font = fontSize + 'px arial';
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
                drops[i]++;
            }
        }
        setInterval(draw, 50); 
    }

    // 3. SISTEMA DE CONTRASEÑA (Solo para videos.html)
    const btnDesbloquear = document.getElementById('btnDesbloquear');
    if (btnDesbloquear) {
        const inputPass = document.getElementById('passwordInput');
        const zonaCandado = document.getElementById('zona-candado');
        const zonaVideo = document.getElementById('zona-video');
        const errorMsg = document.getElementById('errorMsg');

        // --- CONTRASEÑA DEFINIDA ---
        const PASSWORD_CORRECTO = "MEXIA2025";

        function verificarPassword() {
            if (inputPass.value === PASSWORD_CORRECTO) {
                // Correcto: Ocultamos candado, mostramos video
                zonaCandado.style.display = 'none';
                zonaVideo.style.display = 'block';
                // Iniciamos el video automáticamente
                const video = document.getElementById('myVideo');
                if(video) video.play();
            } else {
                // Incorrecto
                errorMsg.style.display = 'block';
                inputPass.classList.add('shake'); // Agrega vibración
                setTimeout(() => inputPass.classList.remove('shake'), 500); // Quita vibración
            }
        }

        // Clic en el botón
        btnDesbloquear.addEventListener('click', verificarPassword);

        // Permitir dar Enter en el input
        inputPass.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verificarPassword();
            }
        });
    }

    // 4. REPRODUCTOR DE VIDEO (Lógica Play/Pause)
    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    // Solo ejecutamos si existen los elementos (para no dar error en otras páginas)
    if (video && playPauseBtn) {
        function togglePlayPause() {
            if (video.paused || video.ended) {
                video.play();
                playPauseBtn.textContent = '⏸️ Pausar';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶️ Reproducir';
            }
        }
        
        playPauseBtn.addEventListener('click', togglePlayPause);
        
        // Eventos nativos del video
        video.addEventListener('play', () => playPauseBtn.textContent = '⏸️ Pausar');
        video.addEventListener('pause', () => playPauseBtn.textContent = '▶️ Reproducir');
        video.addEventListener('ended', () => playPauseBtn.textContent = '▶️ Reproducir');
    }
});