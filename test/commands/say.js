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