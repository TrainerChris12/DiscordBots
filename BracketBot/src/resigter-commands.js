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
        ],
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