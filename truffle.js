const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const URL = 'https://api.baobab.klaytn.net:8651';
const PRIVATE_KEY = '';
const NETWORK_ID = '1001'
const GASLIMIT = '3000000'

module.exports = {
    networks: {
        testnet: {
            provider: new HDWalletProvider(PRIVATE_KEY, URL),
            network_id: NETWORK_ID,
            gas: GASLIMIT,
            gasPrice: null,
        }
    },
}