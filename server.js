const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = 'mongodb+srv://sochaplaygame:462i6spewmQiTBuW@pgt.l0jmlft.mongodb.net/?retryWrites=true&w=majority&appName=pgt';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoURI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
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

app.get('/', (req, res) => {
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

// Endpoint to add new announcements
app.post('/api/announcements', (req, res) => {
    if (req.isAuthenticated() && req.user.guilds.some(guild => guild.id === process.env.DISCORD_GUILD_ID && (guild.permissions & 0x8))) {
        const { title, content } = req.body;
        // Save the announcement to your database or in-memory storage
        // For simplicity, we are not implementing database logic here
        res.status(201).json({ message: 'Announcement added successfully' });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
});

// Endpoint to fetch Discord managers
app.get('/api/discord-managers', async (req, res) => {
    try {
        const response = await fetch(`https://discord.com/api/v8/guilds/${process.env.DISCORD_GUILD_ID}/members?limit=1000`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        });
        const members = await response.json();
        const managers = members.filter(member => member.roles.includes(process.env.DISCORD_ROOT_ID));
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
