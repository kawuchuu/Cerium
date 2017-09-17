module.exports.run = async (bot, message, args, Discord) => {
    const config = require("../config.json");    
    embed = new Discord.RichEmbed("sinfo");
    embed.setAuthor("Server Information");
    embed.setColor(config.embedcolor);
    embed.setDescription("Information about this server.");
    embed.addField("Name:", message.guild.name);
    embed.addField("Server ID:", message.guild.id);
    embed.addField("Creation Date:", message.guild.createdAt.toUTCString());
    if (message.guild.owner.nickname == null) {
        embed.addField("Owner:", message.guild.owner.user.username);
    } else {
        embed.addField("Owner:", message.guild.owner.nickname + " (" + message.guild.owner.user.username + ")");
    }
    embed.setThumbnail(message.guild.iconURL);
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "sinfo",
    desc: "Display's information about the current server/guild.",
    parms: "None"
}