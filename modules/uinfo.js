module.exports.run = async (bot, message, args, Discord) => {
    const config = require('../config.json');
    var msg = message.content.substr(config.prefix.length + 6);
    if (msg.includes("@")){
        var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
    } else if (msg.length >= 1) {
        var findm = msg;
    } else {
        var findm = message.author.id;
    }
    var member = message.guild.members.get(findm);
    var statusd = member.user.presence.status;
    if (statusd == "online") {
        statusd = "Online";
    }
    if (statusd === "idle") {
        statusd = "Idle";
    }
    if (statusd === "dnd") {
        statusd = "Do Not Disturb";
    }
    if (statusd === "offline") {
        statusd === "Offline";
    }
    var accType = 'Unknown';
    var nick = member.nickname;
    if(member.user.bot){accType = 'Bot'} else {accType = 'User'}
    if(member.nickname == null){nick = 'None';}
    embed = new Discord.RichEmbed()
        embed.setColor(config.embedcolor)
        embed.setAuthor(`${member.user.username}'s User Information - ${bot.user.username}`)
        embed.setThumbnail(member.user.displayAvatarURL)
        embed.setFooter(`Cerium v.${config.ver} \u2022 Created by projsh_`)
        embed.addField('Identity',`**User ID** - ${member.user.id}\n**Discriminator** - ${member.user.discriminator}\n**Type** - ${accType}`, true)
        embed.addField('Names', `**Username** - ${member.user.username}\n**Nickname** - ${nick}`, true)
        embed.addField('Dates', `**Joined** - ${member.joinedAt.toUTCString()}\n**Created** - ${member.user.createdAt.toUTCString()}`)
        try {
            embed.addField('Display', `**Status** - ${statusd}\n**Playing** - ${member.user.presence.game.name}`);
        } catch(err) {
            embed.addField('Display', `**Status** - ${statusd}`);            
        }
        var memberroles = "";
        for ([id, roles] of member.roles) {
            if (roles.name === "@everyone") {
                memberroles = "";
            } else {
                memberroles += `<@&${roles.id}>  `;
            }
        }
        if (memberroles.length === 0) {
            memberroles = "None";
        }
        embed.addField("Roles", memberroles);
        message.channel.send({embed: embed});
}
module.exports.help = {
    name: "uinfo",
    desc: "Display's information about a user.",
    parms: "Your desired user.",
    usage: "[user]"
}
