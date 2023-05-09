import { Client, GatewayIntentBits } from "discord.js";
import OPCommands from "../src/index";

const BOT_TOKEN = "TOKEN";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

const handler = new OPCommands(client, {
    commandsDir: "commands",
    eventsDir: "events",
    roles: {
        owner: ["1095455197121237103"]
    },
    extra: {
        logs: true
    }
});
handler.refreshCommands("guild", "1102211157693054988", (data: any) => {
    console.log(`Succesfully refreshed ${data.length} command(s).`);
});

client.login(BOT_TOKEN);