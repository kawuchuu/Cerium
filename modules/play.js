module.exports.run = async (bot, message, args, Discord, cver) => {
    const music = require("../player.js");
    const ytdl = require("ytdl-core");
    const config = require("../config.json");

    var npicon = "../pIcon.png";

    var msg = message.content.substr(config.prefix.length + 5);
    if (!msg.includes("https://www.youtube.com/watch?v=") && !msg.includes("https://youtu.be/")) {
        message.channel.send("**Error:** The URL is invalid.");
        return;
    }

    if(!message.member.voiceChannel) return message.channel.send("**Error:** Please join a voice channel.");
    if(!args[0]) return message.channel.send("**Error:** Please add a YouTube link.");
    if(!music.servers[message.guild.id]) music.servers[message.guild.id] = { queue: [] };

    var server = music.servers[message.guild.id];
    try {
    server.queue.push(args[0]);
    ytdl.getInfo(server.queue[0], function(err, info) {
        embed = new Discord.RichEmbed();
        embed.setAuthor(bot.user.username + " Music Player", "https://i.imgur.com/mvwmS9z.png");
        embed.setFooter("Cerium v." + config.ver);
        embed.setColor(config.embedcolor);
        embed.addField("Added to queue...", info.title);
        message.channel.send({embed: embed});
    });
    } catch(error) {
        message.channel.send("**Error:** Failed to recieve video information. Make sure the URL is correct.")
    }

    try {
    if(!message.guild.voiceConnection) {
        message.member.voiceChannel.join().then(function(connection) {
            music.play(connection, message);
        });
    }
    } catch(error) {
        message.channel.send("**Error:** Failed to play. Make sure the URL is correct.")
    }
}
module.exports.help = {
    name: "play",
    desc: "Plays a YouTube video's audio in the current voice channel.",
    parms: "YouTube link",
    usage: "[YT link]"
}