export enum Provider { "Eurowings", "Ryanair" }

export let airports: Airport[]

export interface Connection {
    outbound: Flight,
    inbound: Flight
}

export interface SimpleConnection {
    origin: string,
    destination: string,
    outboundDate: Date,
    outboundPrice: number,
    inboundDate: Date,
    inboundPrice: number,
    totalPrice: number
}
export interface Flight {
    route: Route,
    startTime: string,
    endTime: string,
    priceEuro: number,
}

export interface Route {
    origin: Airport,
    destination: Airport,
    provider: Provider
}

export interface Airport {
    name: string,
    iata: string,
    countryCode: string
}

export function getAirportByCode(code: string): Airport | undefined {
    for (let i = 0; i < airports.length; i++) {
        if (airports[i].iata == code) {
            return airports[i];
        }
    }
    throw Error;
}

export function getAirportByName(name: string): Airport | undefined {
    for (let i = 0; i < airports.length; i++) {
        if (airports[i].name.includes(name)) {
            return airports[i];
        }
    }
    throw Error;
}

~(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const airportsJson = require('airport-codes').toJSON()
    airports = [];
    for (const itemIndex in airportsJson) {
        airports.push({
            name: airportsJson[itemIndex].name,
            iata: airportsJson[itemIndex].iata,
            countryCode: airportsJson[itemIndex].country
        })
    }
})();