# Code Intellisense

Do you need code intellisense for working with file commands? If so, you can use **JSDoc**!

### Example

```javascript
const { Client, Interaction } = require("discord.js"); // import the library classes

// and now use jsdoc!
/**
* This is a description.
* @param {Client} client This gives "client" code intellisense.
* @param {Interaction} interaction And this gives "interaction" code intellisense.
*/
function example(client, interaction) {
  client.user... // now you will have code intellisense!
}
```

### Integrating with OPCommands

```javascript
const { Client, Interaction } = require("discord.js");

module.exports = {
    name: "intellisense",
    description: "A test of code intellisense.",
    limits: {
        owner: false,
        cooldown: "3s",
    },
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    run: (client, interaction) => {
        // you can now write code with the intellisense!
        interaction.reply({ content: "Test" })
    }
}
```
