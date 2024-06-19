document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showItem(index) {
        const carousel = document.querySelector('.carousel');
        carousel.style.transform = `translateX(${-100 * index}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.carousel-prev').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        showItem(currentIndex);
    });

    document.querySelector('.carousel-next').addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        showItem(currentIndex);
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            showItem(currentIndex);
        });
    });

    showItem(currentIndex);

    const sunButton = document.querySelector('.sun-button');
    const moonButton = document.querySelector('.moon-button');
    const body = document.body;

    sunButton.addEventListener('click', () => {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    });

    moonButton.addEventListener('click', () => {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    });
});
