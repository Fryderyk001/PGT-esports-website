document.addEventListener('DOMContentLoaded', function() {
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

    // Automatyczne ustawianie aktywnej klasy nawigacji
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navigation-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
