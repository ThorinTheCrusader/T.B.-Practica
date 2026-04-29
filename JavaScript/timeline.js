fetch('../data/entries.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(entries) {
        const timeline = document.getElementById('timeline');

        const sorted = entries.sort(function(a, b) {
            return a.year - b.year;
        });

        sorted.forEach(function(entry) {
            const event = document.createElement('div');
            event.className = 'timeline-event';

            event.innerHTML = `
                <a href="../html/entry.html?id=${entry.id}" class="timeline-card">
                    <div class="timeline-year">${entry.date}</div>
                    <div class="timeline-category">${entry.category}</div>
                    <h3>${entry.title}</h3>
                    <p>${entry.description}</p>
                </a>
            `;

            timeline.appendChild(event);
        });
    });