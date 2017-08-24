module.exports.run = async (bot, message, cver) => {
    const config = require("../config.json");    
    message.channel.send(bot.user.username + "'s current version is " + config.ver);
}
module.exports.help = {
    name: "ver",
    desc: "Display's the bot's current version",
    parms: "None"
}