module.exports.run = async (bot, message, args, Discord) => {
    var config = require('../config.json');
    embed = new Discord.RichEmbed("about");
    embed.setAuthor("About - Cerium");
    embed.setThumbnail(bot.user.displayAvatarURL)
    embed.setColor(config.embedcolor);
    embed.addField("General Information","Cerium is a Discord bot created by projsh_\nIt's a free & open-source project available on GitHub.", true);
    embed.addField("Bot Information", `**Version** - v.${config.ver}\n**Account** - ${bot.user.tag}\n**Library** - [discord.js](https://discord.js.org)\n**Runtime** - [Node.js](https://nodejs.org)`, true);
    embed.addField("Links", "[Website](https://projsh.github.io/cerium)\n[Discord Bot List](https://discordbots.org/bot/300513436675080205)\n[GitHub Repo](https://www.github.com/projsh/Cerium)\n[Report Bugs](https://www.github.com/projsh/Cerium/issues)\n[README File](https://github.com/projsh/Cerium/blob/master/README.md)\n[License](https://www.github.com/projsh/Cerium/blob/master/LICENSE)\n", true);

    embed.setFooter("<> with <3 by projsh_");
    message.channel.send({embed: embed});
}
module.exports.help = {
    name: "about",
    parms: "None",
    desc: "Displays information about the bot."
}
