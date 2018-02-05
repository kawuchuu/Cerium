module.exports.run = async (bot, message, args, Discord) => {
    const config = require("../config.json");
    embed = new Discord.RichEmbed("sinfo");
    embed.setAuthor(`Guild Information - ${bot.user.username}`);
    embed.setColor(config.embedcolor);
    embed.setDescription("Information about this guild.");
    embed.addField("Name - ", message.guild.name);
    embed.addField("Server ID - ", message.guild.id);
    embed.addField("Creation Date - ", message.guild.createdAt.toUTCString());
    if (message.guild.owner.nickname == null) {
        embed.addField("Owner - ", message.guild.owner.user.tag);
    } else {
        embed.addField("Owner - ", message.guild.owner.nickname + " (" + message.guild.owner.user.tag + ")");
    }
    embed.setThumbnail(message.guild.iconURL);
    embed.setFooter("Cerium v." + config.ver + " \u2022 Created by projsh_");
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "sinfo",
    desc: "Display's information about the current server/guild.",
    parms: "None"
}
