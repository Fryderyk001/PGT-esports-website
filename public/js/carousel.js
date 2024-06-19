document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    updateCarousel();

    // Function to add a new announcement
    window.addAnnouncement = function(title, content) {
        const newItem = document.createElement('div');
        newItem.classList.add('carousel-item');
        newItem.innerHTML = `
            <div class="carousel-content">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
        `;
        carousel.appendChild(newItem);
        carouselItems.push(newItem);
        updateCarousel();
    };
});
