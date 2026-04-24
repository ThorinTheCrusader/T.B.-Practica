fetch('../data/entries.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(entries) {
        const grid = document.getElementById('entries-grid');

        entries.forEach(function(entry) {
            const card = document.createElement('div');
            card.className = 'entry-card';

            card.innerHTML = `
                <span class="entry-card-category">${entry.category}</span>
                <span class="entry-card-date">${entry.date}</span>
                <h3>${entry.title}</h3>
                <p>${entry.description}</p>
            `;

            grid.appendChild(card);
        });
    })
    .catch(function(error) {
        console.log('Error loading entries:', error);
    });