const Moralis = require("moralis/node");

/* Moralis init code */

var NFTs={}
const serverUrl = "https://c4xiote94z8g.usemoralis.com:2053/server";
const appId = "APZgfGuTYtlm1eC289d8i3H4i9x9sb4YPTO7zslz";
const masterKey = "N45gs4KgRRdworKmSmDK66tXg1EXMqbS9yZ01Rjg";

const disp=async()=>{
    Moralis.start({ serverUrl, appId, masterKey })
    const options = {
        address: "0xc642b1f83471690abfc6b12844cdd815e9b739eb",
        chain: "rinkeby"
    }
    NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    module.exports.NFTs=NFTs
}
disp()