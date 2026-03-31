import {token, clientId} from './config';
import { REST, Routes } from 'discord.js';

import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(token)

type DeployCommandsProps = {
    guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps)
{
    try {
        console.log("Odświeżanie komend...")

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {
                body: commandsData, 
            }
        )

        console.log("Komendy odświeżone!")
    } catch (error) {
        console.error(error)
    }
}