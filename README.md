
# ![alt-text](https://images-ext-2.discordapp.net/external/SP8hY16jjcczwT8zsgAgE4mbkzXH6Mq_LtpjbaM5KP0/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/300513436675080205/5859fea0c4d06c281f3ce2dc39d37136.png?width=50&height=50) Cerium
A fun little Discord bot made by Joshua Walker (projsh_)

Module system by FriendsNone

# Dependencies
- **Packages**
    - `discord.js`
    - `opusscript`
    - `ytdl-core`
    - `chalk`
    - `youtube-search`
- **Programs**
    - Node.js **(v.8.0 or higher. Cerium will not function correctly on older versions.)**
    - Any terminal client
    - FFmpeg (required for music commands)

# `config.json` Contents
This file is required. Feel free to change some settings (for example, the prefix and embed colour)
```json
{
    "token": "Your bot's token goes here",
    "prefix": "!",
    "embedcolor": "#4976D2",
    "hostid": "Your Discord User ID goes here",
    "ver": "2.2",
    "ytskey": "Your YouTube Data API Key goes here (required for search functionality)"
}
```
# Commands Included
|  Core Commands  |  Normal Commands  |  Fun Commands  |  Music Commands  |  Host Commands  |
|:---------------:|:-----------------:|:--------------:|:----------------:|:---------------:|
| ping			  | nick			  | ship		   | play			  | poweroff		|
| pong			  | avatar		      | flip           | skip			  | eval		    |
| about			  | sinfo			  | ud			   | stop			  |	-				|
| -				  | host			  | kiss		   | -				  |	-				|
| -				  | uinfo			  | -			   | -				  |	-				|

# How to install
Here's how you can install and run Cerium on your Discord Servers.
1. Before you continue with anything else, make sure you have the latest version of Node.js. Make sure you're downloading from the `latest` channel. [Click here to visit the Node.js website.](https://nodejs.org) Run `node -v` to verify the version number.
2. Clone this repository using `git clone https://www.github.com/projsh/Cerium.git` (`git` must be installed for this step)
3. In the Cerium directory, run `npm install`. This should install all required packages. If not, install them manually using `npm install [package-name]`.
4. Make sure you have FFmpeg installed. On Windows, all you need is the executable in Cerium's directory.
5. Create the file `config.json` as this file isn't included. The contents of this file should be above this section.
6. Finally, run `node bot.js`. If everything went to plan, your Discord bot should appear online. Congratulations!
