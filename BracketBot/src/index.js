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
const eventHandler = require('./handlers/eventHandler.js');

const bracketBot = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.GuildMembers,
    ],
});

eventHandler(bracketBot);

bracketBot.login(process.env.TOKEN);

