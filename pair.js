PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: PRINCE_GDS,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");


function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function PRINCE_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Prince = PRINCE_GDS({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "Chrome (Ubuntu)", ""]
             });
             if(!Pair_Prince.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Prince.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Prince.ev.on('creds.update', saveCreds)
            Pair_Prince.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(1000);
               let b64data = Buffer.from(data).toString('base64');
               Pair_Prince.groupAcceptInvite("Jo5bmHMAlZpEIp75mKbwxP");
               let session = await Pair_Prince.sendMessage(Pair_Prince.user.id, { text: '' + b64data });

               let PRINCE_MD_TEXT = `𝗣𝗥𝗜𝗡𝗖𝗘-𝗚𝗗𝗦 
               
               😍𝙔𝙤𝙪 𝙝𝙖𝙫𝙚 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮 𝙥𝙖𝙞𝙧𝙚𝙙 𝙃𝙚𝙧𝙚 𝙞𝙨 𝙮𝙤𝙪𝙧 𝙎𝙀𝙎𝙎𝙄𝙊𝙉 
               𝙘𝙤𝙥𝙮 𝙞𝙩 𝙖𝙣𝙙 𝙙𝙚𝙥𝙡𝙤𝙮 𝙮𝙤𝙪𝙧 𝙗𝙤𝙩`
 await Pair_Prince.sendMessage(Pair_Prince.user.id,{text:PRINCE_MD_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Prince.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    PRINCE_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await PRINCE_MD_PAIR_CODE()
});
module.exports = router
