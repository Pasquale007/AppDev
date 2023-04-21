import * as crypto from "crypto";
import {Provider, Route, SimpleConnection} from "./items";
import * as fs from "fs";
const tlsClient = require("../tlsClient/tlsClient");


const scrapedOrigins: string[] = [];
let allRoutes: Route[] = [];
async function codeAlreadyScraped(code: string){
    for (let i = 0; i < scrapedOrigins.length; i++) {
        if(scrapedOrigins[i] == code){
            return true;
        }
    }
    return false;
}

async function getInformationMonth(origin: string, destination: string, firstOfMonthDate: Date): Promise<Array<JSON>>{
    const client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    const date: string = firstOfMonthDate.toISOString().split("T")[0]
    const resp = await client.get(`https://www.ryanair.com/api/farfnd/3/oneWayFares/${origin}/${destination}/cheapestPerDay?market=en-gb&outboundMonthOfDate=${date}`);
    return resp.body.outbound.fares;

}

async function getDestinationFromOrigin(origin: string, name: string, countryCode: string): Promise<boolean>{
    if(await codeAlreadyScraped(origin)){
        console.log(`Already scraped ${origin}`)
        return false;
    }
    scrapedOrigins.push(origin)
    console.log(`Origin ${origin}`)
    const client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    const resp = await client.get(`https://www.ryanair.com/api/views/locate/searchWidget/routes/de/airport/${origin}`)
    for (let i = 0; i < resp.body.length; i++) {
        const destinationCode = resp.body[i].arrivalAirport.code;
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

export async function setRoutes(): Promise<Route[]>{
    const jsonData = fs.readFileSync('../data.json', 'utf-8'); // Read the contents of 'data.json' as a string

    allRoutes = JSON.parse(jsonData);
    return allRoutes;
}

async function processDestination(origin: string, destination: string, outFromDate: Date, outToDate: Date, lengthMin: number, lengthMax: number){
    const result: Array<SimpleConnection> = [];
    const monthsBetween = getMonthsBetween(outFromDate, outToDate);
    let outbound: Array<any> = [];
    for (let i = 0; i < monthsBetween.length; i++) {
        const tempResult = await getInformationMonth(origin, destination, monthsBetween[i])
        outbound = [...outbound, ...tempResult]
    }


    let inbound: Array<any> = [];
    for (let i = 0; i < monthsBetween.length; i++) {
        const tempResult = await getInformationMonth(destination, origin, monthsBetween[i])
        inbound = [...inbound, ...tempResult]
    }
    lengthMin = (+lengthMin)
    lengthMax = (+lengthMax)

    for (let i = 0; i < outbound.length; i++) {
        if(new Date(outFromDate) <= new Date(outbound[i].day) && new Date(outToDate) >= new Date(outbound[i].day) && outbound[i].unavailable == false && outbound[i].soldOut == false){
            //Flight available
            //Searching for back flight
            for (let j = i + lengthMin; j <= i + lengthMax; j++) {
                if(inbound[j] && new Date(outToDate) >= new Date(inbound[j].day) && inbound[j].unavailable == false && inbound[j].soldOut == false){
                    result.push({
                        origin: origin,
                        destination: destination,
                        outboundDate: new Date(outbound[i].day),
                        outboundPrice: outbound[i].price.value,
                        inboundDate: new Date(inbound[j].day),
                        inboundPrice: inbound[j].price.value,
                        totalPrice: outbound[i].price.value + inbound[j].price.value
                    })
                }
            }
        }
    }


    return result;
}

function getMonthsBetween(startDate: Date, endDate: Date): Array<Date> {
    const months: Date[] = [];

    const currentDate = new Date(startDate);
    currentDate.setDate(1);

    while (currentDate < endDate) {
        months.push(new Date(currentDate.getTime()));
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
    }

    return months;
}

export async function getResult(routes: Route[], origin: string, destination: string, ignoredDestinations: string[], outFromDate: Date, outToDate: Date, lengthMin: number, lengthMax: number): Promise<Array<SimpleConnection>>{
    allRoutes = routes;
    let allAvailableConnections: Array<SimpleConnection> = [];
    if(destination.length === 3){
        allAvailableConnections = await processDestination(origin, destination, outFromDate, outToDate, lengthMin, lengthMax)
    }else if(destination.length === 2){
        destination = destination.toLowerCase();
        for (let i = 0; i < allRoutes.length; i++) {
            if(allRoutes[i].origin.iata == origin && allRoutes[i].destination.countryCode == destination){
                if(ignoredDestinations.includes(allRoutes[i].destination.iata)){
                    continue
                }
                const tempResult = await processDestination(origin, allRoutes[i].destination.iata, outFromDate, outToDate, lengthMin, lengthMax)
                allAvailableConnections = [...allAvailableConnections, ...tempResult]
            }
        }
    }else{
        //All destinations
        for (let i = 0; i < allRoutes.length; i++) {
            if(allRoutes[i].origin.iata == origin){
                if(ignoredDestinations.includes(allRoutes[i].destination.iata)){
                    continue
                }
                const tempResult = await processDestination(origin, allRoutes[i].destination.iata, outFromDate, outToDate, lengthMin, lengthMax)
                allAvailableConnections = [...allAvailableConnections, ...tempResult]
            }
        }
    }
    allAvailableConnections.sort(function(a, b) {
        return a.totalPrice - b.totalPrice;
    })
    console.log(allAvailableConnections)
    return allAvailableConnections;
}

/*~(async () => {
    //await saveRoutes()
    await getResult(routestemp, "NUE", "All destinations", [], new Date("2023-04-09"), new Date("2023-05-18"), 1, 14)
})();*/

