const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: `yönetici-koruması`,
	perm: 4,

	run: async(client, message, db, args) => {

		const { author, guild, channel } = message;
    if(!message.member.permissions.has('ADMINISTRATOR')) {
              return message.reply({ embeds: [ new MessageEmbed().setDescription('<:cross:996678479363969075> | Bu komutunu kullanabilmek için `Yönetici` iznine sahip olman gerekiyor. ').setColor('RED') ] });
            }
		const database = db.fetch(`logChannel_${guild.id}`)
		const adminDatabase = db.fetch(`adminBotDatabase_${guild.id}`)

		if(!database) return message.reply({ embeds: [new MessageEmbed().setDescription('<:cross:996678479363969075> | Bu komutu kullanmak için log kanalını ayarlaman gerekiyor.').setColor('RED') ]})	
		
		if(database) {

			db.set(`adminBotDatabase_${guild.id}`, true)
			message.reply({
				embeds: [
				new MessageEmbed().setDescription(`<:check:996678482266431580> | Sunucuya **yönetici izinli** bot eklenirse onları sunucudan atacağım!`).setColor('GREEN').setFooter({ text:  `${author.tag} tarafından istendi.`, iconURL: author.displayAvatarURL({ dynamic: true })}).setTimestamp()
				]
			})

		}	

	}

};