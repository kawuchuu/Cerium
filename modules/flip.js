module.exports.run = async (bot, message, args) => {
    switch (Math.floor(Math.random() * 50) % 2) {
        case 0:
            message.channel.send("I flipped a coin. Looks like it landed on **Heads!**");
            break;
        case 1:
            message.channel.send("I flipped a coin. Looks like it landed on **Tails!**");
    }
}
module.exports.help = {
    name: "flip",
    desc: "Flips a virtual coin.",
    parms: "None"
}