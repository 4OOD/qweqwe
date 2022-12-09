const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("belirli şarkılar gider örn: { 0 = ilk sarki } , { 1 = 2 sarki } #")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("Atlanacak parça").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Geçersiz parça numarası")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Parça numarasına geçildi ${trackNum}`)
	},
}