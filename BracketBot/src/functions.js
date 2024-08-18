async function replyToInteraction(interaction, message, ephemeral) {
    return await interaction.reply({
        content: message,
        ephemeral: ephemeral,
    });
}

async function addParticipant(interaction, participant, arr) {
    const find = arr.find(element => element === participant);
    if (find !== undefined) {
        await replyToInteraction(interaction,
            `The participant ${participant} is already on the bracket for this tournament`,
            true);
    } else {
        arr.push(participant);
    }
}

module.exports = { replyToInteraction, addParticipant };



