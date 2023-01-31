const { SlashCommandBuilder, ContextMenuCommandBuilder } = require("discord.js")

class GuildSlashCommandBuilder extends SlashCommandBuilder {
	
	constructor() {
		super()
		this.guildIds = []
		this.isGuildCommand = true
	}
	
	addGuildId(guildId) {
		if (typeof guildId !== "string") {
			throw new TypeError("guildId is not a string")
		}
		this.guildIds.push(guildId)
		return this
	}
	
	setGuildIds(guildIds) {
		if (!Array.isArray(guildIds)) {
			throw new TypeError("guildIds is not an array")
		}
		for (let i = 0; i < guildIds.length; i++) {
			if (typeof guildIds[i] !== "string") {
				throw new TypeError(`guildIds[${i}] is not a string`)
			}
		}
		this.guildIds = guildIds
		return this
	}
}

class GuildContextMenuCommandBuilder extends ContextMenuCommandBuilder {
	
	constructor() {
		super()
		this.guildIds = []
		this.isGuildCommand = true
	}
	
	addGuildId(guildId) {
		if (typeof guildId !== "string") {
			throw new TypeError("guildId is not a string")
		}
		this.guildIds.push(guildId)
		return this
	}
	
	setGuildIds(guildIds) {
		if (!Array.isArray(guildIds)) {
			throw new TypeError("guildIds is not an array")
		}
		for (let i = 0; i < guildIds.length; i++) {
			if (typeof guildIds[i] !== "string") {
				throw new TypeError(`guildIds[${i}] is not a string`)
			}
		}
		this.guildIds = guildIds
		return this
	}
}

function filterGlobalCommands(commandArray) {
	return commandArray.filter(c => !c.isGuildCommand)
}

function filterGuildCommands(commandArray, guildId) {
	return commandArray.filter(c => c.guildIds?.includes(guildId))
}

module.exports = {
	GuildContextMenuCommandBuilder,
	GuildSlashCommandBuilder,
	filterGlobalCommands,
	filterGuildCommands,
}
