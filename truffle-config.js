const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const URL = 'https://api.baobab.klaytn.net:8651/';
const PRIVATE_KEY = '0xb3d98ee179ab3d115f24ad25b8237bfe616c3306b53029272bd410e4eac23c40';
const HDWalletProvider = require("truffle-hdwallet-klaytn-provider");
const NETWORK_ID = '1001'
const GASLIMIT = '3000000'


module.exports = {
    networks: {
        testnet: {
            //provider: new HDWalletProvider(PRIVATE_KEY, URL),
            network_id: NETWORK_ID,
            gas: GASLIMIT,
            gasPrice: null,
        }
    },
}