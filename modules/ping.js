module.exports.run = async (bot, message, args) => {
    switch (Math.floor(Math.random() * 50) % 7) {
        case 0:
            message.channel.send("**Pong!** Here's a lovely message for you!");
            break;
        case 1:
            message.channel.send("**Pong!** ちょっと、そこ！");
            break;
        case 2:
            message.channel.send("**Pong!** idk what to say. Hello, I guess?");
            break;
        case 3:
            message.channel.send("**Pong!** I'm not dead!");
            break;
        case 5:
            message.channel.send("**Pong!** Type in !help for more commands!");
            break;
        case 6:
            message.channel.send("**Pong!** Badminton is better than ping pong ;)");
            break;
    }
}

module.exports.help = {
    name: "ping",
    desc: "Reply's with a message.",
    parms: "None"
}