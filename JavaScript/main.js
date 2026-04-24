const searchBtn = document.querySelector('.nav-search button');
const searchInput = document.querySelector('.nav-search input');
const isBrowsePage = window.location.pathname.includes('browse.html');

if (!isBrowsePage) {
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
    if (loginLink) loginLink.innerHTML = 'Welcome ' + loggedInUser.surname;
}