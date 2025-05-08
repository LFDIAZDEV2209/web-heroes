class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.render();
    }

    connectedCallback() {
        // Esperar a que el DOM esté completamente cargado
        setTimeout(() => {
            this.setupEventListeners();
        }, 100);
    }

    filterHeroes() {
        const heroesCard = document.querySelector('heroes-card');
        if (!heroesCard) return;

        const cards = heroesCard.shadowRoot.querySelectorAll('.card');
        let hasVisibleCards = false;

        cards.forEach(card => {
            const heroName = card.querySelector('h2').textContent.toLowerCase();
            const heroAlias = card.querySelector('p:nth-child(1)').textContent.split(': ')[1].toLowerCase();
            const heroCasa = card.querySelector('p:nth-child(2)').textContent.split(': ')[1];
            
            const matchesSearch = heroName.includes(this.searchTerm.toLowerCase()) || 
                                heroAlias.includes(this.searchTerm.toLowerCase());
            const matchesFilter = this.currentFilter === 'all' || heroCasa === this.currentFilter;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Manejar el mensaje de "no hay resultados"
        let noResultsMsg = heroesCard.shadowRoot.querySelector('.no-results');
        if (!hasVisibleCards) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No se encontraron héroes que coincidan con la búsqueda';
                heroesCard.shadowRoot.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    setupEventListeners() {
        const searchBox = this.shadowRoot.querySelector('.search-box');
        const filterButtons = this.shadowRoot.querySelectorAll('.filter-btn');

        searchBox.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.filterHeroes();
        });

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.filterHeroes();
            });
        });
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
            display: block;
            width: 100%;
            max-width: 700px;
            margin: 20px auto;
            padding: 0 20px;
            font-family: 'Comic Neue', cursive;
            }

            .search-container {
            background: white;
            border: 4px solid #000;
            border-radius: 2px;
            padding: 20px;
            box-shadow: 8px 8px 0px #000;
            position: relative;
            overflow: hidden;
            }

            .search-title {
            font-family: 'Bangers', cursive;
            font-size: 2rem;
            text-align: center;
            margin: 0 0 15px 0;
            letter-spacing: 1px;
            color: #000;
            text-shadow: 3px 3px 0 rgba(0,0,0,0.1);
            }

            .search-box {
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            border: 3px solid #000;
            border-radius: 30px;
            outline: none;
            transition: all 0.3s;
            font-family: 'Comic Neue', cursive;
            background-color: #fff;
            box-shadow: inset 2px 2px 5px rgba(0,0,0,0.1);
            }

            .search-box:focus {
            box-shadow: inset 3px 3px 8px rgba(0,0,0,0.2);
            transform: scale(1.01);
            }

            .search-box-wrapper {
            position: relative;
            }

            .search-box-wrapper::after {
            content: "🔍";
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            }

            .filters {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            justify-content: center;
            flex-wrap: wrap;
            }

            .filter-btn {
            padding: 10px 20px;
            border: 3px solid #000;
            border-radius: 30px;
            background-color: #f0f0f0;
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'Bangers', cursive;
            font-size: 1.1rem;
            letter-spacing: 1px;
            color: #000;
            position: relative;
            overflow: hidden;
            box-shadow: 3px 3px 0 #000;
            }

            .filter-btn:hover {
            transform: translateY(-2px);
            box-shadow: 5px 5px 0 #000;
            }

            .filter-btn.active[data-filter="all"] {
            background-color: #6A0DAD;
            color: white;
            }

            .filter-btn.active[data-filter="DC"] {
            background-color: #0476F2;
            color: white;
            }

            .filter-btn.active[data-filter="Marvel"] {
            background-color: #ED1D24;
            color: white;
            }

            .filter-btn.active:hover {
            background-color: #000;
            }

            .search-container::before {
            content: "";
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background: white;
            border-right: 4px solid #000;
            border-bottom: 4px solid #000;
            transform: translateX(-50%) rotate(45deg);
            z-index: -1;
            }

            @media (max-width: 500px) {
            .filters {
                flex-direction: column;
                align-items: center;
            }
            
            .filter-btn {
                width: 80%;
            }
            }
        `;

        const container = document.createElement('div');
        container.innerHTML = `
            <input type="text" class="search-box" placeholder="Buscar héroe...">
            <div class="filters">
                <button class="filter-btn active" data-filter="all">Todos</button>
                <button class="filter-btn" data-filter="DC">DC</button>
                <button class="filter-btn" data-filter="Marvel">Marvel</button>
            </div>
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
    }
}

customElements.define('search-bar', SearchBar); 