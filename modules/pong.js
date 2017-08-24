module.exports.run = async (bot, message, args) => {
    switch (Math.floor(Math.random() * 50) % 6) {
        case 0:
            message.channel.send("**Ping!** jxbot is better than astralmod c;");
            break;
        case 1:
            message.channel.send("**Ping!** Cerium's current version is " + cver);
            break;
        case 3:
            message.channel.send("**Ping!** hai!");
            break;
        case 4:
            message.channel.send("**Ping!**");
            break;
        case 5:
            message.channel.send("**Ping!** Hey there!");
            break;
    }
}
module.exports.help = {
    name: "pong",
    desc: "Reply's with a message.",
    parms: "None"
}