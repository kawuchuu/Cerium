module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    message.channel.send("This version of the music player is no longer supported. Please use `" + config.prefix + "music stop` instead.\nFor more information, type `" + config.prefix + "help music`.");
}

module.exports.help = {
    name: "stop",
    desc: "Stops the song in the song queue and leaves the current voice channel.",
    parms: "None"
}