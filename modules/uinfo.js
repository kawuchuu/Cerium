module.exports.run = async (bot, message, args, Discord) => {
    const config = require("../config.json");
    var msg = message.content.substr(config.prefix.length + 6);
    embed = new Discord.RichEmbed("userinfo");
    embed.setColor(config.embedcolor);
    embed.setFooter("Cerium v." + config.ver);
    if (msg.includes("@")){
        var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
    } else if (msg.length >= 1) {
        var findm = msg;
    } else {
        var findm = message.author.id;
    }    
    try {
        var member = message.guild.members.get(findm);
        embed.setAuthor("User Information for " + member.user.username);
        if (member.user.bot) {
            embed.addField("Identity:", "**User ID:** " + member.user.id + "\n**Discriminator:** " + member.user.discriminator + "\n**Note:** This user is a bot account.", true);
        } else {
            embed.addField("Identity:", "**User ID:** " + member.user.id + "\n**Discriminator:** " + member.user.discriminator, true);                    
        }
        if (member.nickname == null) {
            embed.addField("Names:", "**Username:** " + member.user.username + "\n**Nickname:** None", true);
        } else {
            embed.addField("Names:", "**Username:** " + member.user.username + "\n**Nickname:** " + member.nickname, true);
        }
        embed.addField("Dates:", "**User Created:** " + member.user.createdAt.toUTCString() + "\n**User Joined:** " + member.joinedAt.toUTCString());
        try {
            embed.addField("Display:", "**Status:** " + member.user.presence.status + "\n**Currently playing:** " + member.user.presence.game.name);
        } catch(error) {
            embed.addField("Display:", "**Status:** " + member.user.presence.status);
        }
        embed.setThumbnail(member.user.displayAvatarURL);
        message.channel.send({embed: embed});
    } catch(error) {
        message.channel.send("**Error:** Failed to recieve information.");
    }
}
module.exports.help = {
    name: "uinfo",
    desc: "Display's information about a user.",
    parms: "Your desired user.",
    usage: "[user]"
}