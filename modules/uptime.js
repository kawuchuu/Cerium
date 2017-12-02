module.exports.run = async (bot, message, args, Discord) => {
    var config = require('../config.json');
    embed = new Discord.RichEmbed();
    var time;
    var uptime = parseInt(bot.uptime);
    uptime = Math.floor(uptime / 1000);
    var uptimeMinutes = Math.floor(uptime / 60);
    var minutes = uptime % 60;
    var hours = 0;
    while (uptimeMinutes >= 60) {
        hours++;
        uptimeMinutes = uptimeMinutes - 60;
    }
    embed.setAuthor(`Uptime - ${bot.user.username}`);
    embed.setFooter("Cerium v." + config.ver);
    embed.setColor(config.embedcolor);
    if (hours == 1 && uptimeMinutes == 1) {
        embed.setDescription(bot.user.username + " has been online for 1 hour and 1 minute.");
    } else if (hours == 1) {
        embed.setDescription(bot.user.username + " has been online for 1 hour and " + uptimeMinutes + " minutes.");
    } else if (uptimeMinutes == 1) {
        embed.setDescription(bot.user.username + " has been online for " + hours + " hours and 1 minute.");
    } else {
        embed.setDescription(bot.user.username + " has been online for " + hours + " hours and " + uptimeMinutes + " minutes.");
    }
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "uptime",
    desc: "Displays how long the bot has been online.",
    parms: "None"
}
