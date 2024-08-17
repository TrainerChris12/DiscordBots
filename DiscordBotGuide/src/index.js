require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅  ${c.user.tag} is online`)
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('hey');
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!');
    }

    if (interaction.commandName === 'add') {
        const firstNum = interaction.options.get('first-number').value;
        const secondNum = interaction.options.get('second-number').value;

        const sum = firstNum + secondNum;
        interaction.reply(sum.toString());
    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('This is the embed description')
            .setColor('Random')
            .addFields({
                name: 'Field title',
                value: 'some random value',
                inline: true,
            },
            {
                name: 'Field title',
                value: 'some random value',
                inline: true,
            });


        interaction.reply({embeds: [embed]});
    }
});

client.on('messageCreate', (message) => {
    if (message.content ===  'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('This is the embed description')
            .setColor('Random')
            .addFields({
                    name: 'Field title',
                    value: 'some random value',
                    inline: true,
                },
                {
                    name: 'Field title',
                    value: 'some random value',
                    inline: true,
                });
        message.reply({embeds: [embed]});
    }

})

client.login(process.env.TOKEN);


