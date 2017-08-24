module.exports.run = async (bot, message, args) => {
    const music = require('../player.js');
    var server = music.servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.end();
    message.channel.send("Skipped a song.");
}

module.exports.help = {
    name: "skip",
    desc: "Skips a track in the song queue.",
    parms: "None"
}