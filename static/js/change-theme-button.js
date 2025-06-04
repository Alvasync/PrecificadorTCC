// Este import 'tweakpane' precisa de uma conexão com a internet ou da biblioteca instalada
// Para simplificar e focar na funcionalidade principal, vamos remover a dependência de 'tweakpane'
// import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4';

const config = {
  theme: 'dark' // Tema inicial
};

const update = () => {
  document.documentElement.dataset.theme = config.theme;
};

// Comentado a função sync, pois ela era ativada pelo Tweakpane
// const sync = event => {
//   update();
// };

// --- Injeção do HTML do Botão de Tema ---
const themeToggleButtonContainer = document.getElementById('theme-toggle-button-container');
if (themeToggleButtonContainer) {
    themeToggleButtonContainer.innerHTML = `
        <button aria-pressed="false" class="toggle">
            <div class="socket">
                <div class="socket-shadow"></div>
            </div>
            <div class="face">
                <div class="face-shadow"></div>
                <div class="face-glowdrop"></div>
                <div class="face-plate"></div>
                <div class="face-shine">
                    <div class="face-shine-shadow"></div>
                </div>
                <div class="face-glows"><div></div></div>
                <svg
                    class="glow"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        class="glow-path"
                        d="M9.8815 1.36438L9.88141 1.36429C9.70639 1.18942 9.48342 1.07041 9.24073 1.02235C8.99803 0.974286 8.74653 0.999323 8.51808 1.09429L8.51753 1.09452C4.54484 2.75146 1.75 6.6732 1.75 11.25C1.75 17.3262 6.67489 22.25 12.75 22.25C14.9217 22.2501 17.0448 21.6075 18.852 20.4032C20.6591 19.1989 22.0695 17.4868 22.9055 15.4825L22.9058 15.4818C23.0007 15.2532 23.0256 15.0015 22.9774 14.7587C22.9291 14.5159 22.8099 14.2929 22.6348 14.118C22.4597 13.9431 22.2366 13.8241 21.9937 13.7761C21.7509 13.7281 21.4993 13.7533 21.2708 13.8484L21.2707 13.8485C20.2346 14.2801 19.1231 14.5016 18.0007 14.5H18C15.7457 14.5 13.5837 13.6045 11.9896 12.0104C10.3955 10.4163 9.5 8.25433 9.5 5.99999L9.5 5.99927C9.49838 4.8769 9.71983 3.76541 10.1515 2.72938C10.2468 2.50072 10.2721 2.24888 10.224 2.00584C10.1759 1.76281 10.0567 1.53954 9.8815 1.36438Z"
                        stroke-width="0"
                    />
                </svg>
                <svg
                    class="trail-holder"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        class="trail"
                        d="M9.8815 1.36438L9.88141 1.36429C9.70639 1.18942 9.48342 1.07041 9.24073 1.02235C8.99803 0.974286 8.74653 0.999323 8.51808 1.09429L8.51753 1.09452C4.54484 2.75146 1.75 6.6732 1.75 11.25C1.75 17.3262 6.67489 22.25 12.75 22.25C14.9217 22.2501 17.0448 21.6075 18.852 20.4032C20.6591 19.1989 22.0695 17.4868 22.9055 15.4825L22.9058 15.4818C23.0007 15.2532 23.0256 15.0015 22.9774 14.7587C22.9291 14.5159 22.8099 14.2929 22.6348 14.118C22.4597 13.9431 22.2366 13.8241 21.9937 13.7761C21.7509 13.7281 21.4993 13.7533 21.2708 13.8484L21.2707 13.8485C20.2346 14.2801 19.1231 14.5016 18.0007 14.5H18C15.7457 14.5 13.5837 13.6045 11.9896 12.0104C10.3955 10.4163 9.5 8.25433 9.5 5.99999L9.5 5.99927C9.49838 4.8769 9.71983 3.76541 10.1515 2.72938C10.2468 2.50072 10.2721 2.24888 10.224 2.00584C10.1759 1.76281 10.0567 1.53954 9.8815 1.36438Z"
                        stroke="#2CC6FE"
                        stroke-linecap="round"
                        stroke-dasharray="7 80"
                        stroke-dashoffset="40"
                    />
                </svg>
                <svg
                    class="main"
                    viewBox="0 0 24 24" /* Ajustado para 24 24 */
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path
                            class="outline"
                            class="stroke"
                            d="M9.8815 1.36438L9.88141 1.36429C9.70639 1.18942 9.48342 1.07041 9.24073 1.02235C8.99803 0.974286 8.74653 0.999323 8.51808 1.09429L8.51753 1.09452C4.54484 2.75146 1.75 6.6732 1.75 11.25C1.75 17.3262 6.67489 22.25 12.75 22.25C14.9217 22.2501 17.0448 21.6075 18.852 20.4032C20.6591 19.1989 22.0695 17.4868 22.9055 15.4825L22.9058 15.4818C23.0007 15.2532 23.0256 15.0015 22.9774 14.7587C22.9291 14.5159 22.8099 14.2929 22.6348 14.118C22.4597 13.9431 22.2366 13.8241 21.9937 13.7761C21.7509 13.7281 21.4993 13.7533 21.2708 13.8484L21.2707 13.8485C20.2346 14.2801 19.1231 14.5016 18.0007 14.5H18C15.7457 14.5 13.5837 13.6045 11.9896 12.0104C10.3955 10.4163 9.5 8.25433 9.5 5.99999L9.5 5.99927C9.49838 4.8769 9.71983 3.76541 10.1515 2.72938C10.2468 2.50072 10.2721 2.24888 10.224 2.00584C10.1759 1.76281 10.0567 1.53954 9.8815 1.36438Z"
                            fill="black"
                            stroke="black"
                            stroke-width="2"
                        />
                        <path
                            mask="url(#fade)"
                            class="outline-shadow"
                            class="stroke"
                            filter="url(#outer-shadow)"
                            d="M9.8815 1.36438L9.88141 1.36429C9.70639 1.18942 9.48342 1.07041 9.24073 1.02235C8.99803 0.974286 8.74653 0.999323 8.51808 1.09429L8.51753 1.09452C4.54484 2.75146 1.75 6.6732 1.75 11.25C1.75 17.3262 6.67489 22.25 12.75 22.25C14.9217 22.2501 17.0448 21.6075 18.852 20.4032C20.6591 19.1989 22.0695 17.4868 22.9055 15.4825L22.9058 15.4818C23.0007 15.2532 23.0256 15.0015 22.9774 14.7587C22.9291 14.5159 22.8099 14.2929 22.6348 14.118C22.4597 13.9431 22.2366 13.8241 21.9937 13.7761C21.7509 13.7281 21.4993 13.7533 21.2708 13.8484L21.2707 13.8485C20.2346 14.2801 19.1231 14.5016 18.0007 14.5H18C15.7457 14.5 13.5837 13.6045 11.9896 12.0104C10.3955 10.4163 9.5 8.25433 9.5 5.99999L9.5 5.99927C9.49838 4.8769 9.71983 3.76541 10.1515 2.72938C10.2468 2.50072 10.2721 2.24888 10.224 2.00584C10.1759 1.76281 10.0567 1.53954 9.8815 1.36438Z"
                            fill="black"
                            stroke="black"
                            stroke-width="2"
                        />
                    </g>
                    <path
                        class="trail"
                        d="M9.8815 1.36438L9.88141 1.36429C9.70639 1.18942 9.48342 1.07041 9.24073 1.02235C8.99803 0.974286 8.74653 0.999323 8.51808 1.09429L8.51753 1.09452C4.54484 2.75146 1.75 6.6732 1.75 11.25C1.75 17.3262 6.67489 22.25 12.75 22.25C14.9217 22.2501 17.0448 21.6075 18.852 20.4032C20.6591 19.1989 22.0695 17.4868 22.9055 15.4825L22.9058 15.4818C23.0007 15.2532 23.0256 15.0015 22.9774 14.7587C22.9291 14.5159 22.8099 14.2929 22.6348 14.118C22.4597 13.9431 22.2366 13.8241 21.9937 13.7761C21.7509 13.7281 21.4993 13.7533 21.2708 13.8484L21.2707 13.8485C20.2346 14.2801 19.1231 14.5016 18.0007 14.5H18C15.7457 14.5 13.5837 13.6045 11.9896 12.0104C10.3955 10.4163 9.5 8.25433 9.5 5.99999L9.5 5.99927C9.49838 4.8769 9.71983 3.76541 10.1515 2.72938C10.2468 2.50072 10.2721 2.24888 10.224 2.00584C10.1759 1.76281 10.0567 1.53954 9.8815 1.36438Z"
                        stroke="#2CC6FE"
                        stroke-linecap="round"
                    />
                    <g class="inner">
                        <path
                            class="inner-face"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.528 1.71799C9.63312 1.82308 9.70465 1.95704 9.73349 2.10286C9.76234 2.24868 9.7472 2.39979 9.69 2.53699C9.23282 3.6342 8.99828 4.81134 9 5.99999C9 8.38694 9.94821 10.6761 11.636 12.3639C13.3239 14.0518 15.6131 15 18 15C19.1886 15.0017 20.3658 14.7672 21.463 14.31C21.6001 14.2529 21.7511 14.2378 21.8968 14.2666C22.0425 14.2954 22.1763 14.3668 22.2814 14.4717C22.3865 14.5767 22.458 14.7105 22.487 14.8562C22.5159 15.0018 22.501 15.1528 22.444 15.29C21.646 17.2032 20.2997 18.8376 18.5747 19.9871C16.8496 21.1367 14.823 21.7501 12.75 21.75C6.951 21.75 2.25 17.05 2.25 11.25C2.25 6.88199 4.917 3.13799 8.71 1.55599C8.84707 1.49901 8.99797 1.48399 9.14359 1.51282C9.28921 1.54166 9.42299 1.61307 9.528 1.71799Z"
                        />
                        <path
                            mask="url(#inner-fade)"
                            class="inner-bg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.528 1.71799C9.63312 1.82308 9.70465 1.95704 9.73349 2.10286C9.76234 2.24868 9.7472 2.39979 9.69 2.53699C9.23282 3.6342 8.99828 4.81134 9 5.99999C9 8.38694 9.94821 10.6761 11.636 12.3639C13.3239 14.0518 15.6131 15 18 15C19.1886 15.0017 20.3658 14.7672 21.463 14.31C21.6001 14.2529 21.7511 14.2378 21.8968 14.2666C22.0425 14.2954 22.1763 14.3668 22.2814 14.4717C22.3865 14.5767 22.458 14.7105 22.487 14.8562C22.5159 15.0018 22.501 15.1528 22.444 15.29C21.646 17.2032 20.2997 18.8376 18.5747 19.9871C16.8496 21.1367 14.823 21.7501 12.75 21.75C6.951 21.75 2.25 17.05 2.25 11.25C2.25 6.88199 4.917 3.13799 8.71 1.55599C8.84707 1.49901 8.99797 1.48399 9.14359 1.51282C9.28921 1.54166 9.42299 1.61307 9.528 1.71799Z"
                        />
                        <g
                            class="inner-shadow"
                            filter="url(#inner-shadow)"
                            mask="url(#fade)"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.528 1.71799C9.63312 1.82308 9.70465 1.95704 9.73349 2.10286C9.76234 2.24868 9.7472 2.39979 9.69 2.53699C9.23282 3.6342 8.99828 4.81134 9 5.99999C9 8.38694 9.94821 10.6761 11.636 12.3639C13.3239 14.0518 15.6131 15 18 15C19.1886 15.0017 20.3658 14.7672 21.463 14.31C21.6001 14.2529 21.7511 14.2378 21.8968 14.2666C22.0425 14.2954 22.1763 14.3668 22.2814 14.4717C22.3865 14.5767 22.458 14.7105 22.487 14.8562C22.5159 15.0018 22.501 15.1528 22.444 15.29C21.646 17.2032 20.2997 18.8376 18.5747 19.9871C16.8496 21.1367 14.823 21.7501 12.75 21.75C6.951 21.75 2.25 17.05 2.25 11.25C2.25 6.88199 4.917 3.13799 8.71 1.55599C8.84707 1.49901 8.99797 1.48399 9.14359 1.51282C9.28921 1.54166 9.42299 1.61307 9.528 1.71799Z"
                                fill="hsl(0 0% 10% / .01)"
                            />
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="inner-shadow"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="0.4" dy="0.5" />
                            <feGaussianBlur stdDeviation="0.1" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_731_4"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="0.3" dy="-0.5" />
                            <feGaussianBlur stdDeviation="0.1" />
                            <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="effect1_innerShadow_731_4"
                                result="effect2_innerShadow_731_4"
                            />
                        </filter>
                        <linearGradient
                            id="fade-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                            gradientTransform="rotate(45)"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0.45" stop-color="white" stop-opacity="0" />
                            <stop offset="0.75" stop-color="white" stop-opacity="0.75" />
                            <stop offset="0.95" stop-color="white" stop-opacity="0.5" />
                            <stop offset="1" stop-color="white" stop-opacity="0.35" />
                        </linearGradient>
                        <linearGradient
                            id="inner-fade-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                            gradientTransform="rotate(45)"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stop-color="transparent" stop-opacity="0" />
                            <stop offset="0.75" stop-color="white" stop-opacity="1" />
                        </linearGradient>
                        <mask id="fade">
                            <rect width="100%" height="100%" fill="url(#fade-gradient)" />
                        </mask>
                        <mask id="inner-fade">
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#inner-fade-gradient)"
                            />
                        </mask>
                        <filter
                            id="outer-shadow"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="0.5" dx="-0.05" />
                            <feGaussianBlur stdDeviation="0.25" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_731_4"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_731_4"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
            <span class="sr-only">Toggle Theme</span>
        </button>
    `;

    // Re-seleciona o toggle e adiciona o listener APÓS a injeção do HTML
    const newToggle = document.querySelector('.toggle');
    if (newToggle) {
        // Define o tamanho do botão (dimensões da caixa)
        newToggle.style.fontSize = '24px'; /* Tamanho base para o botão */
        newToggle.style.width = '4em'; /* Largura relativa ao font-size */
        newToggle.style.height = '2.2em'; /* Altura relativa ao font-size */
        newToggle.style.aspectRatio = 'initial'; /* Remove aspect-ratio para permitir height/width separado */
        newToggle.style.borderRadius = '2.2em'; /* Arredonda as bordas */


        newToggle.addEventListener('click', handleToggle);
        // Aplica o tema inicial após a injeção do HTML e seleção do novo elemento
        update(); 
        // Define o estado inicial do aria-pressed baseado no tema inicial
        newToggle.setAttribute('aria-pressed', config.theme === 'light');
    }
}