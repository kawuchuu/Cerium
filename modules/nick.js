module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");    
    if (message.author.id == message.guild.owner.user.id) {
        message.reply("**Error:** Failed to set nickname. I can't edit server owners.");
    } else { var msg = message.content
        var nick = msg.substr(config.prefix.length + 5);
        if (nick.length == 0) {
            message.reply("I've cleared your nickname.");
            message.member.setNickname(message.author.username).catch(function(error) {
                message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
            });
        } else if (nick == "clear") {
            message.reply("I've cleared your nickname.");
            message.member.setNickname(message.author.username).catch(function(error) {
                message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
            });
        } else if (nick.length >= 33) {
            message.reply("**Error:** Nicknames cannot be longer than 32 characters.");
        } else {
            message.reply("Set your nickname to `" + nick + "`");
            message.member.setNickname(nick).catch(function (error) {
                message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
            });
        }
    }
}
module.exports.help = {
    name: "nick",
    desc: "Set's your nickname.",
    parms: "Your desired nickname.",
    usage: "[nick]"
}