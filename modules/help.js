module.exports.run = async (bot, message, args) => { 
    const Discord = require("discord.js");
    const config = require("../config.json");

    if (!args[0]) {
        embed = new Discord.RichEmbed()
            embed.setAuthor(bot.user.username + " Help", bot.user.displayAvatarURL);
            embed.setDescription("For more information, type in `" + config.prefix + "help [command]`");
            embed.addField("Core Commands", "ping\npong\nver\nabout", true);
            embed.addField("Normal Commands", "nick\navatar\nsinfo\nhost\nuinfo", true);
            embed.addField("Fun Commands", "ship\nflip\nud\nkiss", true);
            embed.addField("Music Commands", "play\nskip\nstop", true);
            embed.addField("Host Commands", "poweroff\nleave", true);
            embed.setColor(config.embedcolor);
            embed.setFooter("Cerium v." + config.ver);
        message.channel.send({embed: embed});
    } else try {
        embed = new Discord.RichEmbed();
        embed.setAuthor(bot.user.username + " Help", bot.user.displayAvatarURL);
        embed.setColor(config.embedcolor);
        embed.setDescription("Help for `" + config.prefix + args[0] +  "`");
        embed.setFooter("Cerium v." + config.ver);
        embed.addField("Description:", bot.commands.get(args[0]).help.desc);
        embed.addField("Parameters:", bot.commands.get(args[0]).help.parms);
        if (bot.commands.get(args[0]).help.usage == undefined || bot.commands.get(args[0]).help.usage == "None") {
            embed.addField("Usage:", "`" + config.prefix + args[0] + "`");
        } else {
            embed.addField("Usage:", "`" + config.prefix + args[0] + " " + bot.commands.get(args[0]).help.usage + "`");
        }
        message.channel.send({embed: embed});
    } catch (error) {
        message.channel.send("**Error:** Cannot find help for that command.");
    }
}

module.exports.help = {
    name: "help",
    parms: "None",
    desc: "Displays all available commands."
}