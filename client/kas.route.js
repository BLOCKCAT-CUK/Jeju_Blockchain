const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res) {
    var url = "https://wallet-api.klaytnapi.com/v2";
    var myHeaders = new fetch.Headers();
    myHeaders.append("x-chain-id", "1001");
    myHeaders.append("Authorization", "Basic S0FTS1E3TEhWSjQ1SDlNQzQ0MzJPRE41OlNwV1hDdllwck83VjI2MFNHMUlLMFVBMkFjY2FVMDNEVGhSWW0rU3Y=");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(data => console.log)
        .catch(error => console.log('error', error));
})

module.exports = router;