const searchBtn = document.querySelector('.nav-search button');
const isBrowsePage = window.location.pathname.includes('browse.html');

const categoryClassMap = {
    "Warfare": "warfare",
    "Castles & Keeps": "castles",
    "The Church": "church",
    "Peasant Life": "peasant",
    "Kings & Courts": "kings",
    "Arms & Armour": "arms"
};

const categoryDescriptions = {
    "Warfare": "Battles, sieges, tactics, and the knights who fought them.",
    "Castles & Keeps": "Architecture, defense, and the lords within the walls.",
    "The Church": "Faith, crusades, monasteries, and the Pope's iron grip.",
    "Peasant Life": "How ordinary folk actually lived, toiled, and survived.",
    "Kings & Courts": "Power, politics, treachery, and the art of ruling.",
    "Arms & Armour": "Swords, shields, plate mail, and the craft of the armourer."
};

fetch('../data/entries.json')
    .then(response => response.json())
    .then(entries => {
        const categories = [...new Set(entries.map(entry => entry.category))];
        const homeGrid = document.getElementById('home-category-grid');
        
        if (homeGrid) {
            homeGrid.innerHTML = ''; 

            categories.forEach(cat => {
                const card = document.createElement('a');
                
                card.href = `../html/browse.html?category=${encodeURIComponent(cat)}`;
                
                const styleClass = categoryClassMap[cat] || cat.toLowerCase().replace(/\s+/g, '-');
                card.className = `card card-${styleClass}`;
                
                card.innerHTML = `
                    <h3>${cat}</h3>
                    <p>${categoryDescriptions[cat] || `Explore the chronicles of ${cat}.`}</p>
                `;
                homeGrid.appendChild(card);
            });
        }
    });

if (!isBrowsePage) {

    const searchInput = document.querySelector('.nav-search input');

    function doSearch() {
        const term = searchInput.value.trim();
        if (term !== '') {
            const currentPath = window.location.pathname;
            const browseUrl = currentPath.replace(/\/[^/]+$/, '/browse.html');
            window.location.href = browseUrl + '?search=' + term;
        }
    }

    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            doSearch();
        }
    });
}

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    const registerLink = document.querySelector('nav a[href*="register"]');
    const loginLink = document.querySelector('nav a[href*="login"]');

    if (registerLink) registerLink.style.display = 'none';
    if (loginLink) {
        loginLink.textContent = 'Welcome ' + loggedInUser.surname;
        loginLink.removeAttribute('href');
        loginLink.style.cursor = 'default';
        loginLink.style.borderBottom = 'none';
    }

    const logoutBtn = document.createElement('a');
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.cursor = 'pointer';

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    });

    loginLink.parentNode.insertBefore(logoutBtn, loginLink.nextSibling);
}
