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
const { replyToInteraction } = require('./functions.js');
const {addParticipant} = require("./functions.js");

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

let participantsArray = [];

bracketBot.on('interactionCreate', async ( interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'generate-bracket') {
        participantCount = interaction.options.get('number-of-participants').value;
        bracketFormat = interaction.options.get('tournament-format').value;
        const bracketNameInput = interaction.options.get('bracket-name').value;
        /*                      FIND OUT WHY THIS THROWS THE ERROR:
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    [InteractionAlreadyReplied]:
                                        The reply to this interaction has already been sent or deferred.
          /--------------------------------------------------------------------------------------------------/

        tournamentName === bracketNameInput ?
            await replyToInteraction(interaction,
                `This bracket already exists.`,
                true) :
            tournamentName = bracketNameInput;
        await replyToInteraction(interaction, `Bracket with name: ${tournamentName} created`, true); */

        //This approach works as intended
        if (tournamentName === bracketNameInput) {
            await replyToInteraction(interaction,
                `This bracket already exists.`,
                true);
        } else {
            tournamentName = bracketNameInput;
            await replyToInteraction(interaction,
                `Bracket with name: ${tournamentName} created`,
                true);
        }

        const guild = interaction.guild;
        await guild.members.fetch();

        const members = guild.members.cache;
        const choices = members.map(member => ({
                label: member.user.username,
                value: member.user.id,
            }),
        );

        await interaction.followUp({
            content: 'Please select the participants for the bracket:',
            components: [
                {
                    type: 1, // ActionRow
                    components: [
                        {
                            type: 3, // SelectMenu
                            custom_id: 'participant-select',
                            placeholder: 'Choose participants',
                            options: choices,
                            min_values: 1,
                            max_values: choices.length
                        }
                    ]
                }
            ]
        });

        //WHY IS THIS NOT WORKING???
        if (interaction.isStringSelectMenu() && interaction.customId === 'participant-select') {
            const selectedParticipants = interaction.values;

            participantsArray = selectedParticipants.map(userId =>
                interaction.guild.members.cache.get(userId).user.username);

            await replyToInteraction(interaction,
                `Participants selected: ${participantsArray.join(',')}`,
                true);

        }


    }

    else if (commandName === 'join-bracket') {
        const currParticipant = interaction.options.get('participant-name').value;

        await addParticipant(interaction, currParticipant, participantsArray);
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
