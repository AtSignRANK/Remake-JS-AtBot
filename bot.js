const Discord = require('discord.js');
// const os = require('os');
const fs = require('fs');

const command_prefix = '/';

const client = new Discord.Client();

const token = fs.readFileSync('C:\\Users\\USER\\Desktop\\VSC\\at_bot\\TOKEN.txt', 'utf8');
const anonymityFileLocation = 'C:\\Users\\USER\\Desktop\\VSC\\at_bot\\anonymity.log';

function writeAnonymityLog(data) {
    fs.writeFileSync(anonymityFileLocation, data);
}

client.on('ready', () => {
    console.log(`Login in as ${client.user.tag}!`);
})

client.on('message', msg => {
    if (msg.content == `${command_prefix}discordjs`) {
        msg.channel.send('Discord JS. discord.py service ended!');
    } else if (msg.content == `${command_prefix}server`) {
        const embed = new Discord.MessageEmbed();
        embed.title = "**Show Server Of At Bot**";
        // embed.addField("**DISK**", `${os.freemem() / GB} GB / ${os.totalmem() / GB} GB`, true);

        msg.channel.send(embed)
    } else if (msg.content.startsWith(`${command_prefix}익명`)) { // 익명 : anonymity
        msg.delete();

        const embed = new Discord.MessageEmbed();
        embed.title = "**익명의 누군가**"; // 익명의 누군가 : Person who send message.
        embed.addField("**익명**", msg.content.substring(4, msg.content.length), true);
        msg.channel.send(embed);

        writeAnonymityLog(`G [${msg.guild.id}] S [${msg.author.id}] ${msg.content.substring(4, msg.content.length)}`)
    }
})

client.login(token)