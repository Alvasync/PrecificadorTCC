const juiceArray = document.querySelectorAll(".juice-wrapper");
const titleElement = document.querySelector("#landing-title");
const descriptionElement = document.querySelector(".juice-info");
const juiceWheel = document.querySelector(".juice-wheel");
const fruitsWheel = document.querySelector(".fruits-wheel");
const juiceTextContainer = document.querySelector(".juice-text");
const photos = document.querySelectorAll('.juice-wrapper');

let currentJuice = juiceArray[0];
let deg = -45;

// Dados dos imóveis (substituindo sucos/frutas) - Cores ajustadas para harmonizar
const propertyData = [
  {
    name: "Casa Moderna",
    description:
      "Casa espaçosa com design moderno, 3 quartos, piscina e área de lazer. Perfeita para sua família em Jacareí.",
    details: {
      area: "250m²",
      quartos: "3 quartos (2 suítes)",
      banheiros: "3 banheiros",
      garagem: "2 vagas",
      terreno: "360m²"
    },
    // Gradiente de azul harmonizado com o tema
    backgroundColor:
      "linear-gradient(90deg, hsl(230, 75%, 60%) 0%, hsl(230, 75%, 45%) 35%, hsl(230, 75%, 25%) 100%)",
  },
  {
    name: "Terreno Residencial",
    description:
      "Ótimo terreno plano em condomínio fechado, ideal para construir a casa dos seus sonhos com segurança e privacidade.",
    details: {
      area: "450m²",
      topografia: "Plano",
      infraestrutura: "Água, Luz, Esgoto",
      condominio: "R$ 350/mês",
      documentacao: "Escritura registrada"
    },
    // Gradiente de verde-azulado para dar contraste, mas ainda harmonizado
    backgroundColor:
      "linear-gradient(90deg, hsl(180, 70%, 50%) 0%, hsl(180, 70%, 35%) 35%, hsl(180, 70%, 15%) 100%)",
  },
  {
    name: "Apartamento de Luxo",
    description:
      "Apartamento de alto padrão no centro de Jacareí, com 2 suítes, vista panorâmica e infraestrutura completa de lazer.",
    details: {
      area: "120m²",
      quartos: "2 suítes",
      banheiros: "3 banheiros",
      garagem: "2 vagas",
      condominio: "R$ 850/mês",
      lazer: "Academia, Piscina, Churrasqueira"
    },
    // Gradiente de roxo/magenta, com a base em azul para harmonizar
    backgroundColor:
      "linear-gradient(90deg, hsl(270, 70%, 60%) 0%, hsl(270, 70%, 45%) 35%, hsl(270, 70%, 25%) 100%)",
  },
  {
    name: "Imóvel Comercial",
    description:
      "Excelente ponto comercial em avenida movimentada, ideal para escritórios ou lojas, com grande fluxo de clientes.",
    details: {
      area: "180m²",
      pavimentos: "2 andares",
      banheiros: "4 banheiros",
      estacionamento: "5 vagas",
      vitrine: "8 metros",
      zoneamento: "Comercial"
    },
    // Gradiente de laranja/dourado, com a base em azul para harmonizar
    backgroundColor:
      "linear-gradient(90deg, hsl(30, 80%, 60%) 0%, hsl(30, 80%, 45%) 35%, hsl(30, 80%, 25%) 100%)",
  },
];

juiceArray.forEach((element, index) => {
  element.addEventListener("click", () => {
    document.querySelector(".main-landing-page-container").style.background = // Alterado para o novo seletor
      propertyData[index].backgroundColor;
    
    deg = deg - 90;
    juiceWheel.style.transform = `rotate(${deg}deg)`;
    fruitsWheel.style.transform = `rotate(${deg}deg)`;

    // Atualiza o título e descrição
    titleElement.innerHTML = propertyData[index].name;
    
    // Cria a descrição com os detalhes
    let detailsHTML = propertyData[index].description + "<br><br><strong>Detalhes do Imóvel:</strong><ul>";
    for (let key in propertyData[index].details) {
      detailsHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${propertyData[index].details[key]}</li>`;
    }
    detailsHTML += "</ul>";
    descriptionElement.innerHTML = detailsHTML;

    if (currentJuice) {
      currentJuice.classList.remove("activePhoto");
    }
    element.classList.add("activePhoto");
    currentJuice = element;

    juiceTextContainer.classList.add("fade-in");
    setTimeout(() => {
      juiceTextContainer.classList.remove("fade-in");
    }, 1000);
  });
});

// Função para inicializar o primeiro item
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o background inicial é aplicado à div .main-landing-page-container
    const landingPageContainer = document.querySelector(".main-landing-page-container");
    if (propertyData.length > 0 && landingPageContainer) {
        landingPageContainer.style.background = propertyData[0].backgroundColor;
    }

    // Garante que o primeiro item do menu de navegação esteja ativo visualmente
    // Isso pode ser movido para magic-navigation-menu-indicator.js se já não estiver lá
    const firstNavLink = document.querySelector('.nav__list li:first-child');
    if (firstNavLink && !firstNavLink.classList.contains('active')) {
        firstNavLink.classList.add('active');
    }

});

/*=============== IMAGENS DINÂMICAS ===============*/
// Função para atualizar as imagens ativas e detalhes
function updateActiveImages(index) {
    // Remove a classe active de todas as fotos
    photos.forEach(photo => photo.classList.remove('activePhoto'));
    
    // Adiciona a classe active na foto clicada
    photos[index].classList.add('activePhoto');
    
    // Atualiza o background
    document.querySelector(".main-landing-page-container").style.background = 
      propertyData[index].backgroundColor;
    
    // Atualiza a rotação
    deg = -45 - (90 * index);
    juiceWheel.style.transform = `rotate(${deg}deg)`;
    fruitsWheel.style.transform = `rotate(${deg}deg)`;
    
    // Atualiza o título e descrição
    titleElement.innerHTML = propertyData[index].name;
    
    // Cria a descrição com os detalhes
    let detailsHTML = propertyData[index].description + "<br><br><strong>Detalhes do Imóvel:</strong><ul>";
    for (let key in propertyData[index].details) {
        detailsHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${propertyData[index].details[key]}</li>`;
    }
    detailsHTML += "</ul>";
    descriptionElement.innerHTML = detailsHTML;
    
    // Adiciona animação de fade
    juiceTextContainer.classList.add("fade-in");
    setTimeout(() => {
        juiceTextContainer.classList.remove("fade-in");
    }, 1000);
}

// Adiciona evento de clique em cada foto
photos.forEach((photo, index) => {
    photo.addEventListener('click', () => {
        updateActiveImages(index);
    });
});

// Rotação automática das imagens
let currentIndex = 0;
const totalPhotos = photos.length;

function rotateImages() {
    currentIndex = (currentIndex + 1) % totalPhotos;
    updateActiveImages(currentIndex);
}

// Inicia a rotação automática
let rotationInterval = setInterval(rotateImages, 5000);

// Para a rotação quando o mouse está sobre as imagens
const photosContainer = document.getElementById('static-images-container');
if (photosContainer) {
    photosContainer.addEventListener('mouseenter', () => {
        clearInterval(rotationInterval);
    });
    
    photosContainer.addEventListener('mouseleave', () => {
        rotationInterval = setInterval(rotateImages, 5000);
    });
}

// Atualiza as imagens quando a página carrega
window.addEventListener('load', () => {
    updateActiveImages(0);
});