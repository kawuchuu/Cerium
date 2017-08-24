module.exports.run = async (bot, message) => {
    message.channel.send("**Ping!** Response time: " + Math.round(bot.ping) + "ms.");    
}
module.exports.help = {
    name: "rtime",
    desc: "Display's response time (ping).",
    parms: "None"
}