const Discord = require("discord.js");
const EventHandler = require("./handlers/Event.js");
const CommandHandler = require("./handlers/Command.js");

/**
 * The main class of OPCommands.
 * @class
 * @requires [Node.js v16.6.0](https://nodejs.org/en/download/current/) & Discord.js v13
 * @param {Discord.Client} client
 * @param {Object} options
 * @example
 * const OPCommands = require("opcommands");
 * const Discord = require("discord.js");
 * const client = new Discord.Client();
 * new OPCommands(client, {
 *   commandsDir: "commands",
 *   eventsDir: "events"
 * });
 */
class OPCommands {
    constructor(client, options) {
        if (!client) throw new Error("[OPCommands] Missing Discord client.");
        if (!options) throw new Error("[OPCommands] Missing options.")
        if (!options.commandsDir) throw new Error("[OPCommands] Missing commands' directory parameter on options.");
        if (!options.eventsDir) throw new Error("[OPCommands] Missing events' directory parameter on options.");
        this.client = client;
        this.options = options;

        new CommandHandler(this, options.commandsDir);
        new EventHandler(this, options.eventsDir);
    }

    /**
     * Sets the owner(s) of the bot.
     * @param {*} owner Owner ID(s)
     */
    async setBotOwner(owner) {
        if (!owner) throw new Error("[OPCommands] Missing Owner ID(s).");
        if (typeof owner === "string") return this.client.owners = [owner];
        if (typeof owner === "array") return this.client.owners = owner;
        throw new Error("[OPCommands] Owner parameter must be a String or Array.");
    }

    /**
     * Adds owner(s) of the bot.
     * @param {String} owner Owner ID
     */
    async addBotOwner(owner) {
        if (!owner) throw new Error("[OPCommands] Missing Owner ID.");
        if (typeof owner != "string") throw new Error("[OPCommands] Owner parameter must be a String.");
        return this.client.owners.push(owner);
    }

    /**
     * Sets the limit messages.
     * @param {Object} msgs New messages
     */
    async setMessages(msgs) {
        if (!msgs) throw new Error("[OPCommands] Missing the new messages.");
        if (typeof msgs != "object") throw new Error("[OPCommands] Msgs parameter must be an Object.");
        return this.client.msgs = msgs;
    }
}

module.exports = OPCommands;