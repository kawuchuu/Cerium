/***************************************
 * 
 * ProJshMod: Bot for Discord servers.
 * Copyright (C) 2017 Joshua Walker.
 * This program is under the terms of the MIT Licence.
 * This program is free of charge. IF YOU PAID FOR THIS
 * PROGRAM, DEMAND A REFUND.
 * 
 * This project is in early stages and is nowhere near completed.
 * Expect bugs and crashes to occur.
 * 
 * My GitHub page: https://github.com/projsh
 * This project's repository: https://github.com/projsh/ProJshMod
 * 
 * *************************************/

const Discord = require("discord.js");
const config = require("./config.json");
const YTDL = require("ytdl-core");
const bot = new Discord.Client();
const prefix = "!";
const pjmVer = "0.2"

//When bot is ready
bot.on('ready', () => {
    console.log('[INFO] Ready!')
    bot.setInterval(setGame, 300000);
    setGame();
});

//Game selection
function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 8) {
        case 0:
            presence.game.name = "binary code";
            break;
        case 1:
            presence.game.name = "hungry jacks";
            break;
        case 2:
            presence.game.name = "the burgers are better at hungry jacks";
            break;
        case 3:
            presence.game.name = "drinking a glass of milk";
            break;
        case 4:
            presence.game.name = "annoying josh";
            break;
        case 5:
            presence.game.name = "enjoying my holiday";
            break;
        case 6:
            presence.game.name = "songs in a voice channel";
            break;
        case 7:
            presence.game.name = "crashing myself";
            break;
    }
    bot.user.setPresence(presence);
}

//functions
function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

function userString(user) {
    var u = user;
    if (user.user != null) {
        u = user.user;
    }
    return u.tag;
}

var servers = {}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

//commands
bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        //!ping command
        case "ping":
            message.channel.send(":warning: PONG!");
        break;
        //!play command
        case "play":
            if (!args[1]) {
            message.channel.send(":no_entry_sign: ERROR: Please add a YouTube video link. Usage: `!play [YouTube video]`");
            message.delete();
            return;
        }

        try {
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
        }   catch(error) {
                console.error;
            }

        if (!message.member.voiceChannel) {
            message.channel.send(":no_entry_sign: ERROR: Please join a voice channel.");
            message.delete();
            return;
        }

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
            message.reply(":white_check_mark: OK: Playing in your Voice Channel.");
            message.delete();
        });
        break;
        //!skip command
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end()
            message.reply(":white_check_mark: OK: Skipped a song.");
            message.delete();
        break;
        //!stop command (doesn't work at the moment)
        case "stop":
            //var server = servers[message.guild.id];

            //if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.reply(":information_source: Sorry, but there's currently a bug with `opusscript` that will crash the bot if stopped. This command has been disabled for now. Alternatively, you can continue typing in `!skip` until the queue has finished.");
        break;
        //!del command
        case "del":
            if(message.guild.id == 300508987126710283){
            if(args.length >= 3){
                message.channel.send(':no_entry_sign: ERROR: Too many arguments. Usage: `!del [amount]`');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
                message.reply(":white_check_mark: OK: Deleted " + msg +" messages. (Including the command you just entered!)");
                console.log("[INFO] A staff member deleted " + msg + " messages.");
            }
        } else {
            message.channel.send(":no_entry_sign: ERROR: Cannot use that command in this server.");
        }
        break;
        //!version command
        case "version":
            message.channel.send("ProJshMod's version is currently v." + pjmVer);
        break;
        //!poweroff command
        case "poweroff":
            if (message.author.id == 250726367849611285) {
                message.channel.send("Exit");
                process.exit();
        } else {
            message.reply(":no_entry_sign: NO: Only projsh_ is allowed to turn the bot off.");
        }
        break;
        case "nick":
            if (message.author.id == 250726367849611285) {
                message.reply("I can't edit your nickname. Bots can't edit server owners.");
            } else { var msg = message.content
                var nick = msg.substring(5);
                if (args.length === 1) {
                    message.reply(":white_check_mark: OK: I cleared your nickname.");
                    message.member.setNickname(nick);
                } else {
                    message.reply(":white_check_mark: OK: Set your nickname to `" + nick + "`");
                    message.member.setNickname(nick);
                }
            }
        break;
        //!help command
        case "help":
            var msgHelp = "Here are the commands everyone can use:\n" +
                "**(ALL COMMANDS ARE PREFIXED WITH !)**\n```\n" +
                "ping            Reply's with a message.\n" +
                "play [YT Link]  Plays a YouTube video in the current voice channel.\n" +
                "skip            Skips a song in the song queue.\n" +
                "version         Reply's with ProJshMod's current version.\n" +
                "avatar          Sends a link to your avatar's URL.\n" +
                "nick [nickname] Set's your nickname.\n" +
                "uinfo           Shows information about your user account. (currently in beta)\n```\n";
            if (message.author.id == 250726367849611285) { //Only projsh_ can see this
                msgHelp = msgHelp + "And here are the commands projsh_ can use:\n```\n" +
                "poweroff        Turns off the bot.\n```\n";
            }
        message.author.send(msgHelp);
        message.reply(":arrow_left: Check DMs.");
        message.delete();
        break;
        //!uavatar command
        case "avatar":
            var icon = message.author.displayAvatarURL
            message.channel.send("Here's your avatar URL: " + icon)
        break;
        //test uinfo command (taken & modified from vicr123/AstralMod)
        case "uinfo":
            var member = message.member;
                embed = new Discord.RichEmbed("testembed");
                embed.setColor("#af84ff");
                embed.setAuthor(userString(member), member.user.displayAvatarURL);
                embed.setDescription("Information about " + userString(member));
                {
                    var namemsg = "**Display Name**  " + member.displayName + "\n";
                        if (member.nickname != null) {
                            namemsg += "**Nickname**  " + member.nickname + "\n";
                        } else {
                            namemsg += "**Nickname**  None\n";
                        }
                        namemsg += "**Username**  " + member.user.username + "\n";
                        embed.addField("Names", namemsg);
                }
                {
                    var timemsg = "**User Created**  " + member.user.createdAt.toUTCString() + "\n";
                    if (member.joinedAt.getTime() == 0) {
                        msg += "**User Joined**  ...Discord isn't working correctly. Check back later.\n";
                    } else {
                        timemsg +="**User Joined**  " + member.joinedAt.toUTCString();
                    }
                    embed.addField("Timestamps", timemsg);
                }
                embed.setFooter("ID: " + member.user.id);
                message.channel.send("**THIS COMMAND IS IN BETA. DON'T EXPECT IT TO WORK CORRECTLY.** This command is loosely inspired by vicr123/AstralMod.", {embed: embed});
        }
        
});

bot.login(config.token).catch(function() {
    console.log("[ERROR] Failed to login.");
});