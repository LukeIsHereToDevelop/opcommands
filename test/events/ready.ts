import { Events } from "discord.js";

export default {
    event: Events.ClientReady,
    once: true,
    async execute(client: any) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
}