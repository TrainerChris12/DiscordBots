require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');


const commands = [
    {
        name: 'generate-bracket',
        description: 'Generates a bracket',
        options: [
            {
                name: 'tournament-format',
                description: 'The structure and format of the tournament ' +
                    '(i.e single elimination, double elimination...',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'single-elimination',
                        value: 'single-elimination',
                    },
                    {
                        name: 'double-elimination',
                        value: 'double-elimination',
                    },
                ],
                required: true,
            },
            {
                name: 'number-of-participants',
                description: 'defines how many participants this bracket will have',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'four',
                        value: 4,
                    },
                    {
                        name: 'eight',
                        value: 8,
                    },
                    {
                        name: 'twelve',
                        value: 12,
                    },
                    {
                        name: 'sixteen',
                        value: 16,
                    },
                ],
                required: true,
            },
            {
                name: 'bracket-name',
                description: 'the name of the bracket',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
    {
        name: 'join-bracket',
        description: 'use this to join a bracket',
        options: [
            {
                name: 'name-of-bracket',
                description: 'the tournament you want to join',
                type: ApplicationCommandOptionType.String
            },
            {
                name: 'participant-name',
                description: 'the name of the participant you want displayed on the bracket',
                type: ApplicationCommandOptionType.String
            },
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Registration of slash commands successful');
    } catch (error) {
        console.log(`There was an error while creating application commands: ${error}`);
    }
})();



