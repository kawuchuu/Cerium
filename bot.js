/***************************************
 * 
 * ProJshBot: Bot for Discord servers.
 * Copyright (C) 2017 Joshua Walker.
 * This program is under the terms of the MIT Licence.
 * This program is free of charge. IF YOU PAID FOR THIS
 * PROGRAM, DEMAND A REFUND.
 * 
 * This project is in early stages and is nowhere near completed.
 * Expect bugs and crashes to occur.
 * 
 * My GitHub page: https://github.com/projsh
 * This project's repository: https://github.com/projsh/ProJshBot
 * 
 * *************************************/

const Discord = require("discord.js");
const config = require("./config.json")
const ytdl = require("ytdl-core");
const chalk = require("chalk");
const bot = new Discord.Client();
const pjbVer = "1.4";

var prefix = config.prefix;
var leave = false;
var ecolor = config.embedcolor;
var hostid = config.hostid;
var playerr = false;
var guildspeak = null;
var channspeak = null;

//When bot is ready
bot.on('ready', (connection, voiceChannel) => {
    console.log(chalk.green("[INFO] Success! I've logged into the following bot account:", chalk.blue(bot.user.username)));
    bot.setInterval(setGame, 300000);
    setGame();
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        console.log(chalk.yellow("[WARNING] Embed colour is invalid. Setting to default colour..."));
        ecolor = "#c374f8";
    }
    if (prefix.length == 0) {
        console.log(chalk.yellow("[WARNING] Cannot find a valid prefix in config.json. Setting default prefix..."));
        prefix = "!";
    }
    if (hostid.length == 0) {
        console.log(chalk.red("[ERROR] Cannot find the host's user ID in config.json. Cannot continue operation."));
        process.exit;
    } else {
        console.log(chalk.green("[INFO] The host's user ID is: " + hostid));
    }
});

bot.on("guildMemberAdd", member => {
    if (!bot.user.id == 341119943682686986) {
    let guild = member.guild;
    embed = new Discord.RichEmbed();
    embed.setAuthor(member.displayName, member.user.displayAvatarURL);
    embed.setColor(ecolor);
    var msg = "Created: " + member.user.createdAt.toUTCString() + "\n";
    if (member.joinedAt.toUTCString() == 0) {
        msg += "Joined: Failed to recieve information.";
    } else {
        msg += "Joined: " + member.joinedAt.toUTCString();
    }
    embed.setDescription(msg);
    embed.setFooter("User ID: " + member.user.id);
    if (guild.id == "332047046217433089") {
        guild.channels.get("340637213198909442").send(":arrow_right: " + member.user);
        guild.channels.get("340637213198909442").send({embed: embed});
    }
    if (guild.id == "300508987126710283") {
        guild.channels.get("340658333600186369").send(":arrow_right: " + member.user);
        guild.channels.get("340658333600186369").send({embed: embed});
    }
    if (guild.id == "270785956599037952") {
        guild.channels.get("340664261141594112").send(":arrow_right: " + member.user);
        guild.channels.get("340664261141594112").send({embed: embed});
    }
    if (guild.id == "336487228228370432") {
        guild.channels.get("340694379276664832").send(":arrow_right: " + member.user);
        guild.channels.get("340694379276664832").send({embed: embed});
    }
    }
});

bot.on("guildMemberRemove", member => {
    if (bot.user.id == 341119943682686986) {
    let guild = member.guild;
    if (guild.id == "332047046217433089") {
        guild.channels.get("340637213198909442").send(":arrow_left: " + member.user);
    }
    if (guild.id == "300508987126710283") {
        guild.channels.get("340658333600186369").send(":arrow_left: " + member.user);
    }
    if (guild.id == "270785956599037952") {
        guild.channels.get("340664261141594112").send(":arrow_left: " + member.user);
    }
    if (guild.id == "336487228228370432") {
        guild.channels.get("340694379276664832").send(":arrow_left: " + member.user);
    }
    }
});

