import express, { Response } from 'express';
import { getResult, setRoutes } from "./ryanair";
import { Route } from "./items";

let allRoutes: Route[] = [];

const app = express();
const port = 3000;

interface QueryParams {
  origin: string;
  destination: string;
  ignoredDestinations: string[];
  outFromDate: Date;
  outToDate: Date;
  lengthMin: number;
  lengthMax: number;
}

interface Link {
  originIATA: string,
  outboundDate: string,
  destinationIATA: string,
  inboundDate: string
}

app.get('/getFlights', async (req: any, res: Response) => {
  let queryParams: QueryParams
  try {
    queryParams = {
      origin: req.query.origin as string,
      destination: req.query.destination,
      ignoredDestinations: req.query.ignoredDestinations.split(",") ?? [],
      outFromDate: new Date(req.query.outFromDate),
      outToDate: new Date(req.query.outToDate),
      lengthMin: req.query.lengthMin ?? 0,
      lengthMax: req.query.lengthMax ?? 30,
    };
  } catch (e) {
    console.log(e)
    await res.status(500).send("Something went wrong!")
    return
  }

  if (queryParams.origin.length != 3) {
    await res.status(501).send("Length of origin not 3 characters. (No IATA-Code)")
    return
  }
  if (queryParams.destination.length != 3 && queryParams.destination != "All destinations") {
    await res.status(501).send("Length of destination not 3 characters. (No IATA-Code)")
    return
  }

  console.log(queryParams)


  const result = await getResult(allRoutes, queryParams.origin, queryParams.destination, queryParams.ignoredDestinations, queryParams.outFromDate, queryParams.outToDate, queryParams.lengthMin, queryParams.lengthMax)
  console.log(result)
  await res.send(result);
});


app.get('/getLink', async (req: any, res: Response) => {
  let linkParams: Link
  try {
    linkParams = {
      originIATA: req.query.originIATA,
      outboundDate: req.query.outboundDate,
      destinationIATA: req.query.destinationIATA,
      inboundDate: req.query.inboundDate
    };
  } catch (e) {
    console.log(e)
    await res.status(500).send("Something went wrong!")
    return
  }

  if (linkParams.originIATA.length != 3 || linkParams.destinationIATA.length != 3) {
    await res.status(501).send("Length of IATA is not 3 characters. (No IATA-Code)")
    return
  }
  if (linkParams.outboundDate.split("-").length != 3 || linkParams.inboundDate.split("-").length != 3) {
    await res.status(501).send("Date is not in format YYYY-MM-DD")
    return
  }

  await res.send(`https://www.ryanair.com/de/de/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=${linkParams.outboundDate}&dateIn=${linkParams.inboundDate}&isConnectedFlight=false&isReturn=true&discount=0&promoCode=&originIata=${linkParams.originIATA}&destinationIata=${linkParams.destinationIATA}&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=${linkParams.outboundDate}&tpEndDate=${linkParams.inboundDate}&tpDiscount=0&tpPromoCode=&tpOriginIata=${linkParams.originIATA}&tpDestinationIata=${linkParams.destinationIATA}`);
});

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  allRoutes = await setRoutes()
});