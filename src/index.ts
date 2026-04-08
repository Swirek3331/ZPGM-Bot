import { Client, ClientEvents } from 'discord.js';

import { token, clientId } from './config';
import { commands } from './commands';
import { deployCommands } from './commands-menager';

import { createLogSession, log } from './util/logs';



const client = new Client({ 
    intents: [
        "Guilds",
    "GuildMessages",
    "GuildMembers"
    ]
})

client.once('clientReady', async (readyClient) => {
  await createLogSession()
  await log(`Działa jako ${readyClient.user.tag}!`)

  for (const guild of readyClient.guilds.cache.values()) {
    await deployCommands({ guildId: guild.id })
  }
})

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id })
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand())
  {
    return
  }
  const { commandName } = interaction
  if (commands[commandName as keyof typeof commands])
  {
    log(`Użyto komendy ${commandName} przez ${interaction.user.tag}`)
    commands[commandName as keyof typeof commands].execute(interaction).catch((error) => {
        log(`Błąd podczas wykonywania komendy ${commandName}:`, error)
    })
  }
})

client.login(token)