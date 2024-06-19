document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showItem(index) {
        carouselItems.forEach((item, i) => {
            item.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            showItem(currentIndex);
        });
    });

    showItem(currentIndex);

    // Theme toggle functionality
    const toggleDark = document.getElementById('toggle-dark');
    const toggleLight = document.getElementById('toggle-light');
    const body = document.body;

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            toggleLight.style.display = 'none';
            toggleDark.style.display = 'block';
        } else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            toggleDark.style.display = 'none';
            toggleLight.style.display = 'block';
        }
    }

    toggleDark.addEventListener('click', () => {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    });

    toggleLight.addEventListener('click', () => {
        setTheme('light');
        localStorage.setItem('theme', 'light');
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

document.addEventListener('DOMContentLoaded', function() {
    const socialTab = document.getElementById('social-tab');
    const socialIcons = document.getElementById('social-icons');

    function showIcons() {
        socialIcons.style.right = '0';
        socialTab.style.right = '110px'; // Adjust according to the width of socialIcons
    }

    function hideIcons() {
        socialIcons.style.right = '-150px';
        socialTab.style.right = '-40px'; // Adjust according to the width of socialIcons
    }

    socialTab.addEventListener('mouseover', showIcons);
    socialIcons.addEventListener('mouseover', showIcons);

    socialTab.addEventListener('mouseout', hideIcons);
    socialIcons.addEventListener('mouseout', hideIcons);
});
