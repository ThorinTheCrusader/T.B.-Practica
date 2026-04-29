const categoryInfo = {
    'Warfare': {
        description: 'Battles, sieges, tactics, and the knights who fought them.',
        image: '../Assets/warfare.jpg'
    },
    'Castles': {
        description: 'Architecture, defense, and the lords within the walls.',
        image: '../Assets/castles.jpg'
    },
    'The Church': {
        description: 'Faith, crusades, monasteries, and the Pope\'s iron grip.',
        image: '../Assets/church.jpg'
    },
    'Peasant Life': {
        description: 'How ordinary folk actually lived, toiled, and survived.',
        image: '../Assets/peasant.jpg'
    },
    'Kings & Courts': {
        description: 'Power, politics, treachery, and the art of ruling.',
        image: '../Assets/kings.jpg'
    },
    'Arms & Armour': {
        description: 'Swords, shields, plate mail, and the craft of the armourer.',
        image: '../Assets/arms.jpg'
    }
};

fetch('../data/entries.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(entries) {
        const grid = document.getElementById('categories-grid');

        const counts = {};
        entries.forEach(function(entry) {
            counts[entry.category] = (counts[entry.category] || 0) + 1;
        });

        Object.keys(categoryInfo).forEach(function(category) {
            const info = categoryInfo[category];
            const count = counts[category] || 0;
            const filter = category.toLowerCase().replace(/ /g, '-').replace(/&/g, '&');

            const card = document.createElement('a');
            card.href = '../html/browse.html?category=' + encodeURIComponent(category);
            card.className = 'category-card';

            card.innerHTML = `
                <div class="category-card-bg" style="background-image: url('${info.image}')"></div>
                <div class="category-card-overlay"></div>
                <div class="category-card-content">
                    <span class="category-card-count">${count} ${count === 1 ? 'entry' : 'entries'}</span>
                    <h2>${category}</h2>
                    <p>${info.description}</p>
                    <span class="category-card-link">Explore Category</span>
                </div>
            `;

            grid.appendChild(card);
        });
    });