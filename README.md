# guildbuilders
More builders to help manage application commands for applications and guilds

Contents:
1. [Installation](#installation)
2. [Example usage](#example-usage)
3. [Classes](#classes)  
  3.1. [GuildContextMenuCommandBuilder](#guildcontextmenucommandbuilder-extends-contextmenucommandbuilder)  
  3.2. [GuildSlashCommandBuilder](#guildslashcommandbuilder-extends-slashcommandbuilder)  
4. [Functions](#functions)  
  4.1. [filterGlobalCommands](#filterglobalcommandscommandarray)  
  4.2. [filterGuildCommands](#filterguildcommandscommandarray-guildid)

# Installation

```
npm i .\<local directory>\
```

**[Discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome) and its dependencies are required**

# Example usage

Credit to [discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome) for the original [guide to registering slash commands](https://discordjs.guide/creating-your-bot/command-deployment.html)

Use new builders to easily find and deploy application commands to both guilds and your bot globally:
```js
const { GuildSlashCommandBuilder, GuildContextMenuCommandBuilder, filterGlobalCommands, filterGuildCommands } = require("guildbuilders")

const { REST, Routes, SlashCommandBuilder, ApplicationCommandType } = require("discord.js")
const { clientId, guildId, token } = require("./config.json")

// Build a list of commands
const commands = [
  
  // Use .addGuildId and .setGuildIds in addition to regular discord.js builder methods to create application commands
  new GuildSlashCommandBuilder()
    .setName("hello-guild")
    .setDescription("This is a command that will be registered to a guild")
    .addGuildId(guildId),
  new GuildContextMenuCommandBuilder()
    .setName("Guild Message Command")
    .setType(ApplicationCommandType.Message)
    .setGuildIds([ guildId ]),
  
  // You can still use regular discord.js builders!
  new SlashCommandBuilder()
    .setName("hello-application")
    .setDescription("This is a command that will be globally registered to the bot"),
]

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token)

// and deploy your commands!
(async () => {
  try {
    
    // Find commands marked as global
    const globalCommands = filterGlobalCommands(commands)
    
    // and deploy them to the bot using the .put method
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: globalCommands }
    )
      .then(data => console.log(`Successfully reloaded ${data.length} application commands.`))
    
    // Using .put with a different Route can register commands to a guild
    const guildCommands = filterGuildCommands(commands, guildId)
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: guildCommands }
    )
      .then(data => console.log(`Successfully reloaded ${data.length} application commands to guild with ID ${guildId}.`))
    
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
```

Builders are also compatible with [ApplicationCommandManager.set()](https://discord.js.org/#/docs/discord.js/main/class/ApplicationCommandManager?scrollTo=set) from [Discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome):
```js
await client.application.commands.set(globalCommands)
  .then(data => console.log(`Successfully reloaded ${data.length} application commands.`))

await client.application.commands.set(guildCommands, guildId)
  .then(data => console.log(`Successfully reloaded ${data.length} application commands to guild with ID ${guildId}.`))
```

# Classes

## **GuildContextMenuCommandBuilder** extends [ContextMenuCommandBuilder](https://discord.js.org/#/docs/builders/main/class/ContextMenuCommandBuilder)

### Constructor

```js
new GuildContextMenuCommandBuilder()
```

### Properties

#### <ins>.guildIds</ins>

All of the guild ids that the command should be registered to

Type: Array <[Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake)>

#### <ins>.isGuildCommand</ins>

Whether the application command should be registered to guilds or the application globally

Type: boolean (always true)

### Methods

#### <ins>.addGuildId(guildId)</ins>

Adds a single guild id to the list of guilds the command should be registered to

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| guildId   | [Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake) | The id of the guild to add[^1] |

[^1]: Adding a guild does not update the commands in Discord. They still need to be deployed

Returns: [GuildContextMenuCommandBuilder](#guildcontextmenucommandbuilder-extends-contextmenucommandbuilder)

#### <ins>.setGuildIds(guildIds)</ins>

Replace the list of guild ids with a new list

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| guildIds  | Array <[Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake)> | The guild ids that the command should be registered to[^1] |

Returns: [GuildContextMenuCommandBuilder](#guildcontextmenucommandbuilder-extends-contextmenucommandbuilder)

## **GuildSlashCommandBuilder** extends [SlashCommandBuilder](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder)

### Constructor

```js
new GuildSlashCommandBuilder()
```

### Properties

#### <ins>.guildIds</ins>

All of the guild ids that the command should be registered to

Type: Array <[Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake)>

#### <ins>.isGuildCommand</ins>

Whether the application command should be registered to guilds or the application globally

Type: boolean (always true)

### Methods

#### <ins>.addGuildId(guildId)</ins>

Adds a single guild id to the list of guilds the command should be registered to

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| guildId   | [Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake) | The id of the guild to add[^1] |

Returns: [GuildSlashCommandBuilder](#guildslashcommandbuilder-extends-slashcommandbuilder)

#### <ins>.setGuildIds(guildIds)</ins>

Replace the list of guild ids with a new list

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| guildIds  | Array <[Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake)> | The guild ids that the command should be registered to[^1] |

Returns: [GuildSlashCommandBuilder](#guildslashcommandbuilder-extends-slashcommandbuilder)

# Functions

#### <ins>filterGlobalCommands(commandArray)</ins>

Returns a new array containing global commands

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| commandArray | Array <[ContextMenuCommandBuilder](https://discord.js.org/#/docs/builders/main/class/ContextMenuCommandBuilder) \| [SlashCommandBuilder](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder)> | The array of commands made with builders |

Returns: Array <[JSONEncodable](https://discord.js.org/#/docs/builders/main/typedef/JSONEncodable) <[APIApplicationCommand](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIApplicationCommand)>>

#### <ins>filterGuildCommands(commandArray, guildId)</ins>

Returns a new array containing guild commands

| PARAMETER | TYPE | DESCRIPTION |
| --------- | ---- | ----------- |
| commandArray | Array <[ContextMenuCommandBuilder](https://discord.js.org/#/docs/builders/main/class/ContextMenuCommandBuilder) \| [SlashCommandBuilder](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder)> | The array of commands made with builders |
| guildId   | [Snowflake](https://discord.js.org/#/docs/discord.js/main/typedef/Snowflake) | The id of the guild to filter commands for |

Returns: Array <[JSONEncodable](https://discord.js.org/#/docs/builders/main/typedef/JSONEncodable) <[APIApplicationCommand](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIApplicationCommand)>>
