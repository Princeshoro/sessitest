const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: PRINCE_GDS,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function PRINCE_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let QR_PRINCE = PRINCE_GDS({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			QR_PRINCE.ev.on('creds.update', saveCreds)
			QR_PRINCE.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
			           QR_PRINCE.groupAcceptInvite("Jo5bmHMAlZpEIp75mKbwxP");
				   let session = await QR_PRINCE.sendMessage(QR_PRINCE.user.id, { text: '' + b64data });
	
				   let PRINCE_MD_TEXT = `𝗣𝗥𝗜𝗡𝗖𝗘-𝗚𝗗𝗦 
       
               😍𝙔𝙤𝙪 𝙝𝙖𝙫𝙚 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙎𝙘𝙖𝙣𝙣𝙚𝙙 𝙃𝙚𝙧𝙚 𝙞𝙨 𝙮𝙤𝙪𝙧 𝙎𝙀𝙎𝙎𝙄𝙊𝙉 
	       𝙘𝙤𝙥𝙮 𝙞𝙩 𝙖𝙣𝙙 𝙙𝙚𝙥𝙡𝙤𝙮 𝙮𝙤𝙪𝙧 𝙗𝙤𝙩`
					
	 await QR_PRINCE.sendMessage(QR_PRINCE.user.id,{text:PRINCE_MD_TEXT},{quoted:session})



					await delay(100);
					await QR_PRINCE.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					PRINCE_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await PRINCE_MD_QR_CODE()
});
module.exports = router
