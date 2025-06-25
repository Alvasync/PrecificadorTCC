document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelectorAll('.nav__list .list');
    const sections = document.querySelectorAll('section[id]');
    
    // Ativar seção no scroll
    function scrollActive() {
        const scrollY = window.pageYOffset;
        const windowBottom = scrollY + window.innerHeight;
        
        sections.forEach((current, idx) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // ajuste maior para header
            const sectionId = current.getAttribute('id');
            const isLast = idx === sections.length - 1;
            
            // Para a última seção, considere ativa se chegou ao final da página
            if (
                (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) ||
                (isLast && windowBottom >= document.body.scrollHeight)
            ) {
                document.querySelector('.nav__list .list a[href*=' + sectionId + ']')
                    .parentElement.classList.add('active');
            } else {
                document.querySelector('.nav__list .list a[href*=' + sectionId + ']')
                    .parentElement.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);
    
    // Scroll suave ao clicar nos links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Ativa o item do menu imediatamente ao clicar
            list.forEach(item => item.classList.remove('active'));
            this.closest('.list').classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                // Força atualização do menu após o scroll suave
                setTimeout(scrollActive, 500);
            }
        });
    });
});