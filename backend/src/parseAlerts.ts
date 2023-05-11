import { getActiveItems, setAlreadyAlerted } from "./config";
import { Route, SimpleConnection } from "./items";
import { getResult, setRoutes } from "./ryanair";
import sendNotification from "./pushNotification";
export interface Alert {
    id: string,
    isActive: boolean,
    origin: string,
    originIATA: string,
    destination: string,
    destinationIATA: string,
    startDate: Date,
    endDate: Date,
    minLength: number,
    maxLength: number,
    maxPrice: number,
    alreadyAlerted?: AlreadyAlerted
}

export interface FirebaseAlert {
    id: string,
    isActive: boolean,
    origin: string,
    originIATA: string,
    destination: string,
    destinationIATA: string,
    startDate: string,
    endDate: string,
    minLength: number,
    maxLength: number,
    maxPrice: number,
    alreadyAlerted?: AlreadyAlerted
}

interface AlreadyAlerted {
    originIATA: string,
    outboundDate: Date,
    destinationIATA: string,
    inboundDate: Date,
    price: number
}

async function parseAlerts() {
    const allRoutes: Route[] = await setRoutes();
    const firebaseDataset = await getActiveItems();
    let item: FirebaseAlert;
    for (item of firebaseDataset) {
        const parsedItem: Alert = {
            ...item,
            startDate: new Date(Date.parse(`${item.startDate.split(".")[2]}-${item.startDate.split(".")[1]}-${item.startDate.split(".")[0]}`)),
            endDate: new Date(Date.parse(`${item.endDate.split(".")[2]}-${item.endDate.split(".")[1]}-${item.endDate.split(".")[0]}`))
        };
        if (!parsedItem.maxLength) {
            continue
        }
        console.log(parsedItem)
        /*const parsedItem: Alert = {
            id: "43b4ij3b54i3jb5345b3",
            isActive: true,
            origin: "Nurenberg",
            originIATA: "NUE",
            destination: "Palma",
            destinationIATA: "PMI",
            startDate: new Date("2023-05-01"),
            endDate: new Date("2023-05-28"),
            minLength: 1,
            maxLength: 14,
            maxPrice: 200
        }*/
        await compareSavedAndNewResults(allRoutes, parsedItem).then(
            async (response: Alert) => {
                if (parsedItem.alreadyAlerted) {
                    if (response.alreadyAlerted && parsedItem.alreadyAlerted.price > response.alreadyAlerted.price) {
                        //Alert with following line. Is id correct:
                        //sendNotification(id)
                        await setAlreadyAlerted(response)
                    } else {
                        return;
                    }
                } else {
                    console.log("Into Firebase")
                    await setAlreadyAlerted(response)
                }
            }
        )

    }
}

async function compareSavedAndNewResults(allRoutes: Route[], parsedItem: Alert): Promise<Alert> {
    const scrapedRoutes: SimpleConnection[] = await getResult(allRoutes, parsedItem.originIATA, parsedItem.destinationIATA, [], parsedItem.startDate, parsedItem.endDate, parsedItem.minLength, parsedItem.maxLength)

    if (scrapedRoutes.length === 0) {
        throw Error;
    }
    return {
        ...parsedItem,
        alreadyAlerted: {
            originIATA: scrapedRoutes[0].origin,
            outboundDate: scrapedRoutes[0].outboundDate,
            destinationIATA: scrapedRoutes[0].destination,
            inboundDate: scrapedRoutes[0].inboundDate,
            price: scrapedRoutes[0].totalPrice
        }
    }
}


~(async () => {
    await parseAlerts()
})();