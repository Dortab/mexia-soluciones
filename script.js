document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // 2. MATRIX ANIMATION
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

    // 3. SISTEMA DE CONTRASEÑA
    const btnDesbloquear = document.getElementById('btnDesbloquear');
    if (btnDesbloquear) {
        const inputPass = document.getElementById('passwordInput');
        const zonaCandado = document.getElementById('zona-candado');
        const zonaVideo = document.getElementById('zona-video');
        const errorMsg = document.getElementById('errorMsg');

        // CLAVE DE ACCESO
        const PASSWORD_CORRECTO = "MEXIA2025";

        function verificarPassword() {
            if (inputPass.value === PASSWORD_CORRECTO) {
                zonaCandado.style.display = 'none';
                zonaVideo.style.display = 'block'; 
            } else {
                errorMsg.style.display = 'block';
                inputPass.classList.add('shake');
                setTimeout(() => inputPass.classList.remove('shake'), 500);
            }
        }

        btnDesbloquear.addEventListener('click', verificarPassword);
        inputPass.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') { verificarPassword(); }
        });
    }

    // 4. CONTROLADOR DE GALERÍA DE VIDEOS
    function setupVideoPlayer(videoId, btnId) {
        const video = document.getElementById(videoId);
        const btn = document.getElementById(btnId);

        if (video && btn) {
            function togglePlay() {
                if (video.paused || video.ended) {
                    // Pausar cualquier otro video que se esté reproduciendo
                    document.querySelectorAll('video').forEach(v => {
                        if (v !== video) v.pause();
                    });
                    
                    video.play();
                    btn.textContent = '⏸️ Pausar';
                } else {
                    video.pause();
                    btn.textContent = '▶️ Reproducir';
                }
            }
            btn.addEventListener('click', togglePlay);
            
            video.addEventListener('play', () => btn.textContent = '⏸️ Pausar');
            video.addEventListener('pause', () => btn.textContent = '▶️ Reproducir');
            video.addEventListener('ended', () => btn.textContent = '▶️ Reproducir');
        }
    }

    // --- CONFIGURACIÓN DE LOS 4 VIDEOS ---
    setupVideoPlayer('video_inst', 'btn_inst');
    setupVideoPlayer('video_p1', 'btn_p1');
    setupVideoPlayer('video_p2', 'btn_p2');
    setupVideoPlayer('video_p3', 'btn_p3'); // Nuevo video
});