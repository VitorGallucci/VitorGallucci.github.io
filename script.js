// JavaScript para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Navegação suave
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Atualizar link ativo
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Fechar menu mobile após clique
            menu.classList.remove('active');
        });
    });
    
    // Atualizar link ativo ao rolar
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Modal para imagens
    const modalImagem = document.getElementById('modal-imagem');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const btnAmpliar = document.querySelectorAll('.btn-ampliar');
    const fecharModal = document.querySelector('.fechar-modal');
    
    btnAmpliar.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.closest('.design-card').querySelector('img').src;
            const imgTitle = this.closest('.design-card').querySelector('h3').textContent;
            
            modalImg.src = imgSrc;
            modalCaption.textContent = imgTitle;
            modalImagem.style.display = 'flex';
            
            document.body.style.overflow = 'hidden';
        });
    });
    
    fecharModal.addEventListener('click', function() {
        modalImagem.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modalImagem) {
            modalImagem.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Animações ao rolar
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.secao, .destaque-card, .site-card, .video-card, .design-card, .resumo-secao');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});