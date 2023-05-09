import CommandHandler from "./components/CommandHandler";
import EventHandler from "./components/EventHandler";
import PresetEmbed from "./components/PresetEmbed";
// import "./components/CustomLogger";
// import "./components/PluginSystem";

import * as fs from 'fs';
import { Client, Events, REST, Routes } from "discord.js";

interface Options {
    commandsDir: String,
    eventsDir: String,
    roles?: {
        owner?: String[]
    },
    extra?: {
        logs?: Boolean
    }
};

export default class OPCommands {
    client: any;
    options: Options;

    /**
     * Initializes OPCommands.
     * @param {Client} client 
     * @param {Object} options
     * @constructor
     */
    constructor(client: any, options: Options) {
        if (!client) throw new Error("Client is a required parameter.");
        if (!options) throw new Error("Options is a required parameter.");

        if (!options.commandsDir) throw new Error("Commands directory is a required parameter.");
        if (!options.eventsDir) throw new Error("Events directory is a required parameter.");

        if (!fs.existsSync(options.commandsDir.toString())) throw new Error("Commands directory does not exist.");
        if (!fs.existsSync(options.eventsDir.toString())) throw new Error("Events directory does not exist.");

        this.client = client;
        this.options = options;

        new CommandHandler(this);
        new EventHandler(this);
    }

    /**
     * Sets users with a specific role.
     * @param {String} role
     * @param {String[]} userIds
     */
    async setRole(role: String, userIds: String[]): Promise<void> {
        if (!role) throw new Error("Role is a required parameter.");
        if (!userIds) throw new Error("User IDs is a required parameter.");

        // TODO: Improve role adding system
        eval(`this.options.roles[role] = userIds`);
    }

    /**
     * Gets users with a specific role.
     * @param {String} role
     * @returns {String[]}
     */
    async getRole(role: String): Promise<String[]> {
        if (!role) throw new Error("Role is a required parameter.");

        // TODO: Improve role getting system
        return eval(`this.options.roles[role]`);
    }

    /**
     * Refreshes application commands with the updated ones.
     * @param {String} type
     * @param {String} guildId
     * @param {Function} callback
     */
    async refreshCommands(type: "guild" | "global", guildId?: string, callback?: Function): Promise<void> {
        if (!type) throw new Error("Type is a required parameter.");
        if (type !== "guild" && type !== "global") throw new Error("Type must be either guild or global.");
        if (type === "guild" && !guildId) throw new Error("Guild ID is a required parameter.");

        if (!this.client.commands) throw new Error("Commands are not loaded yet.");

        // TODO: Make it so it listens to the ready event only when there isn't already a listener
        // TODO: Maybe also do something that only refreshes commands when there is a change in the commands folder?
        this.client.on(Events.ClientReady, async () => {
            const commandsArray = this.client.commands.map((command: any) => command.data.toJSON());
            const rest = new REST().setToken(this.client.token);

            try {
                if (type === "global") {
                    const data = await rest.put(
                        Routes.applicationCommands(this.client.application?.id),
                        { body: commandsArray }
                    );

                    if (callback) callback(data);
                }
                else if (type === "guild") {
                    const data = await rest.put(
                        Routes.applicationGuildCommands(this.client.application?.id, guildId as string),
                        { body: commandsArray }
                    );

                    if (callback) callback(data);
                };
            } catch (error) {
                console.error(`Could not refresh commands: ${error}`);
            };
        });
    }
};