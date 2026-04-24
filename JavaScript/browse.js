const cards = document.querySelectorAll('.browse-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.nav-search input');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        
        const filter = btn.dataset.filter;

        filterBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        cards.forEach(function(card) {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

    });
});

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

const noResults = document.getElementById('no-results');

console.log('searchTerm from URL:', urlParams.get('search'));

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

searchBtn = document.querySelector('.nav-search button');

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