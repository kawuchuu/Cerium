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

bot.commands = new Discord.Collection();

//readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

//ready
bot.on('ready', () => {
    console.log(chalk.green("   [i] Successfully logged into:", chalk.cyan(bot.user.username)));
    console.log(chalk.green("   [i] Welcome to Cerium " + chalk.cyan("v." + config.ver) + "\n   [i] Current prefix is:", chalk.cyan(config.prefix)));
    if(config.beta) {
      console.log(chalk.yellow('   [!] This version of Cerium is currently in beta.'));
    }
    bot.setInterval(setGame, 300000);
    setGame();
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        console.log(chalk.yellow("   [!] Embed colour is invalid."));
    }
    if (config.prefix.length == 0) {
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
    }
    rl.prompt();
});

rl.on('SIGINT', function() {
    rl.question(chalk.cyan('   [?] Are you sure you want to exit? (y/n)'), function(answer) {
        if (answer.match(/^y(es)?$/i)) {
            process.exit(1);
        } else {
            rl.resume();
            rl.prompt();
        }
    });
});

//playing status
function setGame() {
    var presence = {};
    presence.game = {};
    presence.game.type = 0;
    presence.status = "online";
    presence.afk = false;

    switch (Math.floor(Math.random() * 1000) % 2) {
        case 0:
            presence.game.name = "Need help? | " + config.prefix + "help";
            break;
        case 1:
            presence.game.name = "v." + config.ver;
    }
    bot.user.setPresence(presence);
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
    var msg = message.content.substr(config.prefix.length);

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(config.prefix)) return;
    let cmd = bot.commands.get(command.slice(config.prefix.length))

    if (cmd) {
        cmd.run(bot, message, args, Discord, config);
    }
});
