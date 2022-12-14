const Discord = require("discord.js");
const { GatewayIntentBits, Partials Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { PREFIX, PORT, TOKEN } = require('./config.json')
const express = require("express")
const app = express();

app.use("*", async (req, res, next) => {
        res.json({ message: "Api!" });
        next();
    });
    app.listen(PORT || 80);

const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = global.client = new Discord.Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});


client.commands = new Collection();

/* Dosyaları Kayıt Etme */
	
readdirSync('./commands').forEach(f => {

	let props = require(`./commands/${f}`)	

	if(props.name) {
		client.commands.set(props.name, props);
		console.log(`[COMMAND] ${props.name} komutu yüklendi. `)
	} else {
		console.log(`[COMMAND] Bu komutun ismini bulamadım.`)
	}

});


readdirSync('./events').forEach(f => {

	let events = require(`./events/${f}`)
	let event = f.split('.')[0];

	client.on(event, (...args) => {
            events(client, ...args)
        });

	console.log(`[EVENT] ${event} eventi yüklendi.`)
});

/* Dosyaları Kayıt Etme */


client.login(process.env.TOKEN || null).then((app) => { 
	console.log(`[TOKEN] Token girişi başarılı.`)
}).catch((err) => {
	console.log(`[TOKEN] Token girişi başarısız.`)
});


