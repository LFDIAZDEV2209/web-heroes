class ShowMore extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
            button {
                background-color: #000;
                color: #fff;
                padding: 10px 20px;
                border-radius: 30px;
                cursor: pointer;
                border: 3px solid #000;
                width: 100%;
                margin-top: 15px;
                transition: all 0.3s;
                font-family: 'Bangers', cursive;
                font-size: 1.1rem;
                letter-spacing: 1px;
                position: relative;
                overflow: hidden;
                box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
            }
            button:hover {
                background-color: #333;
                transform: translateY(-3px);
                box-shadow: 5px 5px 0 rgba(0,0,0,0.3);
            }
            button:active {
                transform: translateY(0);
                box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
            }
            button::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 35%, white 2px, transparent 2px),
                    radial-gradient(circle at 80% 65%, white 2px, transparent 2px);
                opacity: 0.2;
                pointer-events: none;
            }
        `;

        const showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Ver más';

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(showMoreBtn);

        showMoreBtn.addEventListener('click', () => {
            const card = this.closest('.card');
            const heroName = card.querySelector('h2').textContent;
            const heroImage = card.querySelector('.card-image').style.backgroundImage;
            // Extraer la URL de la imagen del estilo background-image
            const imageUrl = heroImage.replace(/^url\(['"](.+)['"]\)$/, '$1');
            
            const heroData = {
                nombre: heroName,
                nombreClave: card.querySelector('p:nth-child(1)').textContent.split(': ')[1],
                casa: card.querySelector('p:nth-child(2)').textContent.split(': ')[1],
                anoAparicion: card.querySelector('p:nth-child(3)').textContent.split(': ')[1],
                descripcion: card.querySelector('p:nth-child(4)').textContent.split(': ')[1],
                fullDescripcion: card.querySelector('.full-description').textContent,
                image: imageUrl
            };
            this.showModal(heroData);
        });
    }

    showModal(heroData) {
        const modal = document.createElement('div');
        modal.className = 'modal-global';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-button">×</button>
                <div class="modal-image" style="background-image: url('${heroData.image}')"></div>
                <div class="modal-text">
                    <h2>${heroData.nombre}</h2>
                    <p><strong>Nombre Clave:</strong> ${heroData.nombreClave}</p>
                    <p><strong>Casa:</strong> ${heroData.casa}</p>
                    <p><strong>Año de Aparición:</strong> ${heroData.anoAparicion}</p>
                    <p><strong>Descripción:</strong> ${heroData.descripcion}</p>
                    <p><strong>Descripción Completa:</strong></p>
                    <p>${heroData.fullDescripcion}</p>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .modal-global {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.8);
                z-index: 9999;
                animation: fadeIn 0.3s ease-out;
                padding: 20px;
                box-sizing: border-box;
            }
            .modal-content {
                background-color: white;
                padding: 40px;
                border: 6px solid #000;
                border-radius: 2px;
                width: 90%;
                max-width: 900px;
                max-height: calc(100vh - 40px);
                display: flex;
                gap: 20px;
                position: relative;
                box-shadow: 15px 15px 0 rgba(0,0,0,0.8);
                animation: zoomIn 0.3s ease-out;
                overflow: hidden;
                box-sizing: border-box;
            }
            .modal-image {
                width: 40%;
                height: 400px;
                background-size: cover;
                background-position: center;
                border: 4px solid #000;
                position: relative;
                overflow: hidden;
                flex-shrink: 0;
            }
            .modal-image::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle, transparent 50%, rgba(0,0,0,0.03) 50%);
                background-size: 5px 5px;
                pointer-events: none;
            }
            .modal-text {
                width: 60%;
                overflow-y: auto;
                padding-right: 10px;
                font-family: 'Comic Neue', cursive;
                max-height: calc(100vh - 100px);
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background: #000;
                border: 3px solid #000;
                font-size: 24px;
                cursor: pointer;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 0;
                transition: all 0.2s;
                z-index: 10;
            }
            .close-button:hover {
                background-color: #ED1D24;
                transform: rotate(90deg);
            }
            .modal-text h2 {
                margin-top: 0;
                color: #000;
                font-family: 'Bangers', cursive;
                font-size: 2.5rem;
                letter-spacing: 1px;
                text-shadow: 3px 3px 0 rgba(0,0,0,0.1);
                text-align: center;
                position: relative;
            }
            .modal-text h2::after {
                content: "";
                display: block;
                width: 100%;
                height: 3px;
                background: #000;
                margin: 10px auto;
                background: linear-gradient(90deg, transparent, #000, transparent);
            }
            .modal-text p {
                margin: 15px 0;
                line-height: 1.6;
                font-size: 1.1rem;
                color: #333;
            }
            .modal-text strong {
                color: #000;
                font-weight: 700;
                font-family: 'Bangers', cursive;
                letter-spacing: 0.5px;
                font-size: 1.2rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .modal-text::-webkit-scrollbar {
                width: 8px;
            }
            .modal-text::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            .modal-text::-webkit-scrollbar-thumb {
                background: #000;
                border-radius: 10px;
            }
            .modal-text::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
            @keyframes pow {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            .modal-content::before {
                content: "¡POW!";
                position: absolute;
                top: 0px;
                left: 50%;
                transform: translateX(-50%);
                background: #ED1D24;
                color: white;
                font-family: 'Bangers', cursive;
                font-size: 1.2rem;
                padding: 8px 16px;
                border: 3px solid #000;
                border-radius: 50%;
                animation: pow 0.5s ease-out;
                box-shadow: 5px 5px 0 rgba(0,0,0,0.3);
                z-index: 2;
            }
            @media (max-width: 768px) {
                .modal-content {
                    flex-direction: column;
                    width: 95%;
                    padding: 15px;
                    max-height: calc(100vh - 40px);
                }
                .modal-image {
                    width: 100%;
                    height: 250px;
                }
                .modal-text {
                    width: 100%;
                    max-height: calc(100vh - 350px);
                }
                .modal-content::before {
                    top: -25px;
                    font-size: 1.5rem;
                    padding: 6px 12px;
                }
            }
        `;
        modal.appendChild(style);

        modal.querySelector('.close-button').onclick = () => document.body.removeChild(modal);
        modal.onclick = (e) => {
            if (e.target === modal) document.body.removeChild(modal);
        };
        document.body.appendChild(modal);
    }
}

customElements.define('show-more', ShowMore);
