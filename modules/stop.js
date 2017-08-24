module.exports.run = async (bot, message, args) => {
    const music = require('../player.js');
    var server = music.servers[message.guild.id];
    if (message.guild.voiceConnection) {
        for (var i = server.queue.length - 1; i >= 0; i--) 
        {
            server.queue.splice(i, 1);
        }
    try {
        server.dispatcher.end()
    } catch(error) {
        for (var i = server.queue.length - 1; i >= 0; i--) 
        {
            server.queue.splice(i, 1);
        }
        server.dispatcher.end()
        message.channel.send("error stop");
    }
    message.channel.send("Stopped and left the voice channel.");
    }
}

module.exports.help = {
    name: "stop",
    desc: "Stops the song in the song queue and leaves the current voice channel.",
    parms: "None"
}