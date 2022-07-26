const Moralis = require("moralis/node");

/* Moralis init code */

var NFTs={}
const serverUrl = "https://tyju19glnirm.usemoralis.com:2053/server";
const appId = "938DT4YogQx0odWlISqYb7LMu40FJXx4Acas5SGE";
const masterKey = "TYjekHKuJo8rOkDXd0MRBjUzEOByB7mR4uKeTH52";

const disp=async()=>{
    Moralis.start({ serverUrl, appId, masterKey })
    const options = {
        address: "0x08283e0ea6bd697e66ec043e91ea1217f165e86a",
        chain: "rinkeby"
    }
    NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    module.exports.NFTs=NFTs
}
disp()