//Game selection
function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 9) {
        case 0:
            presence.game.name = "a game";
            break;
        case 1:
            presence.game.name = "all night long";
            break;
        case 2:
            presence.game.name = "un-breaking";
            break;
        case 3:
            presence.game.name = "trying to defeat astralmod and jxbot";
            break;
        case 4:
            presence.game.name = "lel";
            break;
        case 5:
            presence.game.name = "uhh nothing...";
            break;
        case 6:
            presence.game.name = "not breaking down during the night";
            break;
        case 7:
            presence.game.name = "i can stay online for long periods of time ;)";
            break;
        case 8:
            presence.game.name = "v." + pjbVer;
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
    try {
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
    } catch(error) {
        if (!playerr == true) {
            message.channel.send("**Error:** Failed to play audio. Make sure the URL is correct.");
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
            server.queue.splice(i, 1);
            }
            connection.disconnect();
        } else {
            playerr = false;
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
            server.queue.splice(i, 1);
            }
            connection.disconnect();
        }
    }
}

function shutdown() {
    process.exit();
}

//commands
bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        //Standard Test Message
        case "ping":
            switch (Math.floor(Math.random() * 50) % 7) {
                case 0:
                    message.channel.send("**Pong!** At least I can stay online without breaking during the night!");
                    break;
                case 1:
                    message.channel.send("**Pong!** ちょっと、そこ！");
                    break;
                case 2:
                    message.channel.send("**Pong!** I don't break so easily, unlike AstralMod c;");
                    break;
                case 3:
                    message.channel.send("**Pong!**");
                    break;
                case 5:
                    message.channel.send("**Pong!** Type in !help for more commands!");
                    break;
                case 6:
                    message.channel.send("**Pong!** This is a test message!");
                    break;
            }
        break;
        //Standard Test Message
        case "pong":
            switch (Math.floor(Math.random() * 50) % 6) {
                case 0:
                    message.channel.send("**Ping!** jxbot is better than astralmod c;");
                    break;
                case 1:
                    message.channel.send("**Ping!** ProJshBot's current version is " + pjbVer);
                    break;
                case 3:
                    message.channel.send("**Ping!** Hello!");
                    break;
                case 4:
                    message.channel.send("**Ping!**");
                    break;
                case 5:
                    message.channel.send("**Ping!** hey there");
                    break;
            }
        break;
        //Play Track
        case "play":
        embed = new Discord.RichEmbed("playing");
        embed.setAuthor(bot.user.username + " Music Player", bot.user.displayAvatarURL);
        embed.setFooter("ProJshBot v." + pjbVer);
        embed.setColor(ecolor);

        if (!args[1]) {
            message.channel.send("**Error:** Please add a YouTube link.");
            return;
        }
        var msg = message.content.substr(prefix.length + 5);
        if (!msg.includes("https://www.youtube.com/watch?v=") && !msg.includes("https://youtu.be/")) {
            message.channel.send("**Error:** The URL is invalid.");
            return;
        }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

        if (!message.member.voiceChannel) {
            message.channel.send("**Error:** Please join a voice channel.");
            return;
        }
            var server = servers[message.guild.id]

            try {
            server.queue.push(args[1]);
            ytdl.getInfo(server.queue[0], function(err, info) {
            embed.addField("Added to queue...", info.title);
            message.channel.send({embed: embed});
        });
            } catch(error) {
                message.channel.send("**Error:** Failed to recieve video information. Make sure the URL is correct.")
                playerr = true;
            }
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
        break;
        //Skip Track
        case "skip":
            var server = servers[message.guild.id];
            try {
                if (server.dispatcher) server.dispatcher.end()
                message.channel.send(":track_next: Skipping a track.");
            } catch(error) {
                var server = servers[message.guild.id];
                if (message.guild.voiceConnection)
                {
                for (var i = server.queue.length - 1; i >= 0; i--) 
                {
                server.queue.splice(i, 1);
                }
                server.dispatcher.end();
                console.error;
            }
            return;
        }
        break;
        //Stop Track
        case "stop":
            var server = servers[message.guild.id];
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
            message.channel.send(":stop_button: Stopped and left the voice channel.");
            }
        break;
        //Delete Messages
        case "del":
            var replymsg = message.content.substr(prefix.length + 4)
            if(message.author.id == message.guild.owner.user.id || message.author.id == hostid) {
            if(args.length >= 3){
                message.reply("**Error:** Too many arguments. Usage: `" + prefix + "del [amount]`");
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                var num = parseInt(replymsg);
                if (replymsg.length == 0) {
                    message.channel.send("**Error:** Please enter a number.");
                } else if (num != replymsg) {
                    message.channel.send("**Error:** That's not a number.");
                } else {
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(function() {
                    message.channel.send("**Error:** Failed to delete messages. Make sure I have permission to delete messages.");
                });
                if (replymsg == "1") {
                    message.channel.send("Deleted 1 message.");
                } else {
                    message.channel.send("Deleted " + replymsg + " messages.");
                }
                }
            }
        } else {
            message.reply("**Error:** Only server owners may use this command.");
        }
        break;
        //Bot Version
        case "ver":
            message.channel.send(bot.user.username + "'s version is currently v." + pjbVer);
        break;
        case "say":
        if (message.author.id == hostid) {
                if (args[1] == "set") {
                    try {
                    if (args[2].length > 0) {
                        if (args[3].length > 0) {
                            guildspeak = args[2];
                            channspeak = args[3];
                            var guild = bot.guilds.get(guildspeak);
                            var channel = guild.channels.get(channspeak);
                            message.channel.send("Set the Guild ID to: `" + guildspeak + "` **(" + guild.name + ")** and Channel ID to: `" + guildspeak + "` **(#" + channel.name + ")**").catch(function() {
                                message.channel.send("There was an error.");
                            });
                        }
                    }
                    } catch(error) {
                        message.channel.send("**Error:** Make sure the Guild and Channel IDs are correct.");
                    }
                } else if (guildspeak == null || channspeak == null) {
                    message.channel.send("**Error:** You haven't set a guild or channel yet!");
                } else {
                    try {
                    var guild = bot.guilds.get(guildspeak);
                    var channel = guild.channels.get(channspeak);
                    message.channel.send("I've sent the following message: `" + args[1] + "` on **" + guild.name + "** in the following channel: **#" + channel.name + "**");
                    channel.send(msg);
                    } catch(error) {
                        message.channel.send("There was an error.");
                    }
                }
            } else {
                message.channel.send("**Error:** Only the bot owner can use this command.");
            }
        break;
        //Change User Nickname
        case "nick":
            if (message.author.id == message.guild.owner.user.id) {
                message.reply("**Error:** Failed to set nickname. I can't edit server owners.");
            } else { var msg = message.content
                var nick = msg.substr(prefix.length + 5);
                if (args.length <= 1) {
                    message.reply("I've cleared your nickname.");
                    message.member.setNickname(message.author.username).catch(function(error) {
                        message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
                    });
                } else if (nick == "clear") {
                    message.reply("I've cleared your nickname.");
                    message.member.setNickname(message.author.username).catch(function(error) {
                        message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
                        console.error;
                    });
                } else if (nick.length >= 33) {
                    message.reply("**Error:** Nicknames cannot be longer than 32 characters.");
                } else {
                    message.reply("Set your nickname to `" + nick + "`");
                    message.member.setNickname(nick).catch(function (error) {
                        message.channel.send("**Error:** Failed to set nickname. Make sure I have permission to change and set nicknames.");
                        console.error;
                    });
                }
            }
        break;
        //Bot Uptime
        case "uptime":
            var time;
            var uptime = parseInt(bot.uptime);
            uptime = Math.floor(uptime / 1000);
            var uptimeMinutes = Math.floor(uptime / 60);
            var minutes = uptime % 60;
            var hours = 0;
            while (uptimeMinutes >= 60) {
                hours++;
                uptimeMinutes = uptimeMinutes - 60;
            }
            if (uptimeMinutes < 10) {
                time = hours + ":0" + uptimeMinutes
            } else {
                time = hours + ":" + uptimeMinutes
            }    
            if (hours == 1 && uptimeMinutes == 1) {
                message.channel.send(bot.user.username + " has been online for 1 hour and 1 minute.");
            } else if (hours == 1) {
                message.channel.send(bot.user.username + " has been online for 1 hour and " + uptimeMinutes + " minutes.");
            } else if (uptimeMinutes == 1) {
                message.channel.send(bot.user.username + " has been online for " + hours + " hours and 1 minute.");
            } else {
                message.channel.send(bot.user.username + " has been online for " + hours + " hours and " + uptimeMinutes + " minutes.");
            }
        break;
        //Help Message
        case "help":
            var cmdhelp = message.content.substr(prefix.length + 5);
            if (!args[1]) {
                embed = new Discord.RichEmbed("helpembed");
                embed.setAuthor(bot.user.username + " Help", bot.user.displayAvatarURL);
                embed.setColor(ecolor);
                embed.setDescription("All commands are prefixed with: `"+ prefix + "`\nFor more information, type in `" + prefix + "help [command]`");
                embed.addField("ProJshBot Commands:", "ping \npong \nplay \nskip \nstop \navatar \nver \nnick \nuptime \nsinfo \nhost \nabout \nrtime \nship \nuinfo", true);
                if (message.author.id == message.guild.owner.user.id) {
                embed.addField("For Server Owners:","del \nleave", true);
                }
                if (message.author.id == hostid) {
                    embed.addField("Host Commands:", "poweroff \nleave \nsay", true);
                }
                embed.setFooter("ProJshBot v." + pjbVer);
                message.channel.send({embed: embed});
            } else {
                embed = new Discord.RichEmbed("cmdhelp");
                embed.setAuthor(bot.user.username + " Help", bot.user.displayAvatarURL);
                embed.setColor(ecolor);
                embed.setDescription("Help for `" + prefix + cmdhelp +  "`");
                embed.setFooter("ProJshBot v." + pjbVer);
                if (args.length >= 3) {
                    message.channel.send("**Error:** You can't enter more than one command!");
                } else {
                    switch (cmdhelp) {
                        case "ping":
                            embed.addField("Description:", "Reply's with a message.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "ping");
                            break;
                        case "pong":
                            embed.addField("Description:", "Reply's with a message.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "pong");
                            break;
                        case "play":
                            embed.addField("Description:", "Plays a YouTube video's audio in the current voice channel.");
                            embed.addField("Parameters:", "YouTube video link.");
                            embed.addField("Usage:", prefix + "play [YT link]");
                            break;
                        case "skip":
                            embed.addField("Description:", "Skips a track in the song queue.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "skip");
                            break;
                        case "stop":
                            embed.addField("Description:", "Leaves the current voice channel and clears the queue.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "stop");
                            break;
                        case "avatar":
                            embed.addField("Description:", "Sends a link to your avatar.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "avatar");
                            break;
                        case "ver":
                            embed.addField("Description:", "Displays the bot's current version.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "ver");
                            break;
                        case "nick":
                            embed.addField("Description:", "Set's your nickname.");
                            embed.addField("Parameters:", "Your nickname choice.");
                            embed.addField("Usage:", prefix + "nick [nickname]");
                            break;
                        case "uptime":
                            embed.addField("Description:", "Displays how long the bot has been online for without restarting.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "uptime");
                            break;
                        case "sinfo":
                            embed.addField("Description:", "Displays information about the current server.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "sinfo");
                            break;
                        case "host":
                            embed.addField("Description:", "Displays information about the bot's host computer.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "host");
                            break;
                        case "about":
                            embed.addField("Description:", "Displays information about the bot.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "about");
                            break;
                        case "poweroff":
                            embed.addField("Description:", "Shut's the bot down.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "poweroff");
                            embed.addField("Note:", "This is a host command.");
                            break;
                        case "del":
                            embed.addField("Description:", "Delete's a series of messages.");
                            embed.addField("Parameters:", "Number of messages.");
                            embed.addField("Usage:", prefix + "del [number]");
                            embed.addField("Note:", "This is a server owner and host command.");
                            break;
                        case "leave":
                            embed.addField("Description:", "Leave's the current server.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "leave");
                            embed.addField("Note:", "This is a server owner and host command.");
                            break;
                        case "help":
                            embed.addField("Description:", "Display's all available commands.");
                            embed.addField("Parameters:", "Any command you need help with.");
                            embed.addField("Usage:", prefix + "help [command]");
                            break;
                        case "rtime":
                            embed.addField("Description:", "Displays response time (ping).");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "rtime");
                            break;
                        case "say":
                            embed.addField("Description:", "Sends a message in the desired guild and channel.");
                            embed.addField("Parameters:", "**1**: set, Guild ID, Channel ID.\n**2:** Your message.");
                            embed.addField("Usage:", prefix + "say set [guild id] [channel id]\n" + prefix + "say [message]");
                            embed.addField("Note:", "This is a host command.");
                            break;
                        case "ship":
                            embed.addField("Description:", "Sends you onto a ship with a random person on the server.");
                            embed.addField("Parameters:", "None.");
                            embed.addField("Usage:", prefix + "ship");
                            break;
                        case "uinfo":
                            embed.addField("Description:", "Displays information about a user.");
                            embed.addField("Parameters:", "Any user in the current guild.");
                            embed.addField("Usage:", prefix + "uinfo [user]");
                            embed.addField("Notes:", "Only guild owners and the host may search up other users.");
                            break;
                        default:
                            embed.setAuthor("Error - " + bot.user.username + " Help", "http://i.imgur.com/rZ8dYfw.png")
                            embed.setColor("#E74C3C");
                            embed.setDescription("The following command you entered: `" + cmdhelp + "` does not exist.");
                    }
                    message.channel.send({embed: embed});
                }
            }
        break;
        case "about":
            embed = new Discord.RichEmbed("about");
            embed.setAuthor("ProJshBot v." + pjbVer + " by projsh_", bot.user.displayAvatarURL);
            embed.setColor(ecolor);
            embed.setDescription("A work-in-progress Discord bot.");
            embed.addField("Current Account:", bot.user.username, true);
            embed.addField("Git:", "https://github.com/projsh/ProJshBot", true);
            embed.addField("License:", "https://github.com/projsh/ProJshBot/blob/master/LICENSE", true);
            embed.addField("Report bugs here:", "https://github.com/projsh/ProJshBot/issues", true);
            embed.addField("Readme File:", "https://github.com/projsh/ProJshBot/blob/master/README.md", true);
            embed.addField("Dependencies:", "`discord.js\nopusscript\nytdl-core`", true);
            embed.addField("Programs:", "Node.JS\nAny terminal/console client\nFFmpeg (required for `" + prefix + "play` command)", true);
            embed.setFooter("Current server: " + message.guild.name);
            message.channel.send({embed: embed});
        break;
        //Server Information
        case "sinfo":
            embed = new Discord.RichEmbed("sinfo");
            embed.setAuthor("Server Information");
            embed.setColor(ecolor);
            embed.setDescription("Information about this server.");
            embed.addField("Name:", message.guild.name);
            embed.addField("Server ID:", message.guild.id);
            embed.addField("Creation Date:", message.guild.createdAt.toUTCString());
            embed.addField("Owner:", message.guild.owner.displayName);
            message.channel.send({embed: embed});
        break;
        //User Avatar
        case "avatar":
            var msg = message.content.substr(prefix + 6);
            if (msg.length = 0) {
                message.channel.send(message.user.displayAvatarURL);
            } else {
                try {
                    var msg = message.content.substr(prefix.length + 7);
                    var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
                    var member = message.guild.members.get(findm);
                    message.channel.send(member.user.displayAvatarURL);
                } catch(error) {
                    message.channel.send("**Error:** Cannot find that user.");
                }
            }
        break;
        case "uinfo":
            var msg = message.content.substr(prefix.length + 6);
            embed = new Discord.RichEmbed("userinfo");
            embed.setColor(ecolor);
            embed.setFooter("ProJshBot v." + pjbVer);
            if (msg.includes("@")){
                var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
            } else {
                var findm = message.author.id;
            }    
            try {
                var member = message.guild.members.get(findm);
                embed.setAuthor("User Information for " + member.user.username, member.user.displayAvatarURL);
                embed.addField("Identity:", "**User ID:** " + member.user.id + "\n**Discriminator:** " + member.user.discriminator, true);
                if (member.nickname == null) {
                    embed.addField("Names:", "**Username:** " + member.user.username + "\n**Nickname:** None", true);
                } else {
                    embed.addField("Names:", "**Username:** " + member.user.username + "\n**Nickname:** " + member.nickname, true);
                }
                embed.addField("Dates:", "**User Created:** " + member.user.createdAt.toUTCString() + "\n**User Joined:** " + member.joinedAt.toUTCString());
                try {
                    embed.addField("Display:", "**Status:** " + member.user.presence.status + "\n**Currently playing:** " + member.user.presence.game.name);
                } catch(error) {
                    embed.addField("Display:", "**Status:** " + member.user.presence.status);
                }
                message.channel.send({embed: embed});
            } catch(error) {
                message.channel.send("**Error:** Failed to recieve information.");
            }
        break;
        //Leave Server
        case "leave":
            if (message.author.id == hostid || message.author.id == message.guild.owner.user.id) {
                if (leave == true) {
                    message.channel.send("I've left the server.");
                    message.guild.leave();
                    leave = false;
                } else {
                    message.channel.send("**Warning:** " + bot.user.username + " will leave this server. Type `" + prefix + "leave` once more to confirm. Otherwise, type `" + prefix + "cancel` to cancel the request.");
                    leave = true;
                }
            } else {
                message.channel.send("Only the server owner or the bot's host may use this command.");
            }
        break;
        case "cancel":
            if (message.author.id == hostid || message.author.id == message.guild.owner.user.id) {
                if (!leave == true) {
                    message.channel.send("**Error:** Nothing to cancel.");
                } else {
                    message.channel.send("Cancelled leave request.");
                    leave = false;
                }
            } else {
                message.channel.send("Only the server owner or the bot's host may use this command.");
            }
        break;
        //Power off bot
        case "poweroff":
            if (message.author.id == hostid) {
                message.channel.send("The bot is now shutting down...").then(function() {
                process.exit();
            });
            } else {
                message.channel.send("Only the bot's host may power off the bot.");
            }
        break;
        //User Information
        case "rtime":
            message.channel.send("**Ping!** Response time: " + Math.round(bot.ping) + "ms.");
        break;
        case "ship":
            var shipuser = message.guild.members.random().displayName
            var shipname = message.author.username.substring(0,3) + shipuser.substr(3);
            message.channel.send(":ship: " + message.author.username + " x " + shipuser + " (Ship name: " + shipname + ")");
        break;
        //Host Information
        case "host":
            var time;
            var uptime = parseInt(bot.uptime);
            uptime = Math.floor(uptime / 1000);
            var uptimeMinutes = Math.floor(uptime / 60);
            var minutes = uptime % 60;
            var hours = 0;
            while (uptimeMinutes >= 60) {
                hours++;
                uptimeMinutes = uptimeMinutes - 60;
            }
            if (uptimeMinutes < 10) {
                time = hours + ":0" + uptimeMinutes
            } else {
                time = hours + ":" + uptimeMinutes
            }      
            var os = require("os");
            embed = new Discord.RichEmbed("host");
            embed.setColor(ecolor);
            embed.setAuthor("Host Stats - " + bot.user.username, bot.user.displayAvatarURL);
            embed.addField("Uptime & Response Time:", "Uptime: " + time + "\nResponse Time: " + Math.round(bot.ping), true);
            embed.addField("System:", "OS: " + process.platform + " (" + os.type() + ") " + process.arch + "\nFramework: " + process.release.name + " " + process.version + "\nIdentity: " + os.userInfo().username + " (Username) | " + os.hostname() + " (Hostname)", true);
            embed.setFooter("ProJshBot v." + pjbVer);
            message.channel.send({embed: embed});
        break;
        case "":
        break;
        default:
            message.channel.send("**Error:** Command not found. Type `" + prefix + "help` to see a list of valid commands.");
        break;
    }
});

console.log(chalk.green("[INFO] Welcome to ProJshBot " + chalk.blue("v." + pjbVer + "!") + "\n[INFO] Reading config.json and logging in...\n[WARNING] Make sure ProJshBot has full access to each server.\n[INFO] Current prefix is:", chalk.blue(prefix)));
bot.login(config.token).catch(function() {
    console.log(chalk.red("[ERROR] Failed to login. Are you sure the token is correct? Are you connected to the internet?"));
});