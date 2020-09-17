const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const URL = 'https://api.baobab.klaytn.net:8651';
const PRIVATE_KEY = '0xc71a9a2eadd3583106ebe3b96f7de8891834ef5cea44b0b80d0603381fae523a';
const HDWalletProvider = require("truffle-hdwallet-klaytn-provider");
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