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

//When bot is ready
bot.on('ready', () => {
    console.log(chalk.green("[INFO] Success! I've logged into the following bot account:", chalk.blue(bot.user.username)));
    bot.setInterval(setGame, 300000);
    setGame();
    if (config.embedcolor.length == 0 || config.embedcolor.length >= 8) {
        console.log(chalk.yellow("[WARNING] Embed colour is invalid. Setting to default colour..."));
        ecolor = "#77162a";
    }
    if (prefix.length == 0) {
        console.log(chalk.yellow("[WARNING] Cannot find a valid prefix in config.json. Setting default prefix... (default prefix: !)"));
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
            presence.game.name = "v." + cver;
    }
    bot.user.setPresence(presence);
}

fs.readdir("./modules/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log(chalk.yellow("[MODULES WARNING] No modules were found. Continuing without modules..."));
        return;
    }

    console.log(chalk.cyan("[MODULES] Loading " + modules.length + " modules..."));
    modules.forEach((f, i) => {
        try {
        let props = require(`./modules/${f}`);
            bot.commands.set(props.help.name, props);
        } catch (err) {
            console.log(chalk.red("[MODULES ERROR] A module caused an error. Check your modules.\nError => " + err));
            process.exit(1)
        }
    })

    console.log(chalk.cyan("[MODULES] Loaded " + modules.length + " modules successfully."));
})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let array = message.content.split(" ");
    let command = array[0];
    let args  = array.slice(1);

    if (!command.startsWith(config.prefix)) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length))

    if (cmd) {
        cmd.run(bot, message, args, Discord, config, cver);
    } else {
        message.channel.send("**Error:** Command not found. Type `" + config.prefix + "help` for a list of valid commands.");
    }
});

console.log(chalk.green("[INFO] Welcome to Cerium " + chalk.blue("v." + cver) + "\n[INFO] Reading config.json and logging in...\n[INFO] Make sure Cerium has full access to each server.\n[INFO] Current prefix is:", chalk.blue(prefix)));
bot.login(config.token).catch(function() {
    console.log(chalk.red("[ERROR] Failed to login. Exiting..."));
    process.exit();
});
