import express, { Request, Response } from 'express';
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

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  allRoutes = await setRoutes()
});
