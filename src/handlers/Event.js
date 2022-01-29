const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

/**
 * Event Handler.
 * @class
 * @param {*} _this
 * @param {String} eventsDir
 */
class EventHandler {
    constructor(_this, eventsDir) {
        if (!_this) throw new Error("[OPCommands] Internal error: missing _this parameter on Event Handler.");
        if (!eventsDir) throw new Error("[OPCommands] Internal error: missing eventsDir parameter on Event Handler.");
        if (!fs.existsSync(eventsDir)) throw new Error("[OPCommands] Unexisting event directory.");

        const files = fs.readdirSync(eventsDir).filter(file => file.endsWith(".js"));

        if (_this.options.logs) console.log("[OPCommands] Loaded " + files.length + " events.");
        for (const file of files) {
            const eventFile = require(path.join(require.main.path, eventsDir, file));
            if (eventFile.settings.once) {
                _this.client.once(eventFile.name, (...args) => { 
                    eventFile.run(_this.client, ...args); 
                    if(_this.options.logs) {
                    console.log('[OPCommands] One-time event executed: ' + eventFile.name)
                    }
                });
            } else {
                _this.client.on(eventFile.name, (...args) => eventFile.run(_this.client, ...args));
            };
        }
    }
}

module.exports = EventHandler;
