
exports.run = async (client, message, args) => {
    const active = await client.db.get(`activated.${message.guild.id}`);
    if(!active) return message.channel.send('Please activate first to use Shoob Category Commands');
    if(!message.guild.id.includes(active)) {
        return message.channel.send('Please activate first to use Shoob Category Commands');
    }
    const ngewe = await client.db.get(`timer.${message.guild.id}`)
    if(!message.member.permissions.any(["MANAGE_GUILD", "ADMINISTRATOR"])) {
        return message.channel.send('<:Mayuri_Failed:772486728300101632>| You need **Manage Server** permission to perform this command!');
    }
    
    if (args[0] == "true") {
        if (ngewe === "true") return message.channel.send({ embed: {
            "description": "<:Mayuri_Failed:772486728300101632>**| Spawntimer for this server is already `on`**",
            "color": "RED"
        }})
        message.channel.send({ embed: {
            "description": "<:Mayuri_Success:772486748864249857>**| Turned `on` the spawntimer!**",
            "color": "GREEN"
        }})
        await client.db.set(`timer.${message.guild.id}`, `true`)
    }
    else if (args[0] == "false")  {
        if (ngewe === "false") return message.channel.send({ embed: {
            "description": "<:Mayuri_Failed:772486728300101632>**| Spawntimer for this server is already `off`**",
            "color": "RED"
        }})
        message.channel.send({ embed: {
            "description": "<:Mayuri_Success:772486748864249857>**| Turned `off` the spawntimer!**",
            "color": "GREEN"
        }})
        await client.db.set(`timer.${message.guild.id}`, `false`)
    }
    else {
        return message.channel.send({ embed: {
            "description": "<:Mayuri_Failed:772486728300101632>| Wrong usage `m!timer true/false`",
            "color": "RED"
        }})
    }
   
}

exports.help = {
    name: "spawntimer",
    name2: "SpawnTimer",
    description: "Set timer when shoob spawn a card",
    usage: "spawntimer <true/false>",
    example: "spawntimer false"
  }
  
  exports.conf = {
    aliases: ["timer"],
    cooldown: 10
  }