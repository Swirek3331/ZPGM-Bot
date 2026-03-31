import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("co")
    .setDescription("ale co");

export async function execute(interaction: CommandInteraction)
{
    return interaction.reply("jajco");
}