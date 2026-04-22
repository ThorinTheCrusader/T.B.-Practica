const cards = document.querySelectorAll('.browse-card');
const filterBtns = document.querySelectorAll('.filter-btn');

console.log(cards);
console.log(filterBtns);

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