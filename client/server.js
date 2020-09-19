const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.bodyParser())
const port = 5000;
app.use(cors());

app.get('/', function (req, res, next) {
    var url = "https://wallet-api.klaytnapi.com/v2/account";
    const headers = {
        "x-chain-id": "1001",
        "Authorization": "Basic S0FTS1E3TEhWSjQ1SDlNQzQ0MzJPRE41OlNwV1hDdllwck83VjI2MFNHMUlLMFVBMkFjY2FVMDNEVGhSWW0rU3Y="
    }
    // var myHeaders = new fetch.Headers();
    // myHeaders.append("x-chain-id", "1001");
    // myHeaders.append("Authorization", "Basic S0FTS1E3TEhWSjQ1SDlNQzQ0MzJPRE41OlNwV1hDdllwck83VjI2MFNHMUlLMFVBMkFjY2FVMDNEVGhSWW0rU3Y=");
    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders
    // };
    // console.log(myHeaders);
    //console.log(request);
    //console.log(requestOptions);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    fetch(url, { methods: 'GET', headers: headers })
        .then((res) => {
            //console.log(res)
            return res.json()
        })
        .then(data => res.send(data))

})

app.post('/transfer', function (req, res, next) {
    var url = "https://wallet-api.klaytnapi.com/v2/tx/value";
    const headers = {
        "x-chain-id": "1001",
        "Authorization": "Basic S0FTS1E3TEhWSjQ1SDlNQzQ0MzJPRE41OlNwV1hDdllwck83VjI2MFNHMUlLMFVBMkFjY2FVMDNEVGhSWW0rU3Y="
    }
    const Rasresponse = fetch(url, {
        methods: 'POST',
        headers: headers,
        body: JSON.stringify({
            from: "0xcD5Dbc2E8CAA1471187c6A8e9738b34661568D5a",
            value: "0x100",
            to: "0xc0638037F8B7BfaC59dE6B549Ea4c37f36b319f3"
        })})
    const content = Rawresponse.json();
    console.log(content);
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})