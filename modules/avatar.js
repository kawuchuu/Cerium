module.exports.run = async (bot, message, args, config) => {
    var config = require('../config.json');
    var msg = message.content.substr(config.prefix.length + 6);
    if (!msg) {
        message.channel.send(message.author.displayAvatarURL);
    } else {
        try {
            var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
            var member = message.guild.members.get(findm);
            message.channel.send(member.user.displayAvatarURL);
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