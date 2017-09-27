module.exports.run = async (bot, message, args, Discord) => {
    var config = require('../config.json');
    var msg = message.content.substr(config.prefix.length + 6);
    embed = new Discord.RichEmbed();
    embed.setColor(config.embedcolor);
    embed.setFooter("Cerium v." + config.ver);
    if (!msg) {
        embed.setImage(message.author.displayAvatarURL);
        embed.setAuthor(message.author.username + "'s Avatar");
        message.channel.send({embed: embed});
    } else {
        try {
            var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
            var member = message.guild.members.get(findm);
            embed.setAuthor(member.user.username + "'s Avatar");
            embed.setImage(member.user.displayAvatarURL);
            message.channel.send({embed: embed});
        } catch(error) {
            message.channel.send("**Error:** Cannot find that user.");
        }
    }
}
module.exports.help = {
    name: "avatar",
    desc: "Posts a link to a user's avatar.",
    parms: "Your desired user.",
    usage: "[user]"
}