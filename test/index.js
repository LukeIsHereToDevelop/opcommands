const OPCommands = require("../src/OPCommands.js");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: 32767
});

const handler = new OPCommands(client, {
    commandsDir: "commands",
    eventsDir: "events",
    logs: true
});
handler.setBotOwner("OWNER_ID");
handler.setMessages({
    ownerOnly: (interaction) => interaction.reply("Missing **Bot Owner** permission."),
    permissions: (interaction, perms) => interaction.reply(`You are missing the following permissions: **${perms.join(", ")}**`),
    cooldown: (interaction, cooldown) => interaction.reply(`You must wait **${cooldown}** before executing another command.`)
});

client.login("BOT_TOKEN");