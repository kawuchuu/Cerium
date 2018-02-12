module.exports.run = async (bot, message, args, Discord) => {
    const config = require("../config.json");
    embed = new Discord.RichEmbed("sinfo");
    embed.setAuthor(`Guild Information - ${bot.user.username}`);
    embed.setColor(config.embedcolor);
    embed.setDescription("Information about this guild.");
    var usrcount = 0;
    var botcount = 0;
    for ([id, members] of message.guild.members) {
        if (members.user.bot) {
            botcount = botcount + 1;
        } else {
            usrcount = usrcount + 1;
        }
    }
    if (message.guild.owner.nickname == null) {
        var owner = message.guild.owner.user.tag;
    } else {
        var owner = message.guild.owner.nickname + " (" + message.guild.owner.user.tag + ")";
    }
    embed.addField('Members', `Users - ${usrcount}\nBots - ${botcount}\nTotal - ${message.guild.members.size}`, true);
    embed.addField('General', `**Name** - ${message.guild.name}\n**Server ID** - ${message.guild.id}\n**Creation Date** - ${message.guild.createdAt.toUTCString()}\n**Owner** - ${owner}`, true);
    var rolename = "";
    for ([id, roles] of message.guild.roles) {
        if (roles.name === "@everyone") {
            rolename += `${roles.name}  `;
        } else {
            rolename += `<@&${roles.id}>  `;
        }
    }
    embed.addField("Roles", rolename)
    embed.setThumbnail(message.guild.iconURL);
    embed.setFooter("Cerium v." + config.ver + " \u2022 Created by projsh_");
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "sinfo",
    desc: "Display's information about the current server/guild.",
    parms: "None"
}
