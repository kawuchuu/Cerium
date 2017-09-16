module.exports.run = async (bot, message, args, Discord, config, cver) => {
    embed = new Discord.RichEmbed("about");
    embed.setAuthor("Cerium v." + cver + " by projsh_");
    embed.setColor(config.embedcolor);
    embed.setDescription("A Discord bot. What else should I say?");
    embed.addField("Current Account:", bot.user.username, true);
    embed.addField("Total guilds:", bot.guilds.size + " guilds");
    embed.addField("Git:", "https://github.com/projsh/Cerium", true);
    embed.addField("License:", "https://github.com/projsh/Cerium/blob/master/LICENSE", true);
    embed.addField("Report bugs here:", "https://github.com/projsh/Cerium/issues", true);
    embed.addField("Readme File:", "https://github.com/projsh/Cerium/blob/master/README.md", true);
    embed.addField("Dependencies:", "`discord.js\nopusscript\nytdl-core\nchalk`", true);
    embed.addField("Programs:", "Node.JS\nAny terminal/console client\nFFmpeg (required for `" + config.prefix + "play` command)", true);
    embed.setFooter("Current guild: " + message.guild.name);
    embed.setThumbnail(bot.user.displayAvatarURL);
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "about",
    parms: "None",
    desc: "Displays information about the bot."
}