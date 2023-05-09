import * as fs from "fs";
import * as path from "path";
import { Client, Collection, Events } from "discord.js";

export default class CommandHandler {
    constructor(_this: any) {
        if (!_this) throw new Error("OPCommands instance is a required parameter.");

        _this.client.commands = new Collection();
        const commandFiles = fs.readdirSync(path.join(process.cwd(), _this.options.commandsDir.toString())).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(path.join(process.cwd(), _this.options.commandsDir.toString(), file)).default;
            if ("data" in commandFile && "execute" in commandFile) {
                _this.client.commands.set(commandFile.data.name, commandFile);
            } else {
                throw new Error(`Command file ${file} is missing required properties.`);
            };
        };
        
        const utils = {
            hasRole: (role: String, userId: String): Boolean => {
                if (!_this.options.roles[role.toString()]) throw new Error(`Role ${role} is not defined in the options.`);
                return _this.options.roles[role.toString()].includes(userId);
            }
        };

        _this.client.on(Events.InteractionCreate, async (interaction: any) => {
            if (!interaction.isCommand()) return;

            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return console.warn(`Command ${interaction.commandName} does not exist.`);

            try {
                await command.execute(interaction, utils);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "There was an error while executing this command.", ephemeral: true });
            };
        });
    }
}