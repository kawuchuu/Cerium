module.exports.run = async (bot, message, args, Discord, cver) => {
    const music = require("../player.js");
    const ytdl = require("ytdl-core");
    const config = require("../config.json");

    const search = require("youtube-search");
    var opts = {
        maxResults: 1,
        key: config.ytskey
      };

    var msg = message.content.substr(config.prefix.length + 5);

    if(!message.member.voiceChannel) return message.channel.send("**Error:** Please join a voice channel.");
    if(!args[0]) return message.channel.send("**Error:** Please add a YouTube link or search query.");
    if(!music.servers[message.guild.id]) music.servers[message.guild.id] = { queue: [] };

    var server = music.servers[message.guild.id];
    try {
        if (args[0].startsWith("https://www.youtube.com/watch?v=") && args[0].startsWith("https://youtu.be/")) {
            var video = args[0];
    } else {
        search(msg, opts, function(err, results) {
            if(err) {
                return message.channel.send("**Error:** Failed to recieve search results.");
            }
            if(results[0].kind == 'youtube#channel') return message.channel.send("**Error:** Failed to recieve search results.");
            var video = results[0].link;
            server.queue.push(video);
            embed = new Discord.RichEmbed();
            embed.setAuthor(bot.user.username + " Music Player", "https://i.imgur.com/mvwmS9z.png");
            embed.setFooter("Cerium v." + config.ver);
            embed.setColor(config.embedcolor);
            embed.setDescription("Added to queue...");
            embed.addField("Title:", results[0].title);
            embed.addField("Link:", results[0].link);
            embed.addField("Channel:", results[0].channelTitle);
            message.channel.send({embed: embed});
        });
    }
    } catch(error) {
        message.channel.send("**Error:** Failed to recieve video information.");
        console.error(error);
    }

    try {
    if(!message.guild.voiceConnection) {
        message.member.voiceChannel.join().then(function(connection) {
            music.play(connection, message);
        });
    }
    } catch(error) {
        message.channel.send("**Error:** Failed to play.")
    }
}
module.exports.help = {
    name: "play",
    desc: "Plays a YouTube video's audio in the current voice channel.",
    parms: "YouTube link | Search query",
    usage: "[YT link | Search query]"
}