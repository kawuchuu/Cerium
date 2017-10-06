module.exports.run = async (bot, message, args, Discord, config, cver) => {
    var config = require('../config.json');
    embed = new Discord.RichEmbed("about");
    embed.setAuthor("Cerium v." + config.ver + " by projsh_");
    embed.setColor(config.embedcolor);
    embed.setDescription("A fun little Discord bot. Cerium is licenced under the GNU General Public Licence (v.3.0)");
    embed.addField("Current Account:", bot.user.username, true);
    embed.addField("Total guilds:", bot.guilds.size + " guilds", true);
    embed.addField("Git:", "https://github.com/projsh/Cerium", true);
    embed.addField("License:", "https://github.com/projsh/Cerium/blob/master/LICENSE", true);
    embed.addField("Report bugs:", "https://github.com/projsh/Cerium/issues", true);
    embed.addField("Dependencies:", "`discord.js\nopusscript\nytdl-core\nchalk\nyoutube-search`", true);
    embed.addField("Programs:", "Node.JS (v.8.0 or higher)\nAny terminal/console client\nFFmpeg (required for music commands)", true);
    embed.setFooter("Current guild: " + message.guild.name);
    embed.setThumbnail(bot.user.displayAvatarURL);
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "about",
    parms: "None",
    desc: "Displays information about the bot."
}