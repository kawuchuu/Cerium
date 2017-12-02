module.exports.run = async (bot, message, args, Discord) => {
    var config = require('../config.json');
    embed = new Discord.RichEmbed();
    embed.setColor(config.embedcolor);
    embed.setFooter("Cerium v." + config.ver);
    if (message.author.id == config.hostid) {
    var code = args.join(" ");
    var msg = message.content.substr(config.prefix.length + 5);
    if (msg.length > 300) {
        msg = message.content.substring(config.prefix.length + 5,300);
        var rmchar = message.content.substr(config.prefix.length+5+300);
        if (rmchar.length == 1) {
            msg += "... (1 character remaining...)";
        } else {
            msg += "... \n(" + rmchar.length + " characters remaining...)";
        }
    }
    message.delete();
    try {
        function clean(text) {
            if (typeof(text) === "string") {
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            } else return text;
        }
        var evaled = eval(code);
        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }
        embed.setAuthor(`Eval Result - ${bot.user.username}`);
        embed.addField(":arrow_down_small: Input", "```js\n" + msg + "```");
        embed.addField(":arrow_up_small: Output", "```js\n" + clean(evaled) + "```");
        message.channel.send({embed: embed});
    } catch(error) {
        embed.setAuthor(`Error - Eval - ${bot.user.username}`);
        embed.addField(":no_entry_sign: Error", "```js\n" + error + "```");
        embed.addField(":arrow_down_small: Input", "```js\n" + msg + "```");
        embed.addField(":arrow_up_small: Output", "```js\n" + clean(evaled) + "```");
        embed.setColor("#ff3535");
        message.channel.send({embed: embed});
    }
    } else {
        message.channel.send("**Error:** Only the bot's host may run this command.");
    }
}
module.exports.help = {
    name: "eval",
    desc: "Executes a JavaScript function.",
    parms: "JavaScript function/expression",
    usage: "[JS expression]"
}
