import * as crypto from "crypto";
import {Flight, Provider, Route} from "./items";

const tlsClient = require("../tlsClient/tlsClient");


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

async function getInformation(origin: string, destination: string, outFromDate: Date, outToDate: Date, tripLengthFrom: number, tripLengthTo: number): Promise<Array<Flight>>{
    let client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false, proxy: "http://parateek:myPassword_country-bd@geo.iproyal.com:12321"})
    const outFromDateString: string = outFromDate.toISOString().split("T")[0]
    const outToDateString: string = outToDate.toISOString().split("T")[0]
    console.log(outFromDateString)
    if(destination == "Anywhere"){
        destination = ""
    }else{
        destination = "&to=" + destination
    }
    let resp = await client.get(`https://www.ryanair.com/api/farfnd/3/roundTripFares?&departureAirportIataCode=${origin}&durationFrom=${tripLengthFrom}&durationTo=${tripLengthTo}&inboundDepartureDateFrom=2023-03-11&inboundDepartureDateTo=2024-03-30&language=en&limit=16&market=en-gb&offset=0&outboundDepartureDateFrom=${outFromDateString}&outboundDepartureDateTo=${outToDateString}&priceValueTo=150`);
    resp = resp.body.fares
    let result: Array<Flight> = [];
    for (let i = 0; i < resp.length; i++) {
        result.push({
            route: {
                originCode: resp[i].departureAirport.iataCode,
                destinationCode: resp[i].arrivalAirport.iataCode,
                provider: Provider.Ryanair
            },
            startTime: resp[i].departureDate,
            endTime: resp[i].arrivalDate,
            priceEuro: resp[i].price.value
        })
    }
    return result
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
    //console.log(await codeAlreadyScraped("NUE"))
    await getInformation("NUE", "Anywhere", new Date("2023-04-01"), new Date("2023-04-14"), 4, 8)
    //await getDestinationFromOrigin("NUE")
    //console.log(allRoutes)
})();

