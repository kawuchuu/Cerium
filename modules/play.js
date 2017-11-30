module.exports.run = async (bot, message, args, Discord, cver) => {
    const config = require("../config.json");
    message.channel.send("This version of the music player is no longer supported. Please use `" + config.prefix + "music play` instead.\nFor more information, type `" + config.prefix + "help music`.");
}
module.exports.help = {
    name: "play",
    desc: "Plays a YouTube video's audio in the current voice channel.",
    parms: "YouTube link | Search query",
    usage: "[YT link | Search query]"
}