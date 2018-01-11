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
    } else if (statusd == "idle") {
        statusd = "Idle";
    } else if (statusd == "dnd") {
        statusd = "Do Not Disturb";
    } else if (statusd == "offline") {
        statusd == "Offline";
    } else {
        statusd == "Unknown";
    }
    var accType = 'Unknown';
    var nick = member.nickname;
    if(member.user.bot){accType = 'Bot'} else {accType = 'User'}
    if(member.nickname == null){nick = 'None';}
    let embed = new Discord.RichEmbed()
      .setColor(config.embedcolor)
      .setAuthor(`${member.user.username}'s User Information - ${bot.user.username}`)
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter(`Cerium v.${config.ver}`)
      .addField('Identity',`**User ID** - ${member.user.id}\n**Discriminator** - ${member.user.discriminator}\n**Type** - ${accType}`, true)
      .addField('Names', `**Username** - ${member.user.username}\n**Nickname** - ${nick}`, true)
      .addField('Dates', `**Joined** - ${member.joinedAt.toUTCString()}\n**Created** - ${member.user.createdAt.toUTCString()}`)
      .addField('Display', `**Status** - ${statusd}\n**Playing** - ${member.user.presence.game.name}`);
    message.channel.send({embed});
}
module.exports.help = {
    name: "uinfo",
    desc: "Display's information about a user.",
    parms: "Your desired user.",
    usage: "[user]"
}
