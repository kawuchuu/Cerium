module.exports.run = async (bot, message, args, config) => {
    var msg = message.content.substr(6);
    if (msg.length == 0) {
        message.channel.send(message.author.displayAvatarURL);
    } else {
        try {
            var msg = message.content.substr(7);
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