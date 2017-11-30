module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    message.channel.send("This version of the music player is no longer supported. Please use `" + config.prefix + "music skip` instead.\nFor more information, type `" + config.prefix + "help music`.");
}

module.exports.help = {
    name: "skip",
    desc: "Skips a track in the song queue.",
    parms: "None"
}