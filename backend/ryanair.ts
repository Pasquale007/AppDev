const tlsClient = require("./tlsClient/tlsClientSimpleWrapper");

async function getInformation(origin: string, destination: string, adult: number, teen: number){
    this.client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    let resp = await
}