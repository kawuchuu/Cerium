module.exports.run = async (bot, message, args, Discord) => {
    const config = require('../config.json');
    const ytdl = require('ytdl-core');
    const search = require('youtube-search');
    const music = require('../player.js');

    var opts = {
        maxResults: 3,
        key: config.ytskey
    };

    switch(args[0]) {
        case "play":
        var msg = message.content.substr(config.prefix.length + 11);
        if(!message.member.voiceChannel) return message.channel.send("**Error:** Please join a voice channel.");
        if(!msg) return message.channel.send("**Error:** Please add a YouTube link or search query.");
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
                var video = results[0];
                if(results[0].kind == 'youtube#channel') {
                    video = results[1];
                    if (results[1].kind == 'youtube#channel') {
                        video = results[2];
                        if (results[2].link == 'youtube#channel') {
                            video = results[3];
                            if (results[3] == 'youtube#channel') return message.channel.send("**Error** Failed to recieve search results.");
                        }
                    }
                }

                server.queue.push(video.link);
                embed = new Discord.RichEmbed();
                embed.setAuthor(`Music - ${bot.user.username}`, "https://i.imgur.com/mvwmS9z.png");
                embed.setFooter("Cerium v." + config.ver);
                embed.setColor(config.embedcolor);
                embed.setDescription("Added to queue...");
                embed.addField("Title:", video.title);
                embed.addField("Link:", video.link);
                embed.addField("Channel:", video.channelTitle);
                embed.setThumbnail(video.thumbnails.default.url)
                message.channel.send({embed: embed});
                //console.log(chalk.green(`[i] Video Requested: ${chalk.cyan(video.title)} - Guild: ${chalk.cyan(message.guild.name)}`));
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
        break;

        case "pause":
            var server = music.servers[message.guild.id];
            server.dispatcher.pause();
            message.channel.send("Paused the song.");
        break;

        case "resume":
            var server = music.servers[message.guild.id];
            server.dispatcher.resume();
            message.channel.send("Resumed the song.");
        break;

        case "stop":
            //temporary solution.
            try { if (message.guild.voiceConnection) {
                    message.channel.send("Left the voice channel.");
                    message.guild.voiceConnection.disconnect();
                }
            } catch(err) { null }
        break;

        case "skip":
            var server = music.servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send("Skipped the song.");
        break;
    }
}

module.exports.help = {
    name: "music"
}
