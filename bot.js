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
const config = require("./config.json");
const sinfo = require("./serverinfo.json");
const ytdl = require("ytdl-core");
const bot = new Discord.Client();
const prefix = "!";
const pjbVer = "0.6";

var leave = false;
leave = false;

//When bot is ready
bot.on('ready', () => {
    console.log('[INFO] ProJshBot has successfully logged into Discord!');
    bot.setInterval(setGame, 300000);
    setGame();
});

bot.on("guildMemberAdd", member => {
    let guild = member.guild;
    embed = new Discord.RichEmbed();
    embed.setAuthor(member.displayName, member.user.displayAvatarURL);
    embed.setColor("#af84ff");
    var msg = "Created: " + member.user.createdAt.toUTCString() + "\n";
    if (member.joinedAt.toUTCString() == "Thu, 01 Jan 1970 00:00:00 GMT") {
        msg += "Joined: Failed to recieve joined at information.";
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
});

bot.on("guildMemberRemove", member => {
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
    
});

/*bot.on("messageDelete", function(messages) {
    var channel = null;
    if (messages.first().guild !=null) {
        if(messages.first().guild.id == 332047046217433089) {
            channel = bot.channels.get("340637213198909442");
        }
    }
    if (channel != null) {
        var message = ":wastebucket " + parseInt(messages.length) + " messages in <#" + messages.first().channel.id + "> were deleted.\n"
        for (let [key, msg] of messages) {
            message += "```" + msg.cleanContent + "```";
        }
        channel.send(message);
    }
});*/

//Game selection
function setGame() {
    var presence = {};
    presence.game = {};
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 9) {
        case 0:
            presence.game.name = "i is ded";
            break;
        case 1:
            presence.game.name = "fixing stupid bugs";
            break;
        case 2:
            presence.game.name = "my collar stay poppin'";
            break;
        case 3:
            presence.game.name = "trying to defeat astralmod and jxbot but i'm failing";
            break;
        case 4:
            presence.game.name = "lel";
            break;
        case 5:
            presence.game.name = "england is my city";
            break;
        case 6:
            presence.game.name = "nothing";
            break;
        case 7:
            presence.game.name = "/r/pcmasterrace";
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

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var ownrid = sinfo.owner;

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
                    message.channel.send(":warning: PONG! Tenzij u nederlands weet, vertaalt u dit met behulp van een vertaler!");
                    break;
                case 1:
                    message.channel.send(":warning: PONG! ちょっと、そこ！");
                    break;
                case 2:
                    message.channel.send(":warning: PONG! Hallo, de hamburgers zijn beter bij hongerige jacks. Heb een glas melk, het is goed voor jou en het smaakt goed! Ik heb dit in Javascript geschreven met Discord.js. U heeft dit waarschijnlijk vertaald!");
                    break;
                case 3:
                    message.channel.send(":warning: PONG!");
                    break;
                case 5:
                    message.channel.send(":warning: PONG! Type in !help for more commands!");
                    break;
                case 6:
                    message.channel.send(":warning: PONG! This is a test message!");
                    break;
            }
        break;
        //Standard Test Message
        case "pong":
            switch (Math.floor(Math.random() * 50) % 6) {
                case 0:
                    message.channel.send(":warning: PING! jxbot is better than astralmod c;");
                    break;
                case 1:
                    message.channel.send(":warning: PING! ProJshBot's current version is " + pjbVer);
                    break;
                case 3:
                    message.channel.send(":warning: PING! Hello!");
                    break;
                case 4:
                    message.channel.send(":warning: PING!");
                    break;
                case 5:
                    message.channel.send(":warning: PING! subscribe to dolan dark");
                    break;
            }
        break;
        //Play Track
        case "play":
            if (!args[1]) {
            message.reply(":no_entry_sign: ERROR: Please add a YouTube video link. Usage: `!play [YouTube video]`");
            return;
        }
        var msg = message.content.substr(5);
        if (!msg.includes("https://www.youtube.com/watch?v=")) {
            message.reply(":no_entry_sign: ERROR: Are you sure the URL is correct?");
        } else {

        try {
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
        }   catch(exception) {
                message.reply(":no_entry_sign: ERROR: Failed to play.");
            }

        try {
            if (!message.member.voiceChannel) {
                message.reply(":no_entry_sign: ERROR: Please join a voice channel.");
                return;
            }
        } catch(error) {
            console.error;
        }

        try {
            var server = servers[message.guild.id]
        } catch(exception) {}

        try {
            server.queue.push(args[1]);
        ytdl.getInfo(server.queue[0], function(err, info) {
        try {
            message.channel.send(":arrow_forward: Added to queue: " + info.title);
        } catch (exception) {
            message.channel.send("There was an error.");
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection)
            {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
            }
            server.dispatcher.end();
            }
            return;
        }
    });
        } catch(exception) {}
        try { 
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message)
            });
        } catch(exception) {}
        }
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
            server.dispatcher.end();
            message.channel.send(":stop_button: Stopped and left the voice channel.");
            }
        break;
        //Delete Messages
        case "del":
            if(message.author.id == message.guild.owner.user.id) {
            if(args.length >= 3){
                message.reply(':no_entry_sign: ERROR: Too many arguments. Usage: `!del [amount]`');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
                message.reply(":white_check_mark: OK: Deleted " + msg +" messages.");
            }
        } else {
            message.reply(":no_entry_sign: ERROR: Only owners can use this command.");
        }
        break;
        //Bot Version
        case "version":
            message.channel.send("ProJshBot's version is currently v." + pjbVer);
        break;
        //Power off bot
        case "poweroff":
            if (message.author.id == 250726367849611285) {
                message.reply(":white_check_mark: OK: The bot is now shutting down...").then(function() {
                process.exit();
            });
            }
            if (message.author.id == !250726367849611285) {
                message.reply(":no_entry_sign: NO: Only 1 special person can turn off the bot.");
            }
        break;
        //Change User Nickname
        case "nick":
            if (message.author.id == message.guild.owner.user.id) {
                message.reply(":no_entry_sign: ERROR: Failed to set nickname. Do I have the right permissions? Are you the server owner?");
            } else { var msg = message.content
                var nick = msg.substring(5);
                if (args.length <= 1) {
                    message.reply(":white_check_mark: OK: I cleared your nickname.");
                    message.member.setNickname(nick);
                } else if (nick.length >= 33) {
                    message.reply(":no_entry_sign: ERROR: Nicknames cannot be longer than 32 characters.");
                } else {
                    message.reply(":white_check_mark: OK: Set your nickname to `" + nick + "`");
                    message.member.setNickname(nick);
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
            message.channel.send("ProJshBot has been online for " + time + " hours.");
        break;
        //Help Message
        case "help":
            if (!args[1]) {
                embed = new Discord.RichEmbed("helpembed");
                embed.setAuthor("ProJshBot Help", bot.user.displayAvatarURL);
                embed.setColor("#af84ff");
                embed.setDescription("All commands are prefixed with: `!`");
                embed.addField("ProJshBot Commands:", "!ping \n!pong \n!play \n!skip \n!stop \n!avatar \n!version \n!nick \n!uptime \n!sinfo \n!hinfo \n!about", true);
                if (message.author.id == message.guild.owner.user.id) {
                embed.addField("For Server Owners:","!del \n!leave", true);
                }
                if (message.author.id == 250726367849611285) {
                    embed.addField("Host Commands:", "!poweroff \n!leave", true);
                }
                embed.setFooter("ProJshBot v." + pjbVer);
                message.channel.send({embed: embed});
            //Currently under construction. Doesn't work yet.
            } else {
                embed = new Discord.RichEmbed("cmdhelp");
                embed.setColor("#af84ff");
                embed.setAuthor("ProJshBot Help", bot.user.displayAvatarURL);
                var cmd = message.content.substr(5);
                if (message.content.substr(5) == "ping") {
                    embed.setDescription("Help for: `!ping`");
                    embed.addField("Description:", "Reply's with a message. To see if the bot is running or not.");
                    embed.addField("Usage:", "!ping");
                    message.channel.send({embed: embed});
                } else if (cmd == "play") {
                    embed.setDescription("Help for: `!play`");
                    embed.addField("Description:", "Plays a YouTube video in your voice channel.");
                    embed.addField("Usage:", "!play [YT Link]");
                    embed.addField("Parameter 1:", "Add a YouTube link here.");
                    message.channel.send({embed: embed});
                } else {
                    message.channel.send("Help for certain commands is coming soon!");
                }
            }
        break;
        case "about":
            embed = new Discord.RichEmbed("about");
            embed.setAuthor("ProJshBot v." + pjbVer + " by projsh_", bot.user.displayAvatarURL);
            embed.setColor("#af84ff");
            embed.setDescription("A work-in-progress Discord bot. Made to burn through some spare time ;)");
            embed.addField("Git:", "https://github.com/projsh/ProJshBot", true);
            embed.addField("License:", "https://github.com/projsh/ProJshBot/blob/master/LICENSE", true);
            embed.addField("Report bugs here:", "https://github.com/projsh/ProJshBot/issues", true);
            embed.addField("Readme File:", "https://github.com/projsh/ProJshBot/blob/master/README.md", true);
            embed.addField("Dependencies:", "`discord.js\nopusscript\nytdl-core`", true);
            embed.addField("Programs:", "Node.JS\nAny terminal/console client\nFFmpeg (required for `!play` command)", true);
            embed.setFooter("Current server: " + message.guild.name);
            message.channel.send({embed: embed});
        break;
        //Server Information
        case "sinfo":
            embed = new Discord.RichEmbed("sinfo");
            embed.setAuthor("Server Information");
            embed.setColor("#af84ff");
            embed.setDescription("Shows you some information about this server.");
            embed.addField("Name:", message.guild.name);
            embed.addField("Server ID:", message.guild.id);
            embed.addField("Creation Date:", message.guild.createdAt.toUTCString());
            embed.addField("Owner:", message.guild.owner.displayName);
            message.channel.send({embed: embed});
        break;
        //User Avatar
        case "avatar":
            var icon = message.author.displayAvatarURL
            message.channel.send("Here's your avatar URL: " + icon)
        break;
        //Leave Server
        case "leave":
            if (message.author.id == 250726367849611285 || message.author.id == message.guild.owner.user.id) {
                if (leave == true) {
                    message.channel.send(":white_check_mark: OK, I've left the server now.");
                    message.guild.leave();
                    leave = false;
                } else {
                    message.channel.send(":warning: WARNING: ProJshBot will leave this server. Type `!leave` once more to confirm. Otherwise, type `!cancel` to cancel the request.");
                    leave = true;
                }
            }
        break;
        case "cancel":
            if (message.author.id == 250726367849611285 || message.author.id == message.guild.owner.user.id) {
                if (!leave == true) {
                    message.channel.send(":no_entry_sign: ERROR: Nothing to cancel.");
                } else {
                    message.channel.send(":white_check_mark: OK, cancelling leave request.");
                    leave = false;
                }
            }
        break;
        //User Information
        case "uinfo":
            message.channel.send("This command is being rewritten. If you would like to use the old `!uinfo` command, type in `!olduinfo`.");
        break;
        case "rtime":
            message.channel.send(":warning: PING! Response time: " + bot.ping + "ms.");
        break;
        //Host Information
        case "hinfo":            
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
            var os = require('os');
            embed = new Discord.RichEmbed("hinfo");
            embed.setColor("#af84ff");
            embed.setAuthor("Host Stats", bot.user.displayAvatarURL);
            embed.setDescription("This contains information about the bot's host.");
            embed.addField("Uptime:", time, true);
            embed.addField("Host Operating System:", "Platform: " + process.platform + "\nType: " + os.type(), true);
            embed.addField("Architecture:", process.arch);
            embed.addField("Framework:", process.release.name + " " + process.version, true);
            embed.addField("CPU Usage:", "User: " + process.cpuUsage().user + "μs\nSystem: " + process.cpuUsage().system + "μs", true);
            embed.addField("Total RAM:", os.totalmem() + " bytes");
            embed.addField("Response Time:", bot.ping + " ms", true);
            embed.addField("Host Names:", "Username: " + os.userInfo().username + "\nHostname: " + os.hostname(), true);
            embed.setFooter("ProJshBot v." + pjbVer);
            message.channel.send({embed: embed});
        break;
        //Old User Information (credits: vicr123/AstralMod)
        case "olduinfo":
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
                if (message.author.id == 250726367849611285) {
                    embed.setFooter("ID: " + member.user.id);
                }
                message.channel.send("**THIS COMMAND IS IN BETA. DON'T EXPECT IT TO WORK CORRECTLY.** This command was originated from vicr123/AstralMod and slightly modified. All credits should go to vicr123.", {embed: embed});
                default:
                    message.channel.send(":no_entry_sign: ERROR: Command not found. Type `!help` to see a list of valid commands.");
                break;
    }
        
});

console.log("[INFO] Welcome to ProJshBot v." + pjbVer + "!\n[INFO] Reading config.json and logging in...\n[WARNING] Make sure ProJshBot has full access to each server.");
bot.login(config.token).catch(function() {
    console.log("[ERROR] Failed to login. Are you sure the token is correct? Are you connected to the internet?");
});