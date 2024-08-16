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

bracketBot.login(process.env.TOKEN);
