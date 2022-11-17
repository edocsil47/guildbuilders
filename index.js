const { SlashCommandBuilder, ContextMenuCommandBuilder } = require("discord.js")

module.exports.GuildSlashCommandBuilder = class extends SlashCommandBuilder {
	
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

module.exports.GuildContextMenuCommandBuilder = class extends ContextMenuCommandBuilder {
	
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
