module.exports.run = async (bot, message, args, Discord, config, cver) => {
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
    if (uptimeMinutes < 10) {
        time = hours + ":0" + uptimeMinutes
    } else {
        time = hours + ":" + uptimeMinutes
    }      
    var os = require("os");
    embed = new Discord.RichEmbed("host");
    embed.setColor(config.embedcolor);
    embed.setAuthor("Host Stats - " + bot.user.username, bot.user.displayAvatarURL);
    embed.addField("Uptime & Response Time:", "Uptime: " + time + "\nResponse Time: " + Math.round(bot.ping), true);
    embed.addField("System:", "OS: " + process.platform + " (" + os.type() + ") " + process.arch + "\nFramework: " + process.release.name + " " + process.version + "\nIdentity: " + os.userInfo().username + " (Username) | " + os.hostname() + " (Hostname)", true);
    embed.setFooter("Cerium v." + cver);
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "host",
    desc: "Displays information about the host's computer.",
    parms: "None"
}