const Moralis = require("moralis/node");

/* Moralis init code */

var NFTs={}
const serverUrl = "https://c4xiote94z8g.usemoralis.com:2053/server";
const appId = "APZgfGuTYtlm1eC289d8i3H4i9x9sb4YPTO7zslz";
const masterKey = "N45gs4KgRRdworKmSmDK66tXg1EXMqbS9yZ01Rjg";

const disp=async(contract)=>{
    Moralis.start({ serverUrl, appId, masterKey })
    const options = {
        address: contract,
        chain: "rinkeby"
    }
    NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    return NFTs
}
module.exports.disp=disp