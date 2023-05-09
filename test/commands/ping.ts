import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
    async execute(interaction: any, utils: any) {
        if (!utils.hasRole("owner", interaction.user.id)) return interaction.reply("You do not have permission to use this command.");
        await interaction.reply("Pong!");
    }
}