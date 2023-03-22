import * as crypto from "crypto";
import {Flight, Provider, Route} from "./items";
import * as fs from "fs";
import {all} from "axios";
let airports = require('airport-codes');
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

async function getInformation(origin: string, destination: string, outFromDate: Date, outToDate: Date): Promise<Array<Flight>>{
    let client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    const outFromDateString: string = outFromDate.toISOString().split("T")[0]
    const outToDateString: string = outToDate.toISOString().split("T")[0]
    if(destination == "Anywhere"){
        destination = ""
    }else{
        destination = "&arrivalAirportIataCode=" + destination
    }
    let resp = await client.get(`https://www.ryanair.com/api/farfnd/3/oneWayFares?&departureAirportIataCode=${origin}&language=en&limit=16&market=en-gb&offset=0&outboundDepartureDateFrom=${outFromDateString}&outboundDepartureDateTo=${outToDateString}&priceValueTo=150${destination}`);
    resp = resp.body.fares;
    let result: Array<Flight> = [];
    for (let i = 0; i < resp.length; i++) {
        result.push({
            route: {
                origin: {
                    name: resp[i].outbound.departureAirport.name,
                    iata: resp[i].outbound.departureAirport.iataCode,
                    country: resp[i].outbound.departureAirport.countryName
                },
                destination: {
                    name: resp[i].outbound.arrivalAirport.name,
                    iata: resp[i].outbound.arrivalAirport.iataCode,
                    country: resp[i].outbound.arrivalAirport.countryName
                },
                provider: Provider.Ryanair
            },
            startTime: resp[i].outbound.departureDate,
            endTime: resp[i].outbound.arrivalDate,
            priceEuro: resp[i].summary.price.value
        });
    }
    return result;
}

async function getDestinationFromOrigin(origin: string, name: string, countryCode: string): Promise<boolean>{
    if(await codeAlreadyScraped(origin)){
        console.log(`Already scraped ${origin}`)
        return false;
    }
    scrapedOrigins.push(origin)
    console.log(`Origin ${origin}`)
    let client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    let resp = await client.get(`https://www.ryanair.com/api/views/locate/searchWidget/routes/de/airport/${origin}`)
    for (let i = 0; i < resp.body.length; i++) {
        let destinationCode = resp.body[i].arrivalAirport.code;
        try{
            allRoutes.push({
                origin: {
                    name: name,
                    iata: origin,
                    countryCode: countryCode
                },
                destination: {
                    name: resp.body[i].arrivalAirport.name,
                    iata: destinationCode,
                    countryCode: resp.body[i].arrivalAirport.country.code
                },
                provider: Provider.Ryanair
            });
        }
        catch (e) {
            console.log(origin)
            console.log(destinationCode)
        }
        if(!(await codeAlreadyScraped(resp.body[i].arrivalAirport.code))){
            await getDestinationFromOrigin(resp.body[i].arrivalAirport.code, resp.body[i].arrivalAirport.name, resp.body[i].arrivalAirport.country.code);
        }
    }
    return true;
}

async function saveRoutes(): Promise<void>{
    await getDestinationFromOrigin("NUE", "Nuremberg", "de")
    const jsonData = JSON.stringify(allRoutes, null, 2); // Convert JSON object to a string with 2 space indentation

    await fs.writeFileSync('../data.json', jsonData);
}

async function setRoutes(): Promise<void>{
    const jsonData = fs.readFileSync('../data.json', 'utf-8'); // Read the contents of 'data.json' as a string

    allRoutes = JSON.parse(jsonData);
}

async function getResult(origin: string, destination: string, outFromDate: Date, outToDate: Date, lengthMin: number, lengthMax: number){
    let originDepatures: Array<Flight> = [];
    if(destination.length === 3){
        originDepatures = await getInformation(origin, destination, outFromDate, outToDate)
    }else if(destination.length === 2){
        for (let i = 0; i < allRoutes.length; i++) {
            if(allRoutes[i].origin.iata == origin && allRoutes[i].destination.countryCode == destination){
                let tempResult = await getInformation(origin, allRoutes[i].destination.iata, outFromDate, outToDate)
                originDepatures = [...originDepatures, ...tempResult]
            }
        }
    }else{
        //To all
    }
    console.log(originDepatures)
    console.log(originDepatures.length)
}

~(async () => {
    //await saveRoutes()
    await setRoutes()
    await getResult("NUE", "es", new Date("2023-04-01"), new Date("2023-04-14"), 4, 8)
})();

