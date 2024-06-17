const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Discord Bot Setup
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Log in to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/tournaments', (req, res) => {
  res.sendFile(path.join(__dirname, 'tournaments.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'results.html'));
});

app.get('/partners', (req, res) => {
  res.sendFile(path.join(__dirname, 'partners.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
