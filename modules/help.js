module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const config = require("../config.json");

    if (!args[0]) {
        embed = new Discord.RichEmbed()
            embed.setAuthor(`Help - ${bot.user.username}`, bot.user.displayAvatarURL);
            embed.setDescription("For more information, type in `" + prefix + "help [command]`");
            embed.addField("Information Commands", "about\nhelp\nrtime\nsinfo\nuinfo\nuptime", true);
            embed.addField("Music Commands", "**Usage:** `" + config.prefix + "music [command]`\nplay\nskip\nstop\npause\nresume", true);
            embed.addField("Miscellaneous Commands", "avatar\nflip\nnick\nping\nship", true);
            embed.setColor(config.embedcolor);
            embed.setFooter("Cerium v." + config.ver + " \u2022 Created by projsh_");
        message.channel.send({embed: embed});
    } else try {
        embed = new Discord.RichEmbed();
        embed.setColor(config.embedcolor);
        embed.setFooter("Cerium v." + config.ver + " \u2022 Created by projsh_");
        embed.setAuthor(`Help - ${bot.user.username}`, bot.user.displayAvatarURL);
        if (args[0] == "music") {
            embed.setAuthor(`Music Help - ${bot.user.username}`, bot.user.displayAvatarURL);
            embed.addField("Play","**Usage:** `" + config.prefix + "music play [search query]`\n**Description:** Plays a YouTube video in your current voice channel.");
            embed.addField("Pause","**Usage:** `" + config.prefix + "music pause`\n**Description:** Pauses the current song.");
            embed.addField("Resume","**Usage:** `" + config.prefix + "music resume`\n**Description:** Resumes the current song if paused.");
            embed.addField("Skip","**Usage:** `" + config.prefix + "music skip`\n**Description:** Skips a song in the queue.");
            embed.addField("Stop","**Usage:** `" + config.prefix + "music stop`\n**Description:** Leaves the current voice channels and clears the queue.");
            message.channel.send({embed: embed});
        } else {
        embed.setDescription("Help for `" + config.prefix + args[0] +  "`");
        embed.addField("Description:", bot.commands.get(args[0]).help.desc);
        embed.addField("Parameters:", bot.commands.get(args[0]).help.parms);
        if (bot.commands.get(args[0]).help.usage == undefined || bot.commands.get(args[0]).help.usage == "None") {
            embed.addField("Usage:", "`" + config.prefix + args[0] + "`");
        } else {
            embed.addField("Usage:", "`" + config.prefix + args[0] + " " + bot.commands.get(args[0]).help.usage + "`");
        }
        message.channel.send({embed: embed});
    }
    } catch (error) {
        message.channel.send("**Error:** Cannot find help for that command.");
    }
}

module.exports.help = {
    name: "help",
    parms: "None",
    desc: "Displays all available commands."
}
