import { CommandInteraction, Guild, InteractionContextType, SlashCommandBuilder } from "discord.js";

import { normalizeHexColor, parseColor, isHex } from "../util/colors";

export const data = new SlashCommandBuilder()
    .setName("color")
    .setDescription("Wręcza wybrany kolor")
    .addStringOption((option) => option
        .setName("color")
        .setDescription("Kolor w heksie")
        .setRequired(true))
        .setContexts(InteractionContextType.Guild)

export async function execute(interaction: CommandInteraction)
{
    if (!interaction.isChatInputCommand())
    {
        return
    }

    const guild = interaction.guild as Guild

    const user = interaction.user
    const userId = user.id

    const member = await guild.members.fetch(userId)

    const input = interaction.options.getString("color", true);

    const hexColor = normalizeHexColor(input)

    if (hexColor === null)
    {
        await interaction.reply({ content: "Niepoprawny kolor! Użyj formatu #RRGGBB", ephemeral: true })
        return
    }

    const roleColor = parseColor(hexColor)

    if (roleColor === null)
    {
        await interaction.reply({ content: "Niepoprawny kolor! Użyj formatu #RRGGBB", ephemeral: true })
        return
    }

    const existingRole = guild.roles.cache.find((role) => role.name === hexColor && role.color === roleColor)

    if (existingRole)
    {
        if (member.roles.cache.has(existingRole.id))
        {
            await interaction.reply({ content: "Już masz ten kolor!", ephemeral: true })
            console.log(`Użytkownik ${user.tag} próbował otrzymać kolor ${hexColor}, ale już go posiada`)
            return
        }

        const previousColorRoles = member.roles.cache.filter((role) => isHex(role.name))

        if (previousColorRoles.size > 0)
        {
            await member.roles.remove(previousColorRoles)
        }

        await member.roles.add(existingRole)
        await interaction.reply({ content: "Otrzymano kolor", ephemeral: true })
        console.log(`Użytkownik ${user.tag} otrzymał kolor ${hexColor} (istniejąca rola)`)
        return
    }

    const previousColorRoles = member.roles.cache.filter((role) => isHex(role.name))

    if (previousColorRoles.size > 0)
    {
        await member.roles.remove(previousColorRoles)
    }

    const role = await guild.roles.create({
        name: hexColor,
        color: roleColor,
    })

    await member.roles.add(role)
    await interaction.reply({ content: "Otrzymano kolor", ephemeral: true })
    console.log(`Użytkownik ${user.tag} otrzymał kolor ${hexColor} (nowa rola)`)
}
