import * as crypto from "crypto";
import {airports, Route, Provider} from "./items";
const tlsClient = require("../tlsClient/tlsClientSimpleWrapper");


let scrapedOrigins: string[] = [];
let allRoutes: Route[] = [];
async function codeAlreadyScraped(code: string){
    for (let i = 0; i < scrapedOrigins.length; i++) {
        if(scrapedOrigins[i] == code){
            return true;
        }
    }
    return false;
}

async function getInformation(origin: string, destination: string, date: string, adult = 1, teen = 0){
    let client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    let resp = await client.get("https://www.ryanair.com/api/booking/v4/de-de/availability?ADT=1&CHD=0&DateIn=&DateOut=2023-04-06&Destination=SUF&Disc=0&INF=0&Origin=NUE&TEEN=0&promoCode=&IncludeConnectingFlights=false&FlexDaysBeforeOut=2&FlexDaysOut=2&FlexDaysBeforeIn=2&FlexDaysIn=2&RoundTrip=false&ToUs=AGREED");
    console.log(resp.status)
}

async function getDestinationFromOrigin(origin: string): Promise<boolean>{
    if(await codeAlreadyScraped(origin)){
        console.log(`Already scraped ${origin}`)
        return false;
    }
    scrapedOrigins.push(origin)
    console.log(`Origin ${origin}`)
    let client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    let resp = await client.get(`https://www.ryanair.com/api/views/locate/searchWidget/routes/de/airport/${origin}`)
    for (let i = 0; i < resp.body.length; i++) {
        allRoutes.push({
            originCode: origin,
            destinationCode: resp.body[i].arrivalAirport.code,
            provider: Provider.Ryanair
        })
        if(!(await codeAlreadyScraped(resp.body[i].arrivalAirport.code))){
            await getDestinationFromOrigin(resp.body[i].arrivalAirport.code);
        }
    }
    return true;
}

~(async () => {
    console.log(await codeAlreadyScraped("NUE"))
    await getInformation("", "", "")
    await getDestinationFromOrigin("NUE")
    console.log(allRoutes)
})();

