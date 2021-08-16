module.exports = {
    name: "test",
    description: "Test command",
    limits: {
        owner: true,
        permissions: ["ADMINISTRATOR"],
        cooldown: "20s"
    },
    run: (client, interaction) => {
        interaction.reply({ content: "test" });
    }
}