const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guildId = '1107729151953211422';
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.error(`Nie można znaleźć serwera o ID ${guildId}`);
    return;
  }

  const ceoRoleId = '1255980299121066005';
  const queryRoleId = '1255982048838029362';

  try {
    // Pobierz role z gildii
    const ceoRole = guild.roles.cache.get(ceoRoleId);
    const queryRole = guild.roles.cache.get(queryRoleId);

    if (!ceoRole || !queryRole) {
      console.error('Nie można znaleźć roli.');
      return;
    }

    // Pobierz członków danej roli
    const ceoMembers = await ceoRole.members.fetch().then(members => members.array());
    const queryMembers = await queryRole.members.fetch().then(members => members.array());

    console.log('Ceo Members:', ceoMembers);
    console.log('Query Members:', queryMembers);

    // Przygotuj listy użytkowników
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
  } catch (error) {
    console.error('Wystąpił błąd podczas przetwarzania członków roli:', error);
    client.destroy();
  }
});
