module.exports.run = async (bot, message, args) => {
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
    if (hours == 1 && uptimeMinutes == 1) {
        message.channel.send(bot.user.username + " has been online for 1 hour and 1 minute.");
    } else if (hours == 1) {
        message.channel.send(bot.user.username + " has been online for 1 hour and " + uptimeMinutes + " minutes.");
    } else if (uptimeMinutes == 1) {
        message.channel.send(bot.user.username + " has been online for " + hours + " hours and 1 minute.");
    } else {
        message.channel.send(bot.user.username + " has been online for " + hours + " hours and " + uptimeMinutes + " minutes.");
    }
}
module.exports.help = {
    name: "uptime",
    desc: "Displays how long the bot has been online.",
    parms: "None"
}