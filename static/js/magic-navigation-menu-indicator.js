document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelectorAll('.nav__list .list');
    const sections = document.querySelectorAll('section[id]');
    
    function activeLink() {
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
    }
    
    list.forEach((item) => item.addEventListener('click', activeLink));
    
    // Ativar seção no scroll
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
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
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});