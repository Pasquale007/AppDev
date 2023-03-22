export enum Provider {"Eurowings", "Ryanair"}

export let airports: Airport[]
export interface Flight{
    route: Route,
    startTime: string,
    endTime: string,
    priceEuro: number,
}

export interface Route{
    origin: Airport,
    destination: Airport,
    provider: Provider
}

export interface Airport{
    name: string,
    iata: string,
    countryCode: string
}

export function getAirportByCode(code: string): Airport {
    for (let i = 0; i < airports.length; i++) {
        if(airports[i].iata == code){
            return airports[i];
        }
    }
}

export function getAirportByName(name: string): Airport {
    for (let i = 0; i < airports.length; i++) {
        if(airports[i].name.includes(name)){
            return airports[i];
        }
    }
}

~(async () => {
    let airportsJson = require('airport-codes').toJSON()
    airports = [];
    for(const itemIndex in airportsJson){
        airports.push({
            name: airportsJson[itemIndex].name,
            iata: airportsJson[itemIndex].iata,
            country: airportsJson[itemIndex].country
        })
    }
})();