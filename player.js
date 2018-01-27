const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const config = require("./config.json");
const bot = new Discord.Client;

function play(connection, message) {
    var server = servers[message.guild.id];
    var servertitle = stitle[message.guild.id];
    try {
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {
        filter: "audioonly"
    }))

    server.queue.shift();
    servertitle.qtitle.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) { 
            play(connection, message);
        }
        else try {
            connection.disconnect();
        } catch (err) {
            console.log(err)
        }
    });
} catch(error) {
    for (var i = server.queue.length - 1; i >= 0; i--) 
        {
        server.queue.splice(i, 1);
        }
        connection.disconnect();
}
}

var servers = {};
var stitle = {};

exports.play = play
exports.servers = servers
exports.stitle = stitle