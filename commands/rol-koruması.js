const { MessageEmbed } = require(`discord.js`);

module.exports = {
	name: `rol-koruması`,
	perm: 3,

	run: async(client, message, db, args) => {

		const { author, guild, channel } = message;
    if(!message.member.permissions.has('MANAGE_ROLES')) {
              return message.reply({ embeds: [ new MessageEmbed().setDescription('<:cross:996678479363969075> | Bu komutunu kullanabilmek için `Rolleri Yönet` iznine sahip olman gerekiyor. ').setColor('RED') ]});
            }
		const database = db.fetch(`logChannel_${guild.id}`)
		const roleDatabase = db.fetch(`guardRole_${guild.id}`)

		if(!database) return message.reply({ embeds: [new MessageEmbed().setDescription('<:cross:996678479363969075> | Bu komutu kullanmak için log komutunu aktif edin.').setColor('RED') ]})	
		
		if(database) {

			if(roleDatabase) return message.reply({ embeds: [new MessageEmbed().setDescription(`<:cross:996678479363969075> | Rol koruması zaten aktif edilmiş.`)] })			

			if(!roleDatabase) {

				db.set(`guardRole_${guild.id}`, true)
				message.reply({ embeds: [new MessageEmbed().setDescription('<:check:996678482266431580> | Rol koruması **aktif** edildi!').setColor('GREEN').setFooter({ text:  `${author.tag} tarafından istendi.`, iconURL: author.displayAvatarURL({ dynamic: true })}).setTimestamp()] })

			}				

		}	

	}

};