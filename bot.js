/***************************************
 *
 * Cerium -  A fun little Discord bot.
 * Copyright (C) 2018 Joshua Walker.
 * This software is under the terms of the GNU General Public Licence (v.3.0).
 *
 * You should have recieved a copy of this licence along with this bot.
 * If not, please visit the following website: http://www.gnu.org/licenses
 *
 * My GitHub page: https://github.com/projsh
 * Git: https://github.com/projsh/Cerium.git
 *
 * *************************************/

const Discord = require("discord.js");
const config = require("./config.json");
const ytdl = require("ytdl-core");
const chalk = require("chalk");
const fs = require("fs");
const readline = require('readline');
const bot = new Discord.Client();

global.prefix = "config.prefix";

bot.commands = new Discord.Collection();

//readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

//dbl
if (!config.beta) {
    const dbl = require("dblposter");
    const dblposter = new dbl(config.dblkey);
    dblposter.bind(bot);
}

//ready
bot.on('ready', () => {
    console.log(chalk.green("   [i] Successfully logged into:", chalk.cyan(bot.user.username)));
    console.log(chalk.green("   [i] Welcome to Cerium " + chalk.cyan("v." + config.ver) + "\n   [i] Current prefix is:", chalk.cyan(prefix)));
    if(config.beta) {
      console.log(chalk.yellow('   [!] This version of Cerium is currently in beta.'));
    }
    bot.user.setActivity(`${prefix}help | v.${config.ver}`, { type: "LISTENING" });
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        console.log(chalk.yellow("   [!] Embed colour is invalid."));
    }
    if (prefix.length == 0) {
        console.log(chalk.yellow("   [!] Cannot find a valid prefix in config.json."));
    }
    if (config.hostid.length == 0) {
        console.log(chalk.red("   [X] Cannot find the host's user ID in config.json. Cannot continue operation."));
        process.exit;
    }
    rl.prompt();
    bot.on('guildCreate', guild => {
        console.log(chalk.green(`[i] Guild Added: ${chalk.cyan(guild.name)} - ${chalk.cyan('ID:')} ${chalk.green(guild.id)} - ${chalk.cyan('OWNER:')} ${chalk.green(guild.owner.user.tag)}`));
        rl.prompt();
    });
    bot.on('guildDelete', guild => {
        console.log(chalk.green(`[i] Guild Removed: ${chalk.cyan(guild.name)} - ${chalk.cyan('ID:')} ${chalk.green(guild.id)} - ${chalk.cyan('OWNER:')} ${chalk.green(guild.owner.user.tag)}`));
        rl.prompt();
    });
});

rl.on('line', function(cmd){
    var args = cmd.split(" ");
    switch(args[0]) {
        case "guilds":
            if (bot.guilds.size === 0) {
                console.log(chalk.yellow('   [!] No guilds found.'));
            } else {
                for ([id, guild] of bot.guilds) {
                    console.log(`   ${chalk.cyan(guild.name)} - ${chalk.cyan('ID:')} ${chalk.green(guild.id)} - ${chalk.cyan('OWNER:')} ${chalk.green(guild.owner.user.tag)}`);
                }
            }
            break;
        case "gmembers":
            if (!args[1]) {
                console.log(chalk.yellow('   [!] Please insert the guild\'s ID.'));
            } else {
                try {
                    var guild = bot.guilds.get(args[1]);
                    for ([id, member] of guild.members) {
                        var usr = `   ${chalk.cyan(member.user.tag)} - ${chalk.green(member.user.id)}`;
                        if (member.user.bot) {
                            usr = `   ${chalk.cyan(member.user.tag)} [BOT] - ${chalk.green(member.user.id)}`
                        }
                        console.log(usr);
                    }
                } catch(err) {
                    console.log(chalk.red('   [X] That guild cannot be found.'));
                }
            }
            break;
        case "leave":
            if (!args[1]) {
                console.log(chalk.yellow('   [!] Please insert the guild\'s ID.'));
            } else {
                var guild = bot.guilds.get(args[1]);
                guild.leave();
            }
            break;
        case "setgame":
            if (!args[1]){
                console.log(chalk.yellow("   [!] Please enter a message to display"));
            } else {
                if (args[1] === "playing" || args[1] === "streaming" || args[1] === "listening" || args[1] === "watching") {
                    var ptype = args[1];
                    var msg = cmd.substr(13 + args[1].length);
                } else {
                    var ptype = "playing";
                    var msg = cmd.substr(12);
                }
                if (args[1] === "default" || args[1] === "reset") {
                    bot.user.setActivity(`${prefix}help | v.${config.ver}`, { type: "LISTENING" });
                    console.log(chalk.green(`   [i] Set presence to the default message.`));
                } else {
                    bot.user.setActivity(msg, { type: ptype });
                    console.log(chalk.green(`   [i] Set presence type to '${chalk.cyan(ptype)}' and message to ${chalk.cyan(msg)}.`));
                }
            }
            break;
        case "exit":
            rl.question(chalk.cyan('   [?] Are you sure you want to exit? (y/n)'), function(answer) {
                if (answer.match(/^y(es)?$/i)) {
                    process.exit(0);
                } else {
                    rl.prompt();
                }
            });
            break;
        case "help":
            var msg = chalk.green(`   ${chalk.cyan('Cerium Console Help')}\n   ===================`);
            msg += chalk.green(`\n   ${chalk.cyan('guilds')} - Display all available guilds.\n   ${chalk.cyan('gmembers [guild id]')} - Display all members in a guild.`);
            msg += chalk.green(`\n   ${chalk.cyan('leave [guild id]')} - Leaves a guild.\n   ${chalk.cyan('setgame [presence] [message]')} - Sets Cerium's presence.\n   ${chalk.cyan('exit')} - Exits Cerium.`);
            console.log(msg);
            break;
        case "setprefix":
            prefix = cmd.substr(7);
    }
    rl.prompt();
});

rl.on('SIGINT', function() {
    rl.question(chalk.cyan('   [?] Are you sure you want to exit? (y/n)'), function(answer) {
        if (answer.match(/^y(es)?$/i)) {
            process.exit(0);
        } else {
            rl.resume();
            rl.prompt();
        }
    });
});

//dbl
if (!config.beta) {
    const dbl = require("dblposter");
    const dblposter = new dbl(config.dblkey);
    dblposter.bind(bot);
}

//modules loader
fs.readdir("./modules/", (err, files) => {
    if (err) console.log(chalk.red("   [X] " + err));

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log(chalk.yellow("   [M] No modules were found. Continuing without modules..."));
        return;
    }

    console.log(chalk.cyan("   [M] Loading " + modules.length + " modules..."));
    modules.forEach((f, i) => {
        try {
        let props = require(`./modules/${f}`);
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log(chalk.red("   [X] There is a problem with one of your modules. \n=> " + err));
            process.exit(1)
        }
    });
    console.log(chalk.cyan("   [M] Loaded " + modules.length + " modules successfully."));
});

//login
bot.login(config.token).catch(function() {
    console.log(chalk.red("   [X] Failed to login."));
    rl.prompt();
});

//command handler
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var msg = message.content.substr(prefix.length);

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length))

    if (cmd) {
        cmd.run(bot, message, args, Discord, config);
    }
});
