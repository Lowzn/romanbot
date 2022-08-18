const { EmbedBuilder } = require(`discord.js`);

module.exports = {
	name: `bot-koruması`,
	perm: 4,

	run: async(client, message, db, args) => {

		const { author, guild, channel } = message;
    if(!message.member.permissions.has('ADMINISTRATOR')) {
              return message.reply({ embeds: [ new EmbedBuilder().setDescription('<:cross:996678479363969075> | Bu komutunu kullanabilmek için `Yönetici` iznine sahip olman gerekiyor. ').setColor('Red') ] });
            }
		const database = db.fetch(`logChannel_${guild.id}`)
		const botDatabase = db.fetch(`botDatabase_${guild.id}`)

		if(!database) return message.reply({ embeds: [new EmbedBuilder().setDescription('<:cross:996678479363969075> | Bu komutu kullanmak için log kanalını ayarlaman gerekiyor.').setColor('Red') ]})	
		
		if(database) {

			db.set(`botDatabase_${guild.id}`, true)
			message.reply({
				embeds: [
				new EmbedBuilder().setDescription(`<:check:996678482266431580> | Sunucuya girecek olan botların **izni yok ise** sunucudan atacağım!`).setColor('Green').setFooter({ text:  `${author.tag} tarafından istendi.`, iconURL: author.displayAvatarURL({ dynamic: true })}).setTimestamp()
				]
			})

		}	

	}

};
