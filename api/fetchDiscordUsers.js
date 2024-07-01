const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guildId = 'ID Twojego serwera';
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.error(`Nie można znaleźć serwera o ID ${guildId}`);
    return;
  }

  const ceoRole = '1255980299121066005';
  const queryRole = '1255982048838029362';

  const ceoMembers = await guild.roles.cache.get(ceoRole).members.fetch();
  const queryMembers = await guild.roles.cache.get(queryRole).members.fetch();

  const ceoUsers = ceoMembers.map(member => ({
    name: member.user.username,
    avatarUrl: member.user.displayAvatarURL({ format: 'png' }),
  }));

  const queryUsers = queryMembers.map(member => ({
    name: member.user.username,
    avatarUrl: member.user.displayAvatarURL({ format: 'png' }),
  }));

  // Zapisz dane do plików JSON
  fs.writeFileSync('ceo_users.json', JSON.stringify(ceoUsers, null, 2));
  fs.writeFileSync('query_users.json', JSON.stringify(queryUsers, null, 2));

  console.log('Ceo:', ceoUsers);
  console.log('Query:', queryUsers);

  client.destroy();
});