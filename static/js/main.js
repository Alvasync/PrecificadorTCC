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

/*=============== ACTIVE LINK ===============*/
const navLinks = document.querySelectorAll('.nav__link')

function linkAction(){
    navLinks.forEach(n => n.classList.remove('active-link'))
    this.classList.add('active-link')
    
    // Quando clicar em um link do menu, fechar o menu em modo mobile
    navMenu.classList.remove('show-menu')
}

navLinks.forEach(n => n.addEventListener('click', linkAction))

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

/* Fechar login ao clicar fora */
login.addEventListener('click', (e) => {
    if (e.target === login) {
        login.classList.remove('show-login')
        document.body.style.overflow = ''
    }
})

/* Login form submission */
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        // Remove mensagens antigas
        const oldMessages = document.querySelectorAll('.login-message')
        oldMessages.forEach(msg => msg.remove())
        
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        
        if (!username || !password) {
            showMessage('Por favor, preencha todos os campos', 'error')
            return
        }
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Para Django
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()
            
            if (response.ok) {
                showMessage('Login realizado com sucesso!', 'success')
                
                setTimeout(() => {
                    login.classList.remove('show-login')
                    document.body.style.overflow = ''
                    
                    // Atualiza a interface para usuário logado
                    document.body.classList.add('logged-in')
                    loginBtn.innerHTML = '<i class="ri-user-fill"></i>'
                    
                    // Redireciona para a página principal
                    window.location.href = '/'
                }, 1500)
            } else {
                showMessage(data.message || 'Erro ao fazer login. Verifique suas credenciais.', 'error')
            }
        } catch (error) {
            console.error('Erro:', error)
            showMessage('Erro ao conectar com o servidor. Tente novamente mais tarde.', 'error')
        }
    })
}

/* Função auxiliar para mostrar mensagens */
function showMessage(text, type) {
    const message = document.createElement('div')
    message.className = `login-message ${type}`
    message.textContent = text
    document.body.appendChild(message)
    
    setTimeout(() => {
        message.remove()
    }, type === 'success' ? 1500 : 3000)
}

/* Função auxiliar para obter cookies (necessário para CSRF token no Django) */
function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

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