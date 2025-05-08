const heroesDB = {
    heroes: [
        {
            nombre: "Bruce Wayne",
            nombreClave: "Batman",
            casa: "DC",
            anoAparicion: "1939",
            descripcion: "El Caballero Oscuro de Gotham",
            fullDescripcion: "Batman es un superhéroe que adquiere poderes sobrehumanos después de ser expuesto a radiación.",
            image: "/img/batman.jpeg"
        },
        {
            nombre: "Clark kent",
            nombreClave: "Superman",
            casa: "DC",
            anoAparicion: "1938",
            descripcion: "El Hombre de Acero",
            fullDescripcion: "Superman es un superhéroe que adquiere poderes sobrehumanos después de ser expuesto a radiación.",
            image: "/img/superman.jpeg"
        },
        {
            nombre: "Tony Stark",
            nombreClave: "Iron Man",
            casa: "Marvel",
            anoAparicion: "1963",
            descripcion: "Genio, millonario, playboy, filántropo",
            fullDescripcion: "Tony Stark creó una armadura para salvar su vida y proteger al mundo.",
            image: "/img/iron-man.jpeg"
        },
        {
            nombre: "Peter Parker",
            nombreClave: "Spider-Man",
            casa: "Marvel",
            anoAparicion: "1963",
            descripcion: "Adolescente que adquiere poderes sobrehumanos",
            fullDescripcion: "Peter Parker adquiere poderes sobrehumanos después de ser mordido por una araña radiactiva.",
            image: "/img/spider-man.jpeg"
        },
        {
            nombre: "Bruce Banner",
            nombreClave: "Hulk",
            casa: "Marvel",
            anoAparicion: "1963",
            descripcion: "Científico que adquiere poderes sobrehumanos",
            fullDescripcion: "Bruce Banner adquiere poderes sobrehumanos cuando se transforma en Hulk.",
            image: "/img/hulk.jpeg"
        },
        {
            nombre: "Wanda Maximoff",
            nombreClave: "Scarlet Witch",
            casa: "Marvel",
            anoAparicion: "1963",
            descripcion: "Bruja",
            fullDescripcion: "Wanda Maximoff adquiere poderes sobrehumanos después de ser expuesta a radiación.",
            image: "/img/scarlet-witch.jpeg"
        },
        {
            nombre: "Clint Barton",
            nombreClave: "Hawkeye",
            casa: "Marvel",
            anoAparicion: "1963",
            descripcion: "Arquero que adquiere poderes sobrehumanos",
            fullDescripcion: "Clint Barton adquiere poderes sobrehumanos después de ser expuesto a radiación.",
            image: "/img/hawkeye.jpeg"
        }
    ]
};

class HeroesCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.render();
    }

    render() {
        const container = document.createElement('div');
        container.className = 'cards-container';
        container.innerHTML = heroesDB.heroes.map(hero => `
            <div class="card">
                <h2>${hero.nombre}</h2>
                <div class="card-image" style="background-image: url('${hero.image}')"></div>
                <div class="card-content">
                    <p><strong>Nombre Clave:</strong> ${hero.nombreClave}</p>
                    <p><strong>Casa:</strong> ${hero.casa}</p>
                    <p><strong>Año de Aparición:</strong> ${hero.anoAparicion}</p>
                    <p><strong>Descripción:</strong> ${hero.descripcion}</p>
                    <p class="full-description">${hero.fullDescripcion}</p>
                </div>
                <show-more></show-more>
            </div>
        `).join('');

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }

            .cards-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                padding: 20px;
                justify-content: center;
                max-width: 1400px;
                margin: 0 auto;
            }

            .card {
                position: relative;
                border: 4px solid #000;
                border-radius: 2px;
                padding: 20px;
                width: 300px;
                flex: 0 0 300px;
                background: white;
                box-shadow: 8px 8px 0px #000;
                transform: rotate(-1deg);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                overflow: hidden;
            }

            /* Alternate card rotation for visual interest */
            .card:nth-child(even) {
                transform: rotate(1deg);
            }

            /* Card hover effect */
            .card:hover {
                transform: translateY(-5px) rotate(0deg);
                box-shadow: 12px 12px 0px #000;
            }

            /* Publisher badge (DC/Marvel) */
            .card::before {
                content: attr(data-publisher);
                position: absolute;
                top: -10px;
                right: 20px;
                padding: 5px 15px;
                background: var(--publisher-color, #000);
                color: white;
                font-family: 'Bangers', cursive;
                font-size: 1rem;
                transform: rotate(3deg);
                z-index: 1;
                box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
            }

            /* DC publisher styling */
            .card[data-publisher="DC"]::before {
                --publisher-color: #0476F2;
                content: "DC";
            }

            /* Marvel publisher styling */
            .card[data-publisher="Marvel"]::before {
                --publisher-color: #ED1D24;
                content: "MARVEL";
            }

            /* Hero image with comic-style border */
            .card-image {
                width: calc(100% - 60px);
                height: 220px;
                background-size: cover;
                background-position: center;
                margin: 30px auto 40px auto;
                border: 4px solid #000;
                position: relative;
                overflow: hidden;
                border-radius: 2px;
            }

            /* Comic-style overlay for images */
            .card-image::after {
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

            h2 {
                margin: 0 0 15px 0;
                color: #000;
                font-family: 'Bangers', cursive;
                font-size: 2.2rem;
                letter-spacing: 2px;
                text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
                text-align: center;
                text-transform: uppercase;
                position: relative;
                padding-bottom: 10px;
            }

            h2::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #000, transparent);
            }

            /* Card content area */
            .card-content {
                margin-top: 16px;
                max-height: 200px;
                overflow: hidden;
                transition: max-height 0.5s ease-in-out;
                font-size: 1rem;
                font-family: 'Comic Neue', cursive;
            }

            p {
                margin: 12px 0;
                color: #333;
                line-height: 1.5;
                font-size: 1.1rem;
                position: relative;
                padding-left: 5px;
                text-shadow: 1px 1px 0 rgba(255,255,255,0.8);
            }

            strong {
                color: #000;
                font-weight: 700;
                font-family: 'Bangers', cursive;
                letter-spacing: 1px;
                font-size: 1.2rem;
                text-transform: uppercase;
                display: inline-block;
                margin-right: 5px;
                text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            }

            .full-description {
                display: none;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 2px dashed #000;
                font-style: italic;
                font-size: 1rem;
                line-height: 1.6;
                color: #444;
                text-shadow: 1px 1px 0 rgba(255,255,255,0.8);
            }

            .card-content.expanded .full-description {
                display: block;
            }

            .no-results {
                text-align: center;
                padding: 30px;
                color: #333;
                font-size: 1.8em;
                font-family: 'Bangers', cursive;
                letter-spacing: 2px;
                background: white;
                border: 4px solid #000;
                box-shadow: 8px 8px 0px #000;
                margin: 30px auto;
                max-width: 500px;
                text-transform: uppercase;
                text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
            }

            @media (max-width: 768px) {
                .card {
                    width: 280px;
                }
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('heroes-card', HeroesCard);

