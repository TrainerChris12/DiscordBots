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
let bracketFormat;
let tournamentName;

let participants = [];

bracketBot.on('interactionCreate', async ( interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'generate-bracket') {
        participantCount = interaction.options.get('number-of-participants').value;
        bracketFormat = interaction.options.get('tournament-format').value;
        tournamentName = interaction.options.get('bracket-name').value;
    }

    if (commandName === 'join-bracket') {
        const currParticipant = interaction.options.get('display-name').value;

    }

    else {
        console.error(`Unknown command: ${commandName}`);
        await interaction.reply({
            content: `Sorry, I don't recognize this command \'${commandName}\'. Please try again.`,
            ephemeral: true,
        });
    }

});

bracketBot.login(process.env.TOKEN);
