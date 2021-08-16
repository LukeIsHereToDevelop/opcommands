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