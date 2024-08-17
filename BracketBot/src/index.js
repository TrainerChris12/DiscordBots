/*                      *--Approach--*
    DEFINING TOURNAMENT STRUCTURE:
    Single Elimination (Will implement more later)

    DESIGNING DATA MODEL:
    Participant information (Can be individuals or teams) stored in an Arr
    Matches: Function and Command(s) to declare winner and advance them.
    Bracket: Using participant information, represent the defined tournament
        in some form of picture or graph.
*/
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const bracketBot = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.GuildMembers,
    ],
});

bracketBot.on('ready', (c) => {
    console.log(`✅  ${c.user.tag} is online`)
});


let participantCount;
let tournamentFormat;

let participants = [];

bracketBot.on('interactionCreate', async ( interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'generate-bracket') {
        participantCount = interaction.options.get('number-of-participants').value;
        tournamentFormat = interaction.options.get('tournament-format').value;

        await interaction.reply({
            content: 'Please mention the participants in the tournament.',
            ephemeral: true,
        });

        const filter = response => response.author.id === interaction.user.id;
        const collected = await interaction.channel.awaitMessages({})
    }

});

bracketBot.login(process.env.TOKEN);
