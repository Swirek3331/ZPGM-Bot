import { Client, ClientEvents } from 'discord.js';

import { token, clientId } from './config';
import { commands } from './commands';
import { deployCommands } from './commands-menager';



const client = new Client({ 
    intents: [
        "Guilds",
        "GuildMessages"
    ]
})

client.once('clientReady', (readyClient) => {
    console.log(`Działa jako ${readyClient.user.tag}!`)
    readyClient.guilds.cache.forEach(async (guild) => {
        await deployCommands({ guildId: guild.id })
    })
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
    console.log(`Użyto komendy ${commandName} przez ${interaction.user.tag}`)
    commands[commandName as keyof typeof commands].execute(interaction)
  }
})

client.login(token)