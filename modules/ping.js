module.exports.run = async (bot, message, args) => {
    const config = require('../config.json');
    switch (Math.floor(Math.random() * 50) % 6) {
        case 0:
            message.channel.send("**Pong!** Here's a lovely message for you!");
            break;
        case 1:
            message.channel.send("**Pong!** I'm better than ever!");
            break;
        case 2:
            message.channel.send("**Pong!** Hey there!");
            break;
        case 3:
            message.channel.send("**Pong!** Looks like I'm online!");
            break;
        case 4:
            message.channel.send("**Pong!** Type in " + config.prefix + "help for more commands!");
            break;
    }
}

module.exports.help = {
    name: "ping",
    desc: "Reply's with a message.",
    parms: "None"
}