import {token, clientId} from './config';
import { REST, Routes } from 'discord.js';

import { commands } from "./commands";
import { log } from './util/logs';

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(token)

type DeployCommandsProps = {
    guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps)
{
    try {
        log("Odświeżanie komend...")

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {
                body: commandsData, 
            }
        )

        log("Komendy odświeżone!")
    } catch (error) {
        console.error(error)
    }
}