# Setup

### Installation

```bash
npm install --save opcommands
```

{% hint style="info" %}
**Node.js v16.6.0+** & **Discord.js v13+** are required.
{% endhint %}

### Setting Up

Here is an example of how OPCommands should look like on your project:

```javascript
const OPCommands = require("opcommands");
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: []
});

const handler = new OPCommands(client, {
    commandsDir: "commands", // your commands' directory
    eventsDir: "events", // your events' directory
    testGuildID: "GUILD_ID", // the ID of the Test Server
    testMode: false, // should OPCommands start in test mode (guild only)?
    logs: true, // should OPCommands log its actions?
    notifyOwner: true // should OPCommands notify the bot owner when the bot goes online?
});
handler.setBotOwner("OWNER_ID"); // sets the bot's owner(s), can be an array or a string
handler.setMessages({
    ownerOnly: (interaction) => interaction.reply("Missing **Bot Owner** permission."),
    permissions: (interaction, perms) => interaction.reply(`You are missing the following permissions: **${perms.join(", ")}**`),
    cooldown: (interaction, cooldown) => interaction.reply(`You must wait **${cooldown}** before executing another command.`),
    notifyOwnerMessage: (owner) => owner.send("I'm online!")
}); // sets the limit messages, not required

client.login("BOT_TOKEN");
```

{% hint style="info" %}
Please refer to the [**API Methods**](../api-documentation/methods.md) page for all the class methods.
{% endhint %}

And here are two examples of how command and event files are structured:

{% tabs %}
{% tab title="Command File" %}
```javascript
module.exports = {
    name: "say",
    description: "Says something.",
    options: [
        {
            type: 3,
            name: "input",
            description: "The input to return.",
            required: true
        }
    ],
    limits: {
        owner: false,
        permissions: ["MANAGE_MESSAGES"],
        cooldown: "3s"
    },
    run: (client, interaction) => {
        interaction.reply({ content: interaction.options.getString("input") });
    }
}
```
{% endtab %}

{% tab title="Event File" %}
```javascript
module.exports = {
    name: "ready",
    settings: {
        once: false
    },
    run: (client) => {
        console.log("I'm online!");
        client.user.setActivity("OPCommands");
    }
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Keep in mind that the first parameter on the event and command files always returns the client.&#x20;
{% endhint %}
