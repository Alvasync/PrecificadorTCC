/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        document.body.style.overflow = 'hidden'
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        document.body.style.overflow = ''
    })
}

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
if(searchBtn){
    searchBtn.addEventListener('click', () => {
        search.classList.add('show-search')
        document.body.style.overflow = 'hidden'
    })
}

/* Search hidden */
if(searchClose){
    searchClose.addEventListener('click', () => {
        search.classList.remove('show-search')
        document.body.style.overflow = ''
    })
}

/* Fechar search ao clicar fora */
search.addEventListener('click', (e) => {
    if (e.target === search) {
        search.classList.remove('show-search')
        document.body.style.overflow = ''
    }
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close'),
      loginForm = document.getElementById('loginForm')

/* Login show */
if(loginBtn){
    loginBtn.addEventListener('click', () => {
        login.classList.add('show-login')
        document.body.style.overflow = 'hidden'
    })
}

/* Login hidden */
if(loginClose){
    loginClose.addEventListener('click', () => {
        login.classList.remove('show-login')
        document.body.style.overflow = ''
    })
}

/* Fechar login ao clicar fora da caixa (apenas se clicar no fundo do modal) */
login.addEventListener('click', (e) => {
    if (e.target === login) {
        login.classList.remove('show-login')
        document.body.style.overflow = ''
    }
})

/*=============== THEME TOGGLE ===============*/
const themeToggle = document.getElementById('theme-toggle')
const body = document.body

// Verifica se existe um tema salvo
const selectedTheme = localStorage.getItem('selected-theme')

// Aplica o tema salvo ou o padrão
if (selectedTheme) {
    body.setAttribute('data-theme', selectedTheme)
} else {
    // Verifica se o usuário prefere tema escuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
}

// Toggle do tema
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    
    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('selected-theme', newTheme)
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(`.nav__list a[href*="${sectionId}"]`).parentElement.classList.add('active')
        } else {
            document.querySelector(`.nav__list a[href*="${sectionId}"]`).parentElement.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up')
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll')
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.juice-text')
sr.reveal('.photos', {delay: 600})
sr.reveal('.juice-wheel', {delay: 800})
sr.reveal('.fruits-wheel', {delay: 1000})

/*=============== IMAGENS DINÂMICAS ===============*/
const photos = document.querySelectorAll('.juice-wrapper')

photos.forEach(photo => {
    photo.addEventListener('click', () => {
        // Remove a classe active de todas as fotos
        photos.forEach(p => p.classList.remove('activePhoto'))
        // Adiciona a classe active na foto clicada
        photo.classList.add('activePhoto')
    })
})

/*=============== FLASH MESSAGE CLOSE ===============*/
document.querySelectorAll('.flash-close').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.remove();
    });
});

/*=============== SEARCH SUGGESTIONS ===============*/
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');

const navItems = [
    { name: 'Início', id: 'home' },
    { name: 'Precificar', id: 'precificador' },
    { name: 'Sobre', id: 'sobre' },
    { name: 'Contato', id: 'contato' }
];

searchInput.addEventListener('input', function() {
    const value = this.value.trim().toLowerCase();
    if (!value) {
        searchSuggestions.style.display = 'none';
        searchSuggestions.innerHTML = '';
        return;
    }
    const filtered = navItems.filter(item => item.name.toLowerCase().includes(value));
    if (filtered.length === 0) {
        searchSuggestions.style.display = 'none';
        searchSuggestions.innerHTML = '';
        return;
    }
    searchSuggestions.innerHTML = filtered.map(item => `<div class="search__suggestion" data-id="${item.id}" style="padding:0.75rem 1rem;cursor:pointer;">${item.name}</div>`).join('');
    searchSuggestions.style.display = 'block';
});

searchSuggestions.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('search__suggestion')) {
        const id = e.target.getAttribute('data-id');
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            search.classList.remove('show-search');
            document.body.style.overflow = '';
            searchSuggestions.style.display = 'none';
            searchInput.value = '';
        }
    }
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const value = this.value.trim().toLowerCase();
        const found = navItems.find(item => item.name.toLowerCase().includes(value));
        if (found) {
            const section = document.getElementById(found.id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                search.classList.remove('show-search');
                document.body.style.overflow = '';
                searchSuggestions.style.display = 'none';
                searchInput.value = '';
            }
        }
    }
});

// Esconde sugestões ao clicar fora
searchInput.addEventListener('blur', function() {
    setTimeout(() => { searchSuggestions.style.display = 'none'; }, 150);
});

document.addEventListener('DOMContentLoaded', function() {
    /*=============== LUPA - BUSCA INTELIGENTE ISOLADA ===============*/
    (function() {
        const searchInput = document.getElementById('search-input');
        const searchSuggestions = document.getElementById('search-suggestions');
        const searchModal = document.getElementById('search');
        if (!searchInput || !searchSuggestions || !searchModal) return;

        const navItemsLupa = [
            { name: 'Início', id: 'home' },
            { name: 'Precificar', id: 'precificador' },
            { name: 'Sobre', id: 'sobre' },
            { name: 'Contato', id: 'contato' }
        ];

        searchInput.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();
            if (!value) {
                searchSuggestions.style.display = 'none';
                searchSuggestions.innerHTML = '';
                return;
            }
            const filtered = navItemsLupa.filter(item => item.name.toLowerCase().includes(value));
            if (filtered.length === 0) {
                searchSuggestions.style.display = 'none';
                searchSuggestions.innerHTML = '';
                return;
            }
            searchSuggestions.innerHTML = filtered.map(item => `<div class="search__suggestion" data-id="${item.id}" style="padding:0.75rem 1rem;cursor:pointer;">${item.name}</div>`).join('');
            searchSuggestions.style.display = 'block';
        });

        searchSuggestions.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('search__suggestion')) {
                const id = e.target.getAttribute('data-id');
                const section = document.getElementById(id);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    searchModal.classList.remove('show-search');
                    document.body.style.overflow = '';
                    searchSuggestions.style.display = 'none';
                    searchInput.value = '';
                }
            }
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = this.value.trim().toLowerCase();
                const found = navItemsLupa.find(item => item.name.toLowerCase().includes(value));
                if (found) {
                    const section = document.getElementById(found.id);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        searchModal.classList.remove('show-search');
                        document.body.style.overflow = '';
                        searchSuggestions.style.display = 'none';
                        searchInput.value = '';
                    }
                }
            }
        });

        searchInput.addEventListener('focus', function() {
            // Mostra todas as sugestões ao focar, se o campo estiver vazio
            if (!this.value.trim()) {
                searchSuggestions.innerHTML = navItemsLupa.map(item => `<div class="search__suggestion" data-id="${item.id}" style="padding:0.75rem 1rem;cursor:pointer;">${item.name}</div>`).join('');
                searchSuggestions.style.display = 'block';
            }
        });

        searchInput.addEventListener('blur', function() {
            setTimeout(() => { searchSuggestions.style.display = 'none'; }, 150);
        });
    })();

    var ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            var precificadorSection = document.getElementById('precificador');
            if (precificadorSection) {
                precificadorSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});