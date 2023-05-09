import * as fs from "fs";
import * as path from "path";

export default class EventHandler {
    constructor(_this: any) {
        if (!_this) throw new Error("OPCommands instance is a required parameter.");

        const eventFiles = fs.readdirSync(path.join(process.cwd(), _this.options.eventsDir.toString())).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

        for (const file of eventFiles) {
            const eventFile = require(path.join(process.cwd(), _this.options.eventsDir.toString(), file)).default;
            if ("event" in eventFile && "execute" in eventFile) {
                if (eventFile.once) _this.client.once(eventFile.event, (...args: any) => eventFile.execute(_this.client, ...args));
                else _this.client.on(eventFile.event, (...args: any) => eventFile.execute(_this.client, ...args));
            } else {
                throw new Error(`Event file ${file} is missing required properties.`);
            };
        };
    }
}