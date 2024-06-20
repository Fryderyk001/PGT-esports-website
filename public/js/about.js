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
});

document.addEventListener('DOMContentLoaded', function() {
    // Pobierz i wyświetl zarząd Discord
    fetch('/api/discord-managers')
        .then(response => response.json())
        .then(managers => {
            const discordManagersContainer = document.getElementById('discord-managers');
            managers.forEach(manager => {
                const managerElement = document.createElement('div');
                managerElement.classList.add('manager');
                managerElement.innerHTML = `
                    <img src="https://cdn.discordapp.com/avatars/${manager.user.id}/${manager.user.avatar}.png" alt="${manager.user.username}'s avatar" class="manager-avatar">
                    <p>${manager.user.username}</p>
                `;
                discordManagersContainer.appendChild(managerElement);
            });
        })
        .catch(error => console.error('Błąd podczas pobierania zarządu Discord:', error));
});
