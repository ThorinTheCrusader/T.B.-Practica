var searchInput = document.querySelector('.nav-search input');
var searchBtn = document.querySelector('.nav-search button');
let cards;

fetch('../data/entries.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(entries) {
        const grid = document.querySelector('.browse-grid');
        grid.innerHTML = '';

        entries.forEach(function(entry) {
            const card = document.createElement('a');
            card.href = '../html/entry.html?id=' + entry.id;
            card.className = 'browse-card';
            card.dataset.category = entry.category.toLowerCase().replace(/ /g, '-').replace(/&/g, '&');

            card.innerHTML = `
                <span class="browse-category">${entry.category}</span>
                <h3>${entry.title}</h3>
                <p>${entry.description}</p>
            `;

            grid.appendChild(card);
        });

        cards = document.querySelectorAll('.browse-card');

        initFilters();
        initSearch();
    })
    .catch(function(error) {
        console.log('Error loading entries:', error);
    });

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = btn.dataset.filter;

            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            cards.forEach(function(card) {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter || category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const categoryParam = urlParams.get('category');
    const noResults = document.getElementById('no-results');

    if (categoryParam) {
        document.querySelector('.browse-filters').style.display = 'none';
        searchInput.value = categoryParam;

        cards.forEach(function(card) {
            const category = card.querySelector('.browse-category').textContent.trim();
            if (category.toLowerCase() === categoryParam.toLowerCase()) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchTerm) {
        searchInput.value = searchTerm;
        document.querySelector('.browse-filters').style.display = 'none';

        let matchCount = 0;

        cards.forEach(function(card) {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            const term = searchTerm.toLowerCase();

            if (title.includes(term) || category.includes(term)) {
                card.style.display = 'block';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (matchCount === 0) {
            noResults.style.display = 'block';
        }
    }

    document.getElementById('clear-search').addEventListener('click', function() {
        cards.forEach(function(card) {
            card.style.display = 'block';
        });
        noResults.style.display = 'none';
        searchInput.value = '';
        document.querySelector('.browse-filters').style.display = 'flex';
        window.history.replaceState({}, '', 'browse.html');
    });

    searchBtn.addEventListener('click', function() {
        const term = searchInput.value.trim();
        if (term !== '') {
            const currentPath = window.location.pathname;
            const browseUrl = currentPath.replace(/\/[^/]+$/, '/browse.html');
            window.location.href = browseUrl + '?search=' + term;
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const term = searchInput.value.trim();
            if (term !== '') {
                const currentPath = window.location.pathname;
                const browseUrl = currentPath.replace(/\/[^/]+$/, '/browse.html');
                window.location.href = browseUrl + '?search=' + term;
            }
        }
    });
}