/***************************************
 * 
 * Cerium: Bot for Discord servers.
 * Copyright (C) 2017 Joshua Walker.
 * This software is under the terms of the MIT Licence.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * My GitHub page: https://github.com/projsh
 * This project's repository: https://github.com/projsh/Cerium
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

var prefix = config.prefix;
var leave = false;
var ecolor = config.embedcolor;
var hostid = config.hostid;
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
    content: "^C EXIT",
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

//When bot is ready
bot.on('ready', () => {
    logBox.log(chalk.green("[INFO] Success! I've logged into the following bot account:", chalk.cyan(bot.user.username)));
    logBox.log(chalk.green("[INFO] Welcome to Cerium " + chalk.cyan("v." + cver) + "\n[INFO] Current prefix is:", chalk.cyan(prefix)));
    bot.setInterval(setGame, 300000);
    setGame();
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        logBox.log(chalk.yellow("[WARNING] Embed colour is invalid. Setting to default colour..."));
        ecolor = "#77162a";
    }
    if (prefix.length == 0) {
        logBox.log(chalk.yellow("[WARNING] Cannot find a valid prefix in config.json. Setting default prefix... (default prefix: !)"));
        prefix = "!";
    }
    if (hostid.length == 0) {
        logBox.log(chalk.red("[ERROR] Cannot find the host's user ID in config.json. Cannot continue operation."));
        process.exit;
    }
});

bot.on("guildMemberAdd", member => {
    if (member.guild.id == 336487228228370432 || bot.user.id == 348759579980595200) { return; } else {
    member.send("This server contains bots that will store user information. **If you do not agree to this, your only recourse is to leave this server.**");
    }
});

//Game selection
function setGame() {
    var presence = {};
    presence.game = {};
    presence.game.type = 0;
    presence.status = "online";
    presence.afk = false;
    
    switch (Math.floor(Math.random() * 1000) % 9) {
        case 0:
            presence.game.name = "a game";
            break;
        case 1:
            presence.game.name = "a youtube video";
            break;
        case 2:
            presence.game.name = "un-breaking";
            break;
        case 3:
            presence.game.name = "something";
            break;
        case 4:
            presence.game.name = "lel";
            break;
        case 5:
            presence.game.name = prefix + "help for help";
            break;
        case 6:
            presence.game.name = "Wow Ethan! Great moves, keep it up! Proud of you!";
            break;
        case 7:
            presence.game.name = "wew";
            break;
        case 8:
            presence.game.name = "v." + cver;
    }
    bot.user.setPresence(presence);
}

fs.readdir("./modules/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        logBox.log(chalk.yellow("[MODULES WARNING] No modules were found. Continuing without modules..."));
        return;
    }

    logBox.log(chalk.cyan("[MODULES] Loading " + modules.length + " modules..."));
    modules.forEach((f, i) => {
        try {
        let props = require(`./modules/${f}`);
            bot.commands.set(props.help.name, props);
        } catch (err) {
            logBox.log(chalk.red("[MODULES ERROR] A module caused an error. Check your modules.\nError => " + err));
            process.exit(1)
        }
    })

    logBox.log(chalk.cyan("[MODULES] Loaded " + modules.length + " modules successfully."));
})

//login
bot.login(config.token).catch(function() {
    logBox.log(chalk.red("[ERROR] Failed to login. Exiting..."));
    process.exit();
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var msg = message.content.substr(config.prefix.length);

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(config.prefix)) return;
    if (msg.includes(config.prefix)) return;
    if (!msg) return;
    let cmd = bot.commands.get(command.slice(config.prefix.length))

    if (cmd) {
        cmd.run(bot, message, args, Discord, config, cver);
    } else {
        message.channel.send("**Error:** Command not found. Type `" + config.prefix + "help` for a list of valid commands.");
    }
});
