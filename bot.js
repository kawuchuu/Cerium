/***************************************
 *
 * Cerium -  A fun little Discord bot.
 * Copyright (C) 2017 Joshua Walker.
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
const config = require("./config.json")
const ytdl = require("ytdl-core");
const chalk = require("chalk");
const fs = require("fs");
const blessed = require("blessed");
const bot = new Discord.Client();
const cver = config.ver;

var leave = false;
var playerr = false;
var guildspeak = null;
var channspeak = null;
bot.commands = new Discord.Collection();

//console
var screen = blessed.screen({
    smartCSR: true,
    dockBorders: true
});
screen.title = "Cerium " + cver;

var titleBar = blessed.text({
    top: "0",
    left: "0",
    width: "100%",
    height: "1",
    content: "Cerium Console [v." + cver + "]",
    tags: true,
    style: {
        fg: "black",
        bg: "white"
    },
    padding: {
        left: 1
    }
});
screen.append(titleBar);

var logBox = blessed.log({
    top: 1,
    left: 0,
    width: "100%",
    height: "100%-4",
    tags: true,
    style: {
        fg: 'white',
        bg: 'black',
        scrollbar: {
            bg: 'white'
        }
    },
    padding: {
        left: 1
    },
    scrollable: true,
    alwaysScroll: true,
    scrollOnInput: true,
    scrollbar: true
});
screen.append(logBox);

var bottomBar = blessed.box({
    top: "100%-1",
    left: "0",
    width: "100%",
    height: 1,
    content: "^C EXIT   ^G HELP",
    tags: true,
    style: {
        fg: "black",
        bg: "white"
    },
    padding: {
        left: 1
    }
});
screen.append(bottomBar);

var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'black',
      bg: 'white',
      border: {
        fg: 'white'
      }
    }
});
box.hide();
screen.append(box);

screen.render();

logBox.on("click", function (mouse) {
    while (line.indexOf("\x1b") != -1) {
        var removeStart = line.indexOf("\x1b");
        var removeEnd = line.indexOf("m", removeStart);
        line = line.replace(line.slice(removeStart, removeEnd + 1), "");
    }

    var previousSpace = line.lastIndexOf(" ", x - 2);
    var nextSpace = line.indexOf(" ", x - 2);

    previousSpace++;

    if (nextSpace == -1) {
        nextSpace = line.length;
    }
    var word = line.substring(previousSpace, nextSpace);

    if (word.startsWith("[")) word = word.substr(1);
    if (word.endsWith("]")) word = word.substr(0, word.length - 2);

    var goUpwards = false;
    var top = y + 1;
    if (top + 7 > screen.height) {
        top = y - 7;
        goUpwards = true;
    }

    var left = x - 10;
    if (left + 50 > screen.width) {
        left = screen.width - 50;
    } else if (left < 0) {
        left = 0;
    }
});

screen.key("up", function() {
    logBox.scroll(-1);
    screen.render();
});

screen.key("pageup", function() {
    logBox.scroll(-logBox.height);
    screen.render();
});

screen.key("down", function() {
    logBox.scroll(1);
    screen.render();
});

screen.key("pagedown", function() {
    logBox.scroll(logBox.height);
    screen.render();
});
screen.key("C-c", function() {
    process.exit();
});
screen.key('C-g', function() {
    box.setContent("{center}-===========-\nCERIUM HELP\n-===========-\nNOTE: This is Cerium's console help. For help with bot commands, type in " + config.prefix + "help on a server with Cerium." +
    "\n \n• This is Cerium's console. At this current time, it's a place to keep track on what Cerium's up to.\n• Currently, there isn't a whole lot to talk about. This help box will contain more information later in the future. Press enter to close this box.");
    box.show();
    screen.render();
});
screen.key("enter", function() {
    box.hide();
    screen.render();
});

//ready
bot.on('ready', () => {
    logBox.log(chalk.green("[i] Successfully logged into:", chalk.cyan(bot.user.username)));
    logBox.log(chalk.green("[i] Welcome to Cerium " + chalk.cyan("v." + cver) + "\n[i] Current prefix is:", chalk.cyan(config.prefix)));
    bot.setInterval(setGame, 300000);
    setGame();
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        logBox.log(chalk.yellow("[!] Embed colour is invalid."));
    }
    if (config.prefix.length == 0) {
        logBox.log(chalk.yellow("[!] Cannot find a valid prefix in config.json."));
    }
    if (config.hostid.length == 0) {
        logBox.log(chalk.red("[X] Cannot find the host's user ID in config.json. Cannot continue operation."));
        process.exit;
    }
});

bot.on("guildMemberAdd", member => {
    if (member.guild.id == 336487228228370432) {
        return;
    } else {
        member.send("'" + member.guild.name + "' contains bots that collect user information. If you do not agree, **your only recourse is to leave the server.**");
    }
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
            presence.game.name = "v." + cver;
    }
    bot.user.setPresence(presence);
}

//modules loader
fs.readdir("./modules/", (err, files) => {
    if (err) logBox.log(chalk.red("[X] " + err));

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        logBox.log(chalk.yellow("[M] No modules were found. Continuing without modules..."));
        return;
    }

    logBox.log(chalk.cyan("[M] Loading " + modules.length + " modules..."));
    modules.forEach((f, i) => {
        try {
        let props = require(`./modules/${f}`);
            bot.commands.set(props.help.name, props);
        } catch (err) {
            logBox.log(chalk.red("[X] There is a problem with one of your modules. \n=> " + err));
            process.exit(1)
        }
    })

    logBox.log(chalk.cyan("[M] Loaded " + modules.length + " modules successfully."));
})

//login
bot.login(config.token).catch(function() {
    logBox.log(chalk.red("[X] Failed to login. Press enter or ^C to exit."));
    screen.key("enter", function () {
        process.exit();
    });
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
        cmd.run(bot, message, args, Discord, config, logBox);
    }
});
