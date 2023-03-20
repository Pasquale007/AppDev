let Web3 = require('web3');
let WebSocket = require("ws");
const {execSync} = require("child_process");
const axios = require("axios");
(async () => {
    /*let options = {
        clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000,
        },
        reconnect: {
            auto: true,
            delay: 2500,
            onTimeout: true,
        }
    };
    let ws = new Web3.providers.WebsocketProvider("ws://88.198.39.90:8545/", options);
    let web3Socket = new Web3(ws)
    let subscription = web3Socket.eth.subscribe("pendingTransactions").on("data", async (hash) => {
        console.log(hash)
    })*/
    /*let webSocket = new WebSocket("ws://23.88.96.197:6000/ethereum/5HfwuIMmrJNv1Bdo03JuQp1JRlV70dV7");
    webSocket.on('open', function open() {
        webSocket.send(JSON.stringify({ "jsonrpc": '2.0',  "id": 3920122963755914,  "method": 'eth_subscribe',  "params": [ 'newPendingTransactions' ]}));
    });
    webSocket.on('message', function message(data) {
        console.log('received: %s', data);
    });
    webSocket.on('error', function message(data) {
        console.log('received: %s', data);
    });*/
    const result = await axios.post("http://88.198.39.90:3000/addToWhitelist", {
        "ip": "127.0.0.123",
        "comment": "test2"
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(result)
})();