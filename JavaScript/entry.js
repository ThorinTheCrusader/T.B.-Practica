const urlParams = new URLSearchParams(window.location.search);
const entryId = parseInt(urlParams.get('id'));

fetch('../data/entries.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(entries) {
        const entry = entries.find(function(e) {
            return e.id === entryId;
        });

        if (!entry) return;

        document.title = entry.title + ' — Peasant\'s Book';

        document.querySelector('.entry-category').textContent = entry.category;
        document.querySelector('.entry-hero-content h1').textContent = entry.title;
        document.querySelector('.entry-hero-content p').textContent = entry.subtitle;

        document.querySelector('.entry-hero').style.backgroundImage =
            'linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.4) 100%), url("../Assets/' + entry.image + '")';

        const body = document.querySelector('.entry-body');
        body.innerHTML = '';
        entry.sections.forEach(function(section) {
            body.innerHTML += `
                <h2>${section.heading}</h2>
                <p>${section.content}</p>
            `;
        });

        const factsBox = document.querySelector('.entry-facts');
        factsBox.innerHTML = '<h3>Quick Facts</h3>';
        entry.facts.forEach(function(fact) {
            factsBox.innerHTML += `
                <div class="fact">
                    <span class="fact-label">${fact.label}</span>
                    <span class="fact-value">${fact.value}</span>
                </div>
            `;
        });

        const seeAlsoGrid = document.querySelector('.see-also-grid');
        seeAlsoGrid.innerHTML = '';

        const otherEntries = entries.filter(function(e) {
            return e.id !== entryId;
        });

        const shuffled = otherEntries.sort(function() {
            return Math.random() - 0.5;
        });

        const seeAlso = shuffled.slice(0, 3);

        seeAlso.forEach(function(e) {
            seeAlsoGrid.innerHTML += `
                <a href="../html/entry.html?id=${e.id}" class="see-also-card">
                    <span class="see-also-category">${e.category}</span>
                    <h3>${e.title}</h3>
                    <p>${e.description}</p>
                </a>
            `;
        });
    });