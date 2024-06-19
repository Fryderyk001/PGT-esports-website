const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds', 'guilds.members.read']
},
(accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const checkAdmin = async (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.status(403).send('Forbidden');
    }

    const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
    const member = await guild.members.fetch(req.user.id);
    if (member.roles.cache.some(role => ['Root', 'vRoot'].includes(role.name))) {
        return next();
    } else {
        return res.status(403).send('Forbidden');
    }
};

app.get('/', async (req, res) => {
    let isAdmin = false;

    if (req.isAuthenticated() && req.user) {
        const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
        const member = await guild.members.fetch(req.user.id);
        if (member.roles.cache.some(role => ['Root', 'vRoot'].includes(role.name))) {
            isAdmin = true;
        }
    }

    res.render('index', { user: req.user, isAdmin });
});

const tournaments = []; // Przykładowa lista turniejów, docelowo powinna być pobierana z bazy danych

app.get('/add-tournament', checkAdmin, (req, res) => {
    res.render('add-tournament', { user: req.user, tournaments });
});

app.post('/add-tournament', checkAdmin, (req, res) => {
    const newTournament = {
        id: Date.now(),
        name: req.body.name,
        date: req.body.date,
        endDate: req.body['end-date'],
        prize: req.body.prize,
        minParticipants: req.body['min-participants'],
        type: req.body.type,
        game: req.body.game,
        entry: req.body.entry,
        tiplyLink: req.body['tiply-link'],
        description: req.body.description
    };
    tournaments.push(newTournament);
    res.redirect('/add-tournament');
});

app.get('/edit-tournament/:id', checkAdmin, (req, res) => {
    const tournament = tournaments.find(t => t.id == req.params.id);
    if (!tournament) {
        return res.redirect('/add-tournament');
    }
    res.render('edit-tournament', { user: req.user, tournament });
});

app.post('/edit-tournament/:id', checkAdmin, (req, res) => {
    const tournament = tournaments.find(t => t.id == req.params.id);
    if (tournament) {
        tournament.name = req.body.name;
        tournament.date = req.body.date;
        tournament.endDate = req.body['end-date'];
        tournament.prize = req.body.prize;
        tournament.minParticipants = req.body['min-participants'];
        tournament.type = req.body.type;
        tournament.game = req.body.game;
        tournament.entry = req.body.entry;
        tournament.tiplyLink = req.body['tiply-link'];
        tournament.description = req.body.description;
    }
    res.redirect('/add-tournament');
});

app.post('/delete-tournament/:id', checkAdmin, (req, res) => {
    const index = tournaments.findIndex(t => t.id == req.params.id);
    if (index !== -1) {
        tournaments.splice(index, 1);
    }
    res.redirect('/add-tournament');
});

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
