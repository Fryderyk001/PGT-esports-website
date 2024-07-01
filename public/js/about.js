document.addEventListener('DOMContentLoaded', async function() {
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

    const middleContainer = document.querySelector('.middle-container');
    const discordUsersDiv = document.getElementById('discord-users');

    // Funkcja do pobierania użytkowników z serwera Discord
    async function fetchDiscordUsers() {
        try {
            // Tutaj wykonaj zapytanie do API Discorda lub użyj bota Discorda, aby pobrać użytkowników
            // Poniżej znajduje się przykładowy kod symulujący pobieranie danych
            const users = [
                { name: 'Ceo', avatarUrl: 'https://example.com/avatar-ceo.png' },
                { name: 'Query', avatarUrl: 'https://example.com/avatar-query.png' }
                // Dodaj więcej użytkowników w odpowiedniej kolejności, jeśli są wymagani
            ];

            return users;
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników z Discorda:', error);
            return [];
        }
    }

    // Funkcja do renderowania użytkowników na stronie
    async function renderDiscordUsers() {
        const users = await fetchDiscordUsers();

        if (users.length === 0) {
            discordUsersDiv.innerHTML = '<p>Nie można załadować użytkowników z Discorda.</p>';
            return;
        }

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('discord-user');

            const avatarImg = document.createElement('img');
            avatarImg.src = user.avatarUrl;
            avatarImg.alt = `${user.name}'s Avatar`;
            avatarImg.classList.add('discord-avatar');

            const nameSpan = document.createElement('span');
            nameSpan.textContent = user.name;
            nameSpan.classList.add('discord-name');

            userDiv.appendChild(avatarImg);
            userDiv.appendChild(nameSpan);
            discordUsersDiv.appendChild(userDiv);
        });
    }

    // Wywołanie funkcji renderującej użytkowników
    await renderDiscordUsers();
});
