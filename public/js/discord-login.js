// Funkcja do wymiany code na access_token i zapis do ciasteczka
async function exchangeCodeForTokenAndSetCookie(code) {
    const clientId = '1252915029703917598'; // Twój client_id
    const clientSecret = 'rIRfxPirDG_UAw9Sy7VOGbNEnev9iXQv'; // Twój client_secret
    const redirectUri = 'https://pgt-esports-website-2fmb.vercel.app/about.html'; // Twój redirect_uri
    const tokenEndpoint = 'https://discord.com/api/oauth2/token';

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
        });

        if (!response.ok) {
            throw new Error('Nie udało się wymienić code na token');
        }

        const data = await response.json();
        const accessToken = data.access_token;

        // Ustawienie ciasteczka z tokenem dostępu
        document.cookie = `discordAccessToken=${accessToken}; Secure; HttpOnly`;
        
        return accessToken;
    } catch (error) {
        console.error('Błąd podczas wymiany code na token:', error.message);
        return null;
    }
}

// Funkcja do pobrania danych użytkownika po zalogowaniu z ciasteczka
async function fetchUserDataFromCookie() {
    const cookie = document.cookie;
    const accessToken = cookie.split('; ').find(row => row.startsWith('discordAccessToken=')).split('=')[1];

    if (!accessToken) {
        return null;
    }

    const userEndpoint = 'https://discord.com/api/users/@me';

    try {
        const response = await fetch(userEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych użytkownika');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error.message);
        return null;
    }
}

// Funkcja do aktualizacji UI z danymi użytkownika
function updateUserInfo(username, avatarUrl) {
    const loginButton = document.querySelector('.login-button');
    loginButton.innerHTML = `
        <img src="${avatarUrl}" alt="Avatar użytkownika" class="avatar">
        <span>${username}</span>
    `;
}

// Obsługa logowania przez Discord po powrocie z autoryzacji
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        exchangeCodeForTokenAndSetCookie(code)
            .then(token => {
                if (token) {
                    fetchUserDataFromCookie()
                        .then(userData => {
                            if (userData) {
                                const { username, avatar } = userData;
                                const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${avatar}.png`;

                                updateUserInfo(username, avatarUrl);
                            }
                        })
                        .catch(error => console.error('Błąd podczas pobierania danych użytkownika:', error));
                }
            })
            .catch(error => console.error('Błąd podczas wymiany code na token:', error));
    }
};
