const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const fetch = require('node-fetch');

// Wczytywanie konfiguracji YAML
const config = yaml.load(fs.readFileSync('./config.yaml', 'utf8'));

const app = express();

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.MONGO_URI })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: config.DISCORD_CLIENT_ID,
    clientSecret: config.DISCORD_CLIENT_SECRET,
    callbackURL: config.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds']
}, function(accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/tournaments.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tournaments.html'));
});

app.get('/results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.get('/partners.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'partners.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/regulations.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'regulations.html'));
});

// Endpoint do dodawania nowych ogłoszeń
app.post('/api/announcements', (req, res) => {
    if (req.isAuthenticated() && req.user.guilds.some(guild => guild.id === config.DISCORD_GUILD_ID && (guild.permissions & 0x8))) {
        const { title, content } = req.body;
        // Zapisz ogłoszenie do bazy danych lub pamięci (dla prostoty nie implementujemy logiki bazy danych tutaj)
        res.status(201).json({ message: 'Announcement added successfully' });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
});

// Endpoint do pobierania menedżerów Discorda
const DISCORD_GUILD_ID = config.DISCORD_GUILD_ID;
const DISCORD_ROOT_ID = config.DISCORD_ROOT_ID.split(',');
const DISCORD_BOT_TOKEN = config.DISCORD_BOT_TOKEN;

app.get('/api/discord-managers', async (req, res) => {
    try {
        const response = await fetch(`https://discord.com/api/v8/guilds/${DISCORD_GUILD_ID}/members?limit=1000`, {
            headers: {
                Authorization: `Bot ${DISCORD_BOT_TOKEN}`
            }
        });
        const members = await response.json();
        const managers = members.filter(member => 
            member.roles.some(role => DISCORD_ROOT_ID.includes(role))
        );
        res.json(managers);
    } catch (error) {
        console.error('Error fetching Discord managers:', error);
        res.status(500).json({ error: 'Failed to fetch Discord managers' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